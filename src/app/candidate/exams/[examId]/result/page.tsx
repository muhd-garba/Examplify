import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockResult = {
  score: 2,
  totalQuestions: 3,
  questions: [
    {
      text: "What is the unit of force?",
      options: ["Watt", "Newton", "Joule", "Pascal"],
      userAnswer: "Newton",
      correctAnswer: "Newton",
    },
    {
      text: "What is the formula for acceleration?",
      options: ["v/t", "d/t", "F/m", "m*v"],
      userAnswer: "d/t",
      correctAnswer: "F/m",
    },
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      userAnswer: "Mars",
      correctAnswer: "Mars",
    },
  ],
};

export default function ResultPage() {
  const percentage = Math.round((mockResult.score / mockResult.totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Exam Result</h1>
        <p className="text-muted-foreground">Here is a summary of your performance.</p>
      </div>

      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
            <Award className="h-12 w-12" />
          </div>
          <CardTitle className="mt-4 text-2xl">Congratulations!</CardTitle>
          <CardDescription>You have completed the exam.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-4xl font-bold">{percentage}%</p>
          <p className="text-lg text-muted-foreground">You scored <span className="font-bold text-primary">{mockResult.score}</span> out of <span className="font-bold">{mockResult.totalQuestions}</span> questions correctly.</p>
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
          {mockResult.questions.map((q, index) => {
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
                    <div className="mt-2 space-y-2 text-sm">
                      {q.options.map((option, i) => {
                        const isUserAnswer = option === q.userAnswer;
                        const isCorrectAnswer = option === q.correctAnswer;

                        let stateClass = "";
                        if (isUserAnswer && !isCorrect) stateClass = "bg-destructive/10 border-destructive text-destructive";
                        if (isCorrectAnswer) stateClass = "bg-green-500/10 border-green-500 text-green-600";
                        
                        return (
                          <div key={i} className={`p-2 border rounded-md ${stateClass}`}>
                            {option}
                            {isUserAnswer && !isCorrect && <span className="ml-2 font-semibold">(Your Answer)</span>}
                            {isCorrectAnswer && <span className="ml-2 font-semibold">(Correct Answer)</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {index < mockResult.questions.length - 1 && <Separator className="mt-6" />}
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
