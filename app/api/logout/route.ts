import { successResponse } from "../globals";

export const GET = (_req: Request) => {
  return successResponse(
    {},
    {
      "Set-Cookie": `token=deleted; path=/; HttpOnly; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    }
  );
};
