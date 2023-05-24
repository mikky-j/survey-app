"use client";
import Appbar from "@/app/components/appbar";
import { useUser } from "@/app/hooks/user_hook";
import QuestionInput from "./question_input";
import { Container } from "@/app/components/container";

export const SurveyCreatePage = () => {
  const user = useUser();
  if (!user) return <p>Loading</p>;
  return (
    <div>
      <Appbar />
      <Container>
        <QuestionInput />
      </Container>
    </div>
  );
};

export default SurveyCreatePage;
