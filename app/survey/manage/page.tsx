"use client";
import Appbar from "@/app/components/appbar";
import { Container } from "@/app/components/container";
import { useSurveySummary } from "@/app/hooks/hook";
import { SurveyResponse } from "@/schema/response.schema";
import axios from "axios";
import { useEffect, useState } from "react";

const ManagePage = ({ params: { id } }: { params: { id: string } }) => {
  const surveySummary = useSurveySummary(id);
  if (!surveySummary) return <p>Loading</p>;
  return (
    <div>
      <Appbar />
      <Container>{surveySummary.surveyCount}</Container>
    </div>
  );
};

export default ManagePage;
