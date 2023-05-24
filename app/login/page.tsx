"use client";
import { LoginUserRequest } from "@/schema/request.schema";
import { UserResponse } from "@/schema/response.schema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const formik = useFormik<LoginUserRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const data = await axios.post<LoginUserRequest, UserResponse>(
        "http://localhost:3000/api/user/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log("Logged In User Successfully", data);
      router.push("/");
    },
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      <form
        className="p-3 rounded-md shadow-md w-1/3 bg-white"
        onSubmit={formik.handleSubmit}
      >
        <p className="text-lg text-center">Log In</p>
        <div>
          <p>Email</p>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="border rounded-md w-full p-2 my-3"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            placeholder="Enter your Email"
            className="border rounded-md w-full p-2 my-3"
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-1 rounded-md">
          Log In
        </button>
        <p className="text-center my-3">
          Not a member?{" "}
          <Link className="text-blue-500" href={"/signup"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
