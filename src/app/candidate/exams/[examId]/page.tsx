
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clock, Loader2 } from 'lucide-react';

interface Option {
  text: string;
}

interface Question {
  text: string;
  options: Option[];
  correctOptionIndex: number;
}

interface Test {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

const MOCK_USER = {
  uid: 'mock_user_id',
  email: 'candidate@example.com'
};

const MOCK_TEST: Test = {
    id: "mock-test-1",
    title: "Physics 101",
    duration: 60,
    questions: [
        {
            text: "What is the formula for force?",
            options: [{text: "E=mc^2"}, {text: "F=ma"}, {text: "H2O"}],
            correctOptionIndex: 1
        },
        {
            text: "What is the SI unit for energy?",
            options: [{text: "Watt"}, {text: "Joule"}, {text: "Newton"}],
            correctOptionIndex: 1
        },
        {
            text: "What is the acceleration due to gravity on Earth?",
            options: [{text: "9.8 m/s^2"}, {text: "1.62 m/s^2"}, {text: "3.71 m/s^2"}],
            correctOptionIndex: 0
        }
    ]
};


export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.examId as string;

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timeUpDialogOpen, setTimeUpDialogOpen] = useState(false);
  
  useEffect(() => {
    // Simulate fetching the test
    setLoading(true);
    setTimeout(() => {
        setTest(MOCK_TEST);
        setTimeLeft(MOCK_TEST.duration * 60);
        setLoading(false);
    }, 500);
  }, [testId]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      if(!timeUpDialogOpen) {
        submitTest();
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => (prev ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timeUpDialogOpen]);

  const handleNext = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: parseInt(value, 10) }));
  };
  
  const submitTest = async () => {
    if (!test) return;

    setTimeLeft(0);

    let score = 0;
    const submittedAnswers = test.questions.map((q, index) => {
      const selectedOptionIndex = answers[index];
      const isCorrect = selectedOptionIndex === q.correctOptionIndex;
      if (isCorrect) {
        score++;
      }
      return {
        questionText: q.text,
        selectedOption: selectedOptionIndex !== undefined ? q.options[selectedOptionIndex].text : null,
        correctOption: q.options[q.correctOptionIndex].text,
        isCorrect,
      };
    });

    const resultId = `mock-result-${Date.now()}`;
      
    localStorage.setItem(`result-${resultId}`, JSON.stringify({
      score,
      totalQuestions: test.questions.length,
      questions: submittedAnswers.map(ans => ({
          text: ans.questionText,
          userAnswer: ans.selectedOption,
          correctAnswer: ans.correctOption
      }))
    }));

    router.push(`/candidate/exams/${test.id}/result?resultId=${resultId}`);

  };
  
  if (loading || !test) {
     return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;
  const minutes = Math.floor((timeLeft || 0) / 60);
  const seconds = (timeLeft || 0) % 60;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle>{test.title}</CardTitle>
            <div className="flex items-center gap-2 font-medium text-primary">
              <Clock className="h-5 w-5" />
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="py-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {test.questions.length}</h2>
            <p className="text-lg">{currentQuestion.text}</p>
            <RadioGroup
              value={String(answers[currentQuestionIndex])}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 rounded-md border p-4 has-[:checked]:bg-accent has-[:checked]:text-accent-foreground">
                  <RadioGroupItem value={String(index)} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-base w-full cursor-pointer">{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>Previous</Button>
          <div className="flex gap-2">
            {currentQuestionIndex < test.questions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={submitTest}>Submit Test</Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <AlertDialog open={timeUpDialogOpen} onOpenChange={setTimeUpDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your time for the test has expired. Your answers are being submitted.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

    