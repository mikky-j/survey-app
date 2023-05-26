import { UserSurveysResponse } from "@/schema/response.schema";
import {
  generateSurveyResponse,
  generateSurveySummary,
  successResponse,
  unauthorizedResponse,
  validateJWT,
} from "../../globals";
import { prisma } from "../../prisma";

export const GET = async (req: Request) => {
  const token = req.headers.get("cookie")?.split("=")[1];
  const payload = await validateJWT(token);
  if (!payload) return unauthorizedResponse("Invalid token");
  const data = await prisma.survey.findMany({
    where: {
      createdById: payload.id,
    },
    include: {
      questions: {
        include: { options: true },
        orderBy: {
          order: "asc",
        },
      },
      responses: true,
    },
  });

  return successResponse<UserSurveysResponse>(generateSurveySummary(data));
};
