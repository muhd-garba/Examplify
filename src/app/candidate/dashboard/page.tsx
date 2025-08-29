
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Clock, HelpCircle, BookOpen, Loader2 } from "lucide-react";

interface Test {
  id: string;
  title: string;
  description: string;
  questions: any[];
  duration: number;
}

const MOCK_USER_EMAIL = "candidate@example.com";

const mockTests: Test[] = [
  { id: "mock-test-1", title: "Physics 101", description: "Midterm exam for introductory physics.", questions: [{}, {}, {}], duration: 60 },
  { id: "mock-test-2", title: "Calculus II", description: "Final exam covering integration and series.", questions: [{}, {}, {}, {}], duration: 90 },
  { id: "mock-test-3", title: "World History", description: "Exam on the period from 1500-1800.", questions: [{}, {}], duration: 45 },
];


export default function CandidateDashboard() {
  const [availableTests, setAvailableTests] = useState<Test[]>([]);
  const [isLoadingTests, setIsLoadingTests] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setAvailableTests(mockTests);
      setIsLoadingTests(false);
    }, 500);
  }, []);

  if (isLoadingTests) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Here are your available tests.</p>
      </div>

      {availableTests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableTests.map((test) => (
            <Card key={test.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </div>
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>{test.questions.length} questions</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{test.duration} minutes</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/candidate/exams/${test.id}`} className="w-full">
                  <Button className="w-full">Start Test</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
            <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg font-semibold">No Tests Available</p>
                    <p>No tests have been assigned to {MOCK_USER_EMAIL}.</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

