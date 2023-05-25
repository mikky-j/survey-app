"use client";
import Appbar from "@/app/components/appbar";
import { Container } from "@/app/components/container";
import { ResponseRequest } from "@/schema/request.schema";
import { ResponseResponse, SurveyResponse } from "@/schema/response.schema";
import axios, { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const getData = async (id: string) => {
  const response = await axios.get<
    SurveyResponse,
    AxiosResponse<SurveyResponse, any>,
    void
  >(`http://localhost:3000/api/survey?id=${id}`);
  return response.data;
};

const AnswerPage = ({ params: { id } }: { params: { id: string } }) => {
  const [survey, setSurvey] = useState<SurveyResponse>();
  const [response, setResponse] = useState<ResponseRequest>({
    surveyId: Number(id),
    answers: [],
  });

  const formik = useFormik<ResponseRequest>({
    initialValues: {
      surveyId: Number(id),
      answers: [],
    },
    onSubmit: async (values) => {
      const data = await axios.post<
        ResponseResponse,
        AxiosResponse<ResponseResponse, any>,
        ResponseRequest
      >("/api/survey", response);
      return data;
    },
  });

  useEffect(() => {
    getData(id)
      .then((data) => setSurvey(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const answers = survey?.questions.map((question) => {
      return {
        questionId: question.id,
      };
    });

    setResponse({
      ...response,
      answers: answers ?? [],
    });
  }, [survey]);

  useEffect(() => {
    formik.setFieldValue("answers", response.answers);
  }, [response]);

  if (!survey) return <p>Loading</p>;

  return (
    <div>
      <Appbar />
      <Container>
        <p className="mt-10 mb-4 text-xl">{survey.title}</p>
        <p className="text-lg">{survey.description}</p>
        <form onSubmit={formik.handleSubmit}>
          {survey.questions.map((question, index) => {
            return (
              <div key={index}>
                <p className="my-4 text-lg">Question {index + 1}</p>
                <p className="my-2">{question.content}</p>
                {question.type === "TEXT" ? (
                  <input
                    type="text"
                    onChange={(e) => {
                      response.answers[index].content = e.target.value;
                      setResponse({
                        ...response,
                        answers: [...response.answers],
                      });
                    }}
                    className="w-full outline-none border-b focus:border-b-blue-500"
                  />
                ) : (
                  question.options.map((option, index) => {
                    return (
                      <div key={index}>
                        <input
                          type={
                            question.type === "CHECKBOX" ? "checkbox" : "radio"
                          }
                          onChange={() => {
                            response.answers[index].optionId = option.id;
                            setResponse({
                              ...response,
                              answers: [...response.answers],
                            });
                          }}
                          value={option.content}
                        />{" "}
                        <span>{option.content}</span>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
          <input
            type="submit"
            value="Submit"
            className="p-2 my-4 bg-blue-500 text-white rounded-md transition-colors hover:cursor-pointer hover:bg-blue-600"
          />
        </form>
      </Container>
    </div>
  );
};

export default AnswerPage;
