import { QuestionType } from "@prisma/client";
import { CreateSurveyRequest, QuestionRequest } from "./request.schema";

export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface QuestionResponse extends QuestionRequest {
  id: number;
}

export interface SurveyResponse extends Omit<CreateSurveyRequest, "user_id"> {
  id: number;
  questions: QuestionResponse[];
}

export interface AnswerResponse {
  questionId: number;
  questionContent: string;
  answerId: number;
  questionType: QuestionType;
  answerValue: string;
}

export interface ResponseResponse {
  surveyId: number;
  answers: AnswerResponse[];
}

export interface ResponseSummaryResponse {
  responseCount: number;
  responses: Omit<ResponseResponse, "surveyId">[];
}

export interface SurveySummaryResponse {
  surveyId: number;
  surveyTitle: string;
  surveyDescription: string;
  responseCount: number;
}

export interface UserSurveysResponse {
  surveyCount: number;
  surveys: SurveySummaryResponse[];
}
