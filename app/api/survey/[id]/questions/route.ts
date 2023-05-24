import {
  generateQuestionResponse,
  notFoundResponse,
  successResponse,
} from "@/app/api/globals";
import { prisma } from "@/app/api/prisma";
import { UpdateQuestionRequest } from "@/schema/request.schema";

export const POST = async (
  req: Request,
  { params: { id: surveyId } }: { params: { id: string; questionId: string } }
) => {
  const data = (await req.json()) as UpdateQuestionRequest;
  const question = await prisma.question.findUnique({
    where: {
      id: data.id,
    },
    include: {
      options: true,
      survey: { include: { createdBy: true } },
    },
  });

  if (question == null) {
    return notFoundResponse("Question was not found");
  }

  const deletedOptionsId = data.options
    ?.filter((option) => option.remove)
    .map((option) => option.id!);

  const deleted = await prisma.option.deleteMany({
    where: {
      id: {
        in: deletedOptionsId,
      },
    },
  });

  console.log(`Deleted ${deleted.count} options from Question ${question.id}`);

  const updatedQuestion = await prisma.question.update({
    data: {
      content: data.content,
      type: data.type,
      options: {
        upsert: data.options?.map((option) => {
          const content = option.content;
          return {
            create: {
              content,
            },
            update: {
              content,
            },
            where: {
              id: option.id,
            },
          };
        }),
      },
    },
    where: {
      id: data.id,
    },
    include: {
      options: true,
    },
  });
  return successResponse(generateQuestionResponse(updatedQuestion));
};

export const DELETE = async (req: Request) => {
  const data = (await req.json()) as { id: number };
  const deleted = await prisma.question.delete({
    where: {
      id: data.id,
    },
    include: {
      survey: true,
    },
  });
  console.log(deleted.content, ":", deleted.survey.title);
};
