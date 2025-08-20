"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clock, Loader2 } from 'lucide-react';

interface Option {
  text: string;
}

interface Question {
  text: string;
  options: Option[];
  correctOptionIndex: number;
}

interface Exam {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

export default function ExamPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params.examId as string;
  const [user] = useAuthState(auth);

  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timeUpDialogOpen, setTimeUpDialogOpen] = useState(false);
  
  useEffect(() => {
    if (!examId) return;
    const fetchExam = async () => {
      try {
        const examDoc = await getDoc(doc(db, "exams", examId));
        if (examDoc.exists()) {
          const examData = { id: examDoc.id, ...examDoc.data() } as Exam;
          setExam(examData);
          setTimeLeft(examData.duration * 60);
        } else {
          // Handle exam not found
          console.error("Exam not found");
        }
      } catch (error) {
        console.error("Error fetching exam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      if(!timeUpDialogOpen) {
        submitExam();
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => (prev ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timeUpDialogOpen]);

  const handleNext = () => {
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
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
  
  const submitExam = async () => {
    if (!exam || !user) return;

    setTimeLeft(0);

    let score = 0;
    const submittedAnswers = exam.questions.map((q, index) => {
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

    try {
      const resultDocRef = await addDoc(collection(db, "results"), {
        examId: exam.id,
        examTitle: exam.title,
        candidateId: user.uid,
        candidateEmail: user.email,
        answers: submittedAnswers,
        score: score,
        totalQuestions: exam.questions.length,
        submittedAt: new Date(),
      });
      
      localStorage.setItem(`result-${resultDocRef.id}`, JSON.stringify({
        score,
        totalQuestions: exam.questions.length,
        questions: submittedAnswers.map(ans => ({
            text: ans.questionText,
            userAnswer: ans.selectedOption,
            correctAnswer: ans.correctOption
        }))
      }));

      router.push(`/candidate/exams/${exam.id}/result?resultId=${resultDocRef.id}`);

    } catch (error) {
      console.error("Error submitting exam results: ", error);
    }
  };
  
  if (loading || !exam) {
     return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  const minutes = Math.floor((timeLeft || 0) / 60);
  const seconds = (timeLeft || 0) % 60;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle>{exam.title}</CardTitle>
            <div className="flex items-center gap-2 font-medium text-primary">
              <Clock className="h-5 w-5" />
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="py-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {exam.questions.length}</h2>
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
            {currentQuestionIndex < exam.questions.length - 1 ? (
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
              Your time for the exam has expired. Your answers are being submitted.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
