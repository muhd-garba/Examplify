
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
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

// Mock user email for demonstration since auth is removed
const MOCK_USER_EMAIL = "candidate@example.com";

export default function CandidateDashboard() {
  const [availableTests, setAvailableTests] = useState<Test[]>([]);
  const [isLoadingTests, setIsLoadingTests] = useState(true);

  useEffect(() => {
    const fetchInvitedTests = async () => {
      try {
        // 1. Find invitations for the mock candidate email
        const invitationsQuery = query(
          collection(db, "invitations"),
          where("candidateEmail", "==", MOCK_USER_EMAIL)
        );
        const querySnapshot = await getDocs(invitationsQuery);
        const invitationDocs = querySnapshot.docs;

        if (invitationDocs.length === 0) {
          setAvailableTests([]);
          setIsLoadingTests(false);
          return;
        }

        // 2. Fetch the details for each invited test
        const testPromises = invitationDocs.map(invitation => {
            const testId = invitation.data().testId;
            const testDocRef = doc(db, "tests", testId);
            return getDoc(testDocRef);
        });

        const testDocs = await Promise.all(testPromises);

        const testsData = testDocs
          .filter(testDoc => testDoc.exists())
          .map(testDoc => ({
            id: testDoc.id,
            ...testDoc.data()
          } as Test));
        
        setAvailableTests(testsData);
      } catch (error) {
        console.error("Error fetching tests: ", error);
        // Handle error display to user
      } finally {
        setIsLoadingTests(false);
      }
    };

    fetchInvitedTests();
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
