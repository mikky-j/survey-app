"use client";
import { CreateUserRequest } from "@/schema/request.schema";
import { UserResponse } from "@/schema/response.schema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type error = { response: { data: string } };

const Test = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const formik = useFormik<CreateUserRequest>({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await axios.post<
          Omit<CreateUserRequest, "confirmPassword">,
          UserResponse
        >("http://localhost:3000/api/user/create", {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        router.push("/");
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage((error as error).response.data as string);
      }
    },
  });

  return (
    <div className="w-screen h-screen bg-[url('https://picsum.photos/2000')] bg-cover">
      <div className="bg-black/50 flex justify-center items-center w-full h-full">
        <form
          onSubmit={formik.handleSubmit}
          className="p-3 rounded-md shadow-md w-1/3 bg-white"
        >
          <p className="text-center text-lg">Sign Up</p>
          {errorMessage ? (
            <p className="p-2 bg-red-300 my-4 text-red-500">{errorMessage}</p>
          ) : null}
          <div>
            <p>First Name</p>
            <input
              className="border w-full p-1 my-2 rounded-md"
              value={formik.values.firstName}
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <p>Last Name</p>
            <input
              className="border w-full p-1 my-2 rounded-md"
              type="text"
              placeholder="Enter your last name"
              value={formik.values.lastName}
              name="lastName"
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <p>Email</p>
            <input
              className="border w-full p-1 my-2 rounded-md"
              value={formik.values.email}
              placeholder="Enter your email"
              type="email"
              name="email"
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <p>Password</p>
            <input
              className="border w-full p-1 my-2 rounded-md"
              value={formik.values.password}
              placeholder="Enter your password"
              type="password"
              name="password"
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <p>Confirm Password</p>
            <input
              className="border w-full p-1 my-2 rounded-md"
              value={formik.values.confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              onChange={formik.handleChange}
            />
          </div>
          <input
            type="submit"
            className="bg-blue-500 w-full p-2 text-white rounded-md"
            value="Sign Up"
          />
          <p className="text-center my-3">
            Already a member?{" "}
            <Link className="text-blue-500" href={"/login"}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Test;
