import { CreateUserRequest } from "@/schema/request.schema";
import { NextResponse } from "next/server";
import {
  errorResponse,
  generateJWT,
  notFoundResponse,
  serverError as serverErrorResponse,
  successResponse,
} from "../../globals";
import bcrypt from "bcrypt";
import { UserResponse } from "@/schema/response.schema";
import { prisma } from "../../prisma";

export async function POST(req: Request) {
  const data = (await req.json()) as Omit<CreateUserRequest, "confirmPassword">;

  const hash = await bcrypt.hash(data.password, 10);
  data.password = hash;

  try {
    await prisma.user.create({
      data,
    });
  } catch (error: any) {
    console.error(error.message);
    return serverErrorResponse("Email Already taken");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return notFoundResponse("User not found");
  }

  const token = await generateJWT({ id: user.id, email: user.email });

  return successResponse<UserResponse>(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    },
    {
      "Set-Cookie": `token=${token}; path=/; HttpOnly; SameSite=Strict; Max-Age=2592000;`,
    }
  );
}
