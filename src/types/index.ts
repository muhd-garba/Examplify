export type UserRole = "admin" | "candidate";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
}

export interface Answer {
  questionId: string;
  selectedOptionId: string;
}

export interface Result {
  id: string;
  testId: string;
  candidateId: string;
  answers: Answer[];
  score: number;
  submittedAt: Date;
}
