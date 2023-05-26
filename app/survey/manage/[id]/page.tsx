"use client";
import Appbar from "@/app/components/appbar";
import { Container } from "@/app/components/container";
import { useFetcher } from "@/app/hook";
import { ResponseSummaryResponse } from "@/schema/response.schema";
import { useEffect, useMemo } from "react";
import { FaChartBar } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { QuestionType } from "@prisma/client";

ChartJS.register(ArcElement, Tooltip, Legend);

// type CalculatedResult = {
//   [question: string]: { answers: Set<{ [answerContent: string]: number }> };
// };

type CalculatedResult = {
  question: string;
  questionType: QuestionType;
  answers: { answerValue: string; count: number }[];
};

const getData = (responses: ResponseSummaryResponse["responses"]) => {
  const result: CalculatedResult[] = [];
  for (const response of responses) {
    for (const answer of response.answers) {
      let questionIndex = result.findIndex(
        (value) => value.question == answer.questionContent
      );
      // The question is new
      if (questionIndex == -1) {
        result.push({
          question: answer.questionContent,
          questionType: answer.questionType,
          answers: [
            {
              answerValue: answer.answerValue,
              count: 1,
            },
          ],
        });
      } else {
        // We can be sure that's it's only one question like this
        let selectedAnswerIndex = result[questionIndex].answers.findIndex(
          (value) => value.answerValue == answer.answerValue
        );
        if (selectedAnswerIndex == -1) {
          result[questionIndex].answers.push({
            answerValue: answer.answerValue,
            count: 1,
          });
        } else {
          result[questionIndex].answers[selectedAnswerIndex].count += 1;
        }
      }
    }
  }
  return result;
};

export const ManageSurveyPage = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [responses, error] = useFetcher<ResponseSummaryResponse>(
    `/api/survey/summary?id=${id}`
  );
  const data = useMemo(() => {
    if (responses) return getData(responses.responses);
    return null;
  }, [responses]);

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  if (!responses) return <p>Loading..</p>;

  return (
    <div>
      <Appbar />
      <Container className="mt-12">
        <p className="text-xl">{responses.responseCount} Responses</p>
        <div className="mt-8">
          <p className="flex text-lg items-center mb-4">
            <FaChartBar size={25} className="me-2" /> Summary
          </p>
          <hr />
          {data!.map((response, index) => {
            const pieChartData = {
              labels: response.answers.map((answer) => answer.answerValue),
              datasets: [
                {
                  label: response.question,
                  data: response.answers.map((answer) => answer.count),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            };
            return (
              <div className="my-8" key={index}>
                <p>{response.question}</p>
                <small>
                  {response.answers
                    .map((answer) => answer.count)
                    .reduce((a, b) => a + b)}{" "}
                  responses
                </small>

                {response.questionType === "TEXT" ? (
                  <ul>
                    {response.answers.map((answer, index) => {
                      return (
                        <li
                          className="p-2 bg-neutral-300 my-2 rounded-md"
                          key={index}
                        >
                          {answer.answerValue}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="w-full flex justify-center">
                    <div className="my-5 w-1/2">
                      <Pie data={pieChartData} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
export default ManageSurveyPage;
