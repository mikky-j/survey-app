import { UserResponse } from "@/schema/response.schema";
import {
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
  validateJWT,
} from "../globals";
import { prisma } from "../prisma";

export const GET = async (req: Request) => {
  const token = req.headers.get("cookie")?.split("=")[1];

  const payload = await validateJWT(token);

  if (!payload) return unauthorizedResponse("Invalid Token");

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) return notFoundResponse("User not found");

  return successResponse<UserResponse>({
    email: user.email,
    firstName: user.firstName,
    lastName: user.firstName,
    token: token!,
  });
};
