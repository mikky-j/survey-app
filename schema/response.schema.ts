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
  answerValue: string;
}

export interface ResponseResponse {
  surveyId: number;
  userEmail?: string;
  answers: AnswerResponse[];
}

export interface ResponseSummaryResponse {
  responseCount: number;
  responses: ResponseResponse[];
}

export interface UserSurveysResponse {
  surveyCount: number;
  surveys: SurveyResponse[];
}
