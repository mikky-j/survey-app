import {
  errorResponse,
  generateResponseResponse,
  generateResponseSummaryResponse,
  successResponse,
  unauthorizedResponse,
  validateJWT,
} from "@/app/api/globals";
import { prisma } from "@/app/api/prisma";
import { ResponseSummaryResponse } from "@/schema/response.schema";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const token = req.headers.get("cookie")?.split("=")[1];
  const payload = await validateJWT(token);

  if (!payload) {
    return unauthorizedResponse("Invalid token");
  }
  const responses = await prisma.response.findMany({
    where: {
      surveyId: Number(id),
    },
    include: {
      answers: { include: { option: true, question: true } },
    },
  });

  return successResponse<ResponseSummaryResponse>(
    generateResponseSummaryResponse(responses)
  );
};
