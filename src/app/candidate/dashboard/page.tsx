import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Clock, HelpCircle, BookOpen } from "lucide-react";

const availableExams = [
  { id: "1", title: "Physics 101", description: "Fundamentals of classical mechanics and thermodynamics.", questions: 25, duration: 60 },
  { id: "2", title: "Calculus II", description: "Advanced topics in integration and series.", questions: 20, duration: 90 },
  { id: "3", title: "World History", description: "From the Renaissance to the modern era.", questions: 50, duration: 60 },
];

export default function CandidateDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Here are your available exams.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableExams.map((exam) => (
          <Card key={exam.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription>{exam.description}</CardDescription>
                </div>
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>{exam.questions} questions</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{exam.duration} minutes</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/candidate/exams/${exam.id}`} className="w-full">
                <Button className="w-full">Start Exam</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
