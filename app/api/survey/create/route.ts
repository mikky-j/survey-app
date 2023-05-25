import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateSurveyRequest } from "@/schema/request.schema";
import {
  errorResponse,
  generateSurveyResponse,
  successResponse,
  validateJWT,
  unauthorizedResponse,
} from "../../globals";
import { SurveyResponse } from "@/schema/response.schema";

export const POST = async (req: Request) => {
  const data = (await req.json()) as CreateSurveyRequest;
  const token = req.headers.get("cookie")?.split("=")[1];
  const payload = await validateJWT(token);

  if (!payload) return unauthorizedResponse("Invalid Token");

  try {
    const survey = await prisma.survey.create({
      data: {
        description: data.description,
        title: data.title,
        createdBy: { connect: { id: payload.id } },
        questions: {
          createMany: {
            data: data.questions.map((question) => {
              return {
                content: question.content,
                type: question.type,
                order: question.order,
                required: question.required,
                // options: {
                //   // createMany: {
                //   //   data: question.options.map((option) => {
                //   //     return { content: option };
                //   //   }),
                //   // },
                // },
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

    for (const question of data.questions) {
      const questionId = survey.questions.filter(
        (q) => q.content === question.content && q.type === question.type
      )[0].id;

      await prisma.option.createMany({
        data: question.options.map((option) => {
          return { content: option.content, questionId };
        }),
      });
    }

    return successResponse<SurveyResponse>(generateSurveyResponse(survey));
  } catch (error) {
    console.error(error);
    return errorResponse("Error Creating the survey");
  }
};
