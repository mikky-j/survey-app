import {
  ResponseSummaryResponse,
  SurveyResponse,
  UserResponse,
  UserSurveysResponse,
} from "@/schema/response.schema";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const getData = async () => {
  const response = axios.get<
    UserResponse,
    AxiosResponse<UserResponse, any>,
    void
  >("/api/user");
  return response;
};

const getSurveySummary = async () => {
  const data = await axios.get<UserSurveysResponse>(`/api/user/surveys`);
  return data.data;
};

export const useUser = () => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    getData()
      .then(({ data }) => {
        setUser(data);
      })
      .catch(console.error);
  }, []);
  return user;
};

export const useSurveySummary = () => {
  const [survey, setSurvey] = useState<UserSurveysResponse>();
  useEffect(() => {
    getSurveySummary()
      .then((data) => setSurvey(data))
      .catch(console.error);
  }, []);
  return survey;
};

export const useFetcher = <T,>(
  url: string
): [T | undefined, string | undefined] => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    axios
      .get<T>(url)
      .then(({ data }) => setData(data))
      .catch((err) => setError(err.message));
  }, []);
  return [data, error];
};
