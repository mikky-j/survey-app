"use client";
import Appbar from "@/app/components/appbar";
import { Container } from "@/app/components/container";
import ActionCard from "@/app/components/action_card";
import { FaPlus, FaChartBar } from "react-icons/fa";
import { useUser } from "@/app/hook";

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
            redirect="/survey/manage"
          />
        </div>
      </Container>
    </div>
  );
};

export default Home;
