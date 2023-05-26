import { UserPayload } from "@/schema/payload.schema";
import {
  QuestionResponse,
  ResponseResponse,
  ResponseSummaryResponse,
  SurveyResponse,
  UserSurveysResponse,
} from "@/schema/response.schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export const errorResponse = (message: string) => {
  return new Response(message, {
    status: 400,
    statusText: message,
  });
};

export const successResponse = <T>(message: T, options?: HeadersInit) => {
  return new Response(JSON.stringify(message), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
      ...options,
    },
  });
};

export const unauthorizedResponse = (message: string) => {
  return new Response(message, {
    status: 401,
    statusText: message,
  });
};

export const forbiddenResponse = (message: string) => {
  return new Response(message, {
    status: 403,
    statusText: message,
  });
};

export const notFoundResponse = (message: string) => {
  return new Response(message, {
    status: 404,
    statusText: message,
  });
};

export const serverError = (message: string) => {
  return new Response(message, {
    status: 500,
    statusText: message,
  });
};

export const generateJWT = async <T extends UserPayload>(payload: T) => {
  // return jwt.sign(payload, JWT_SECRET!, { expiresIn: "30d" });
  const token = await new SignJWT({ id: payload.id, email: payload.email })
    .setExpirationTime("1d")
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(JWT_SECRET);
  return token;
};

export const validateJWT = async (
  token: string | undefined | null
): Promise<(JWTPayload & { id?: number; email?: string }) | null> => {
  if (!token) return null;
  const { payload, protectedHeader } = await jwtVerify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  });
  return payload;
};

export const generateSurveyResponse = (
  survey: Prisma.SurveyGetPayload<{
    include: { questions: { include: { options: true } } };
  }>
): SurveyResponse => {
  return {
    id: survey.id,
    description: survey.description,
    title: survey.title,
    questions: survey.questions.map((question) => {
      return {
        id: question.id,
        order: question.order,
        content: question.content,
        options: question.options.map((option) => {
          return { content: option.content, id: option.id, remove: false };
        }),
        required: question.required,
        type: question.type,
      };
    }),
  };
};

export const generateQuestionResponse = (
  question: Prisma.QuestionGetPayload<{ include: { options: true } }>
): QuestionResponse => {
  return {
    content: question.content,
    options: question.options.map((option) => {
      return {
        content: option.content,
        remove: false,
        id: option.id,
      };
    }),
    id: question.id,
    required: question.required,
    type: question.type,
    order: question.order,
  };
};

export const generateSurveySummary = (
  surveys: Prisma.SurveyGetPayload<{
    include: { responses: true; questions: true };
  }>[]
): UserSurveysResponse => {
  return {
    surveyCount: surveys.length,
    surveys: surveys.map((survey) => {
      return {
        responseCount: survey.responses.length,
        surveyDescription: survey.description,
        surveyId: survey.id,
        surveyTitle: survey.title,
      };
    }),
  };
};

export const generateResponseSummaryResponse = (
  responses: Prisma.ResponseGetPayload<{
    include: { answers: { include: { question: true; option: true } } };
  }>[]
): ResponseSummaryResponse => {
  return {
    responseCount: responses.length,
    responses: responses.map((response) => {
      return {
        answers: response.answers.map((answer) => {
          return {
            questionId: answer.questionId,
            questionContent: answer.question.content,
            questionType: answer.question.type,
            answerId: answer.id,
            answerValue:
              answer.question.type == "TEXT"
                ? answer.content!
                : answer.option?.content!,
          };
        }),
      };
    }),
  };
};

export const generateResponseResponse = (
  response: Prisma.ResponseGetPayload<{
    include: {
      user: true;
      survey: true;
      answers: { include: { option: true; question: true } };
    };
  }>
): ResponseResponse => {
  return {
    surveyId: response.surveyId,
    answers: response.answers.map((answer) => {
      const { id, option, content, question } = answer;
      return {
        answerId: id,
        answerValue: question.type == "TEXT" ? content! : option?.content!,
        questionType: question.type,
        questionContent: question.content,
        questionId: question.id,
      };
    }),
  };
};
