import { UserResponse } from "@/schema/response.schema";
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
