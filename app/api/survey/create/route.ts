import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateSurveyRequest } from "@/schema/request.schema";
import {
  errorResponse,
  generateSurveyResponse,
  successResponse,
} from "../../globals";
import { SurveyResponse } from "@/schema/response.schema";

export const POST = async (req: Request) => {
  const data = (await req.json()) as CreateSurveyRequest;
  console.log(data);

  try {
    const survey = await prisma.survey.create({
      data: {
        description: data.description,
        title: data.title,
        createdBy: { connect: { id: data.user_id } },
        questions: {
          createMany: {
            data: data.questions.map((question) => {
              return {
                content: question.content,
                type: question.type,
                order: question.order,
                required: question.required,
                options: {
                  createMany: {
                    data: question.options.map((option) => {
                      return { content: option };
                    }),
                  },
                },
              };
            }),
          },
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return successResponse<SurveyResponse>(generateSurveyResponse(survey));
  } catch (error) {
    console.error(error);
    return errorResponse("Error Creating the survey");
  }
};
