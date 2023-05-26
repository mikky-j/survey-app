import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "./app/api/globals";
import axios from "axios";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token");
  const isAuthenticated = await validateJWT(token?.value);
  // const isAuthenticated = true;
  console.log(request.url);
  console.log(request.url.split("/")[3] == "");
  if (
    (request.url.includes("/signup") || request.url.includes("/login")) &&
    !isAuthenticated
  ) {
    return NextResponse.next();
  } else if (
    (request.url.includes("/signup") ||
      request.url.includes("/login") ||
      request.url.split("/")[3] == "") &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (
    !isAuthenticated &&
    !request.url.includes("/signup") &&
    !request.url.includes("/login")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    axios.defaults.headers.common["Authorization"] = token?.value;
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/signup",
    "/login",
    "/survey/create",
    "/survey/manage",
  ],
};
