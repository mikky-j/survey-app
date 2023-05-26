"use client";
import Appbar from "@/app/components/appbar";
import { Container } from "@/app/components/container";
import { useSurveySummary } from "@/app/hook";
import { SurveyResponse } from "@/schema/response.schema";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import NoSurveySection from "./no_survey_section";
import SurveySection from "./survey_section";

const ManagePage = () => {
  const surveySummary = useSurveySummary();
  if (!surveySummary) return <p>Loading</p>;
  return (
    <div>
      <Appbar />
      <Container className="mt-10">
        {surveySummary.surveyCount !== 0 ? (
          <SurveySection surveySummary={surveySummary} />
        ) : (
          <NoSurveySection />
        )}
      </Container>
    </div>
  );
};

export default ManagePage;
