import {
  generateSurveyResponse,
  notFoundResponse,
  successResponse,
} from "@/app/api/globals";
import { prisma } from "@/app/api/prisma";
import { UpdateSurveyRequest } from "@/schema/request.schema";
import { SurveyResponse } from "@/schema/response.schema";
import { Survey } from "@prisma/client";

export const POST = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const data = (await req.json()) as UpdateSurveyRequest;
  const survey = await prisma.survey.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      questions: { include: { options: true } },
    },
  });
  if (!survey) {
    return notFoundResponse("Survey not found");
  }
  const updatedSurvey = await prisma.survey.update({
    data: {
      title: data.title ?? survey.title,
      description: data.description ?? survey.description,
    },
    where: {
      id: survey.id,
    },
    include: {
      questions: { include: { options: true } },
    },
  });

  return successResponse<SurveyResponse>(generateSurveyResponse(updatedSurvey));
};
