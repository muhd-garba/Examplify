
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter, Loader2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";

interface Result {
  id: string;
  candidateEmail: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  status: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const q = query(collection(db, "results"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const resultsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const score = data.score;
          const totalQuestions = data.totalQuestions;
          const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
          return {
            id: doc.id,
            ...data,
            status: percentage >= 50 ? "Passed" : "Failed",
          } as Result;
        });
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching results: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const formatDate = (timestamp: { seconds: number, nanoseconds: number }) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return format(date, 'PPP p');
  };
  
  const calculatePercentage = (score: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Results</h1>
            <p className="text-muted-foreground">View and export test results.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Results
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Test Results</CardTitle>
          <CardDescription>A comprehensive list of all test submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Score (%)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.candidateEmail}</TableCell>
                  <TableCell>{result.testTitle}</TableCell>
                  <TableCell>{calculatePercentage(result.score, result.totalQuestions)}%</TableCell>
                  <TableCell>
                     <Badge variant={result.status === "Passed" ? "default" : "destructive"} className={`${result.status === "Passed" ? 'bg-green-500' : ''}`}>
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(result.submittedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
