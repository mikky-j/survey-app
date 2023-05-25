import { SurveyResponse } from "@/schema/response.schema";
import {
  generateResponseResponse,
  generateSurveyResponse,
  notFoundResponse,
  successResponse,
} from "@/app/api/globals";
import { prisma } from "@/app/api/prisma";
import { AnswerRequest, ResponseRequest } from "@/schema/request.schema";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const survey = await prisma.survey.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      questions: {
        include: { options: true },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  if (survey == null) {
    return notFoundResponse("Survey Not found");
  }

  return successResponse<SurveyResponse>(generateSurveyResponse(survey));
};

export const POST = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const data = (await req.json()) as ResponseRequest;
  const response = await prisma.response.create({
    data: {
      survey: { connect: { id: Number(id) } },
      answers: {
        createMany: {
          data: data.answers.map((answer) => {
            return {
              questionId: answer.questionId,
              content: answer.content,
              optionId: answer.optionId,
            };
          }),
        },
      },
    },
    include: {
      user: true,
      survey: true,
      answers: { include: { option: true, question: true } },
    },
  });

  return successResponse(generateResponseResponse(response));
};
