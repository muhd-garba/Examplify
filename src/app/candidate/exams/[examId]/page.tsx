"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clock } from 'lucide-react';

const mockExam = {
  id: "1",
  title: "Physics 101",
  duration: 1, // 1 minute for testing
  questions: [
    { id: "q1", text: "What is the unit of force?", options: ["Watt", "Newton", "Joule", "Pascal"] },
    { id: "q2", text: "What is the formula for acceleration?", options: ["v/t", "d/t", "F/m", "m*v"] },
    { id: "q3", text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"] },
  ],
};

export default function ExamPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params.examId as string;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(mockExam.duration * 60);
  const [timeUpDialogOpen, setTimeUpDialogOpen] = useState(false);
  
  const currentQuestion = mockExam.questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (currentQuestionIndex < mockExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };
  
  const submitExam = () => {
    setTimeLeft(0);
    setTimeUpDialogOpen(true);
    // In a real app, you would save the results to Firestore here.
  };

  const handleDialogClose = () => {
    setTimeUpDialogOpen(false);
    router.push(`/candidate/exams/${examId}/result`);
  }
  
  const progress = ((currentQuestionIndex + 1) / mockExam.questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle>{mockExam.title}</CardTitle>
            <div className="flex items-center gap-2 font-medium text-primary">
              <Clock className="h-5 w-5" />
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="py-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {mockExam.questions.length}</h2>
            <p className="text-lg">{currentQuestion.text}</p>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 rounded-md border p-4 has-[:checked]:bg-accent has-[:checked]:text-accent-foreground">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-base w-full cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>Previous</Button>
          <div className="flex gap-2">
            {currentQuestionIndex < mockExam.questions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={submitExam}>Submit Exam</Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <AlertDialog open={timeUpDialogOpen} onOpenChange={setTimeUpDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your time for the exam has expired. Your answers have been automatically submitted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose}>View Results</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
