"use client";
import { UserResponse } from "@/schema/response.schema";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Appbar from "./components/appbar";
import { Container } from "./components/container";
import ActionCard from "./components/action_card";
import { FaPlus, FaChartBar } from "react-icons/fa";
import { useUser } from "./hooks/user_hook";

const Home = () => {
  const user = useUser();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="w-screen">
      <Appbar />
      <Container>
        <p className="mt-10 text-2xl">
          Hello {user.firstName}, What would you like to do today
        </p>

        <div className="w-full flex justify-evenly mt-10 items-center">
          <ActionCard
            Icon={FaPlus}
            text="Create a survey"
            redirect="/survey/create"
          />
          <ActionCard
            Icon={FaChartBar}
            text="Manage surveys"
            redirect="/survey/create"
          />
        </div>
      </Container>
    </div>
  );
};

export default Home;
