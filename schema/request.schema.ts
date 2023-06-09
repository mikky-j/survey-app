import { QuestionType } from "@prisma/client";
export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

interface Option {
  id?: number;
  content: string;
  remove: boolean;
}

export interface QuestionRequest {
  content: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options: Option[];
}

export interface CreateSurveyRequest {
  title: string;
  description: string;
  questions: QuestionRequest[];
}

export interface UpdateQuestionRequest extends Partial<QuestionRequest> {
  id?: number;
}

export interface UpdateSurveyRequest {
  title?: string;
  description?: string;
}

export interface AnswerRequest {
  questionId: number;
  optionId?: number | null;
  content?: string | null;
}

export interface ResponseRequest {
  surveyId: number;
  userId?: number;
  answers: AnswerRequest[];
}
