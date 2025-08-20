"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
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

interface Exam {
  id: string;
  title: string;
  description: string;
  questions: any[];
  duration: number;
}

export default function CandidateDashboard() {
  const [user, loading] = useAuthState(auth);
  const [availableExams, setAvailableExams] = useState<Exam[]>([]);
  const [isLoadingExams, setIsLoadingExams] = useState(true);

  useEffect(() => {
    const fetchInvitedExams = async () => {
      if (!user) {
        setIsLoadingExams(false);
        return;
      };

      try {
        // 1. Find invitations for the current candidate
        const invitationsQuery = query(
          collection(db, "invitations"),
          where("candidateEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(invitationsQuery);
        const invitationDocs = querySnapshot.docs;

        if (invitationDocs.length === 0) {
          setAvailableExams([]);
          setIsLoadingExams(false);
          return;
        }

        // 2. Fetch the details for each invited exam
        const examPromises = invitationDocs.map(invitation => {
            const examId = invitation.data().examId;
            const examDocRef = doc(db, "exams", examId);
            return getDoc(examDocRef);
        });

        const examDocs = await Promise.all(examPromises);

        const examsData = examDocs
          .filter(examDoc => examDoc.exists())
          .map(examDoc => ({
            id: examDoc.id,
            ...examDoc.data()
          } as Exam));
        
        setAvailableExams(examsData);
      } catch (error) {
        console.error("Error fetching exams: ", error);
        // Handle error display to user
      } finally {
        setIsLoadingExams(false);
      }
    };

    if (user) {
      fetchInvitedExams();
    }
  }, [user]);

  if (loading || isLoadingExams) {
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
        <p className="text-muted-foreground">Welcome! Here are your available exams.</p>
      </div>

      {availableExams.length > 0 ? (
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
                  <span>{exam.questions.length} questions</span>
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
      ) : (
        <Card>
            <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg font-semibold">No Exams Available</p>
                    <p>You have not been invited to any exams yet. Please check back later.</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
