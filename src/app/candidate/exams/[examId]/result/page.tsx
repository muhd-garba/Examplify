"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Award, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ResultQuestion {
  text: string;
  userAnswer: string | null;
  correctAnswer: string;
}

interface ResultData {
  score: number;
  totalQuestions: number;
  questions: ResultQuestion[];
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get('resultId');
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (resultId) {
      const storedResult = localStorage.getItem(`result-${resultId}`);
      if (storedResult) {
        setResult(JSON.parse(storedResult));
        // Clean up localStorage after displaying the result
        localStorage.removeItem(`result-${resultId}`);
      }
    }
    setLoading(false);
  }, [resultId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h1 className="text-3xl font-bold">Result Not Found</h1>
        <p className="text-muted-foreground">The result you are looking for could not be found. It might have already been viewed.</p>
        <Link href="/candidate/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Test Result</h1>
        <p className="text-muted-foreground">Here is a summary of your performance.</p>
      </div>

      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
            <Award className="h-12 w-12" />
          </div>
          <CardTitle className="mt-4 text-2xl">Congratulations!</CardTitle>
          <CardDescription>You have completed the test.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-4xl font-bold">{percentage}%</p>
          <p className="text-lg text-muted-foreground">You scored <span className="font-bold text-primary">{result.score}</span> out of <span className="font-bold">{result.totalQuestions}</span> questions correctly.</p>
           <Badge variant={percentage >= 50 ? "default" : "destructive"} className={`${percentage >= 50 ? 'bg-green-500' : ''} text-lg py-1 px-4`}>
            {percentage >= 50 ? "Passed" : "Failed"}
          </Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Review</CardTitle>
          <CardDescription>Review your answers below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {result.questions.map((q, index) => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            return (
              <div key={index}>
                <div className="flex items-start gap-4">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 mt-1 text-destructive flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold">{index + 1}. {q.text}</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><strong>Your Answer:</strong> {q.userAnswer ?? <span className="italic text-muted-foreground">Not answered</span>}</p>
                      {!isCorrect && <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>}
                    </div>
                  </div>
                </div>
                {index < result.questions.length - 1 && <Separator className="mt-6" />}
              </div>
            );
          })}
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Link href="/candidate/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
