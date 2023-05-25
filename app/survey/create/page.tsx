"use client";
import Appbar from "@/app/components/appbar";
import { useUser } from "@/app/hooks/user_hook";
import QuestionInput from "./question_input";
import { Container } from "@/app/components/container";
import { useFormik } from "formik";
import { CreateSurveyRequest, QuestionRequest } from "@/schema/request.schema";
import axios, { AxiosResponse } from "axios";
import { SurveyResponse } from "@/schema/response.schema";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const getDefaultQuestion = (): QuestionRequest => {
  return {
    content: "",
    options: [],
    order: 0,
    required: false,
    type: "CHECKBOX",
  };
};

export const SurveyCreatePage = () => {
  const user = useUser();
  const [questions, setQuestions] = useState<QuestionRequest[]>([
    {
      content: "",
      options: [],
      order: 0,
      required: false,
      type: "CHECKBOX",
    },
  ]);

  const formik = useFormik<CreateSurveyRequest>({
    initialValues: {
      title: "",
      description: "",
      questions: [],
    },
    onSubmit: async (values) => {
      const response = await axios.post<
        SurveyResponse,
        AxiosResponse<SurveyResponse, any>,
        CreateSurveyRequest
      >("/api/survey/create", values);
      console.log(response);
    },
  });
  useEffect(() => {
    console.log(questions);
  }, [questions]);

  if (!user) return <p>Loading</p>;

  return (
    <div>
      <Appbar />
      <Container>
        <p className="text-2xl my-4">Create Survey</p>
        <form
          onSubmit={(e) => {
            formik.setFieldValue("questions", questions);
            formik.handleSubmit(e);
          }}
        >
          <div className="my-2">
            <p>Survey Name</p>
            <input
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              name="title"
              placeholder="Enter survey name"
              className="w-full my-2 outline-none border-b focus:border-b-blue-500"
              required
            />
          </div>
          <div className="my-2">
            <p>Survey Description</p>
            <textarea
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
              placeholder="Enter survey description"
              className="w-full resize-none my-2 outline-none border-b focus:border-b-blue-500"
              required
            ></textarea>
          </div>
          <div>
            {questions.map((question, index) => {
              return (
                <div key={index} className="my-4">
                  <p className="text-lg flex items-center">
                    Question {index + 1}{" "}
                    {index === questions.length - 1 ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuestions([...questions, getDefaultQuestion()]);
                        }}
                      >
                        <FaPlus className="ms-2" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const target = questions.filter(
                            (_, i) => index !== i
                          );
                          setQuestions(target);
                        }}
                      >
                        <FaMinus className="ms-2" />
                      </button>
                    )}
                  </p>
                  <QuestionInput
                    order={index}
                    passUp={(question) => {
                      questions[index] = question;
                      setQuestions([...questions]);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="my-4">
            <input
              type="submit"
              value={"Submit"}
              className="bg-blue-500 p-2 text-white rounded-md transition-colors hover:bg-blue-600 hover:cursor-pointer"
            />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SurveyCreatePage;
