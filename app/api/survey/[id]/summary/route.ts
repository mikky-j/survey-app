import {
  errorResponse,
  generateResponseResponse,
  successResponse,
  unauthorizedResponse,
  validateJWT,
} from "@/app/api/globals";
import { prisma } from "@/app/api/prisma";
import { ResponseSummaryResponse } from "@/schema/response.schema";

export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const token = req.headers.get("Authorization");
  const payload = await validateJWT(token);
  if (!payload) {
    return unauthorizedResponse("Invalid token");
  }
  const responses = await prisma.response.findMany({
    where: {
      surveyId: Number(id),
      userId: payload.id,
    },
    include: {
      user: true,
      survey: true,
      answers: { include: { option: true, question: true } },
    },
  });

  return successResponse<ResponseSummaryResponse>({
    responseCount: responses.length,
    responses: responses.map((response) => {
      return generateResponseResponse(response);
    }),
  });
};
