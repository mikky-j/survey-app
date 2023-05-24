import { SurveyResponse } from "@/schema/response.schema";
import {
  generateResponseResponse,
  generateSurveyResponse,
  notFoundResponse,
  successResponse,
} from "../../globals";
import { prisma } from "../../prisma";
import { AnswerRequest, ResponseRequest } from "@/schema/request.schema";

export const GET = async (
  _req: Request,
  { params: { id } }: { params: { id: string } }
) => {
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

export const POST = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const data = (await req.json()) as ResponseRequest;
  const response = await prisma.response.create({
    data: {
      user: { connect: { id: data.userId } },
      survey: { connect: { id: Number(id) } },
      answers: {
        createMany: {
          data: data.answers.map((answer) => {
            return {
              questionId: answer.questionId,
              content: answer.content,
              option: answer.optionId
                ? { connect: { id: answer.optionId } }
                : undefined,
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
