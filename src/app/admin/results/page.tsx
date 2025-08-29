
"use client";

import { useEffect, useState } from "react";
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
  submittedAt: Date;
}

const mockResults: Result[] = [
    { id: "1", candidateEmail: "alice@example.com", testTitle: "Physics 101 Midterm", score: 8, totalQuestions: 10, status: "Passed", submittedAt: new Date("2024-05-20T10:30:00Z") },
    { id: "2", candidateEmail: "bob@example.com", testTitle: "Calculus II Final", score: 9, totalQuestions: 10, status: "Passed", submittedAt: new Date("2024-05-19T14:00:00Z") },
    { id: "3", candidateEmail: "charlie@example.com", testTitle: "Intro to Chemistry", score: 4, totalQuestions: 10, status: "Failed", submittedAt: new Date("2024-05-19T11:00:00Z") },
    { id: "4", candidateEmail: "diana@example.com", testTitle: "World History: 1500-1800", score: 7, totalQuestions: 10, status: "Passed", submittedAt: new Date("2024-05-18T16:45:00Z") },
    { id: "5", candidateEmail: "alice@example.com", testTitle: "Calculus II Final", score: 6, totalQuestions: 10, status: "Passed", submittedAt: new Date("2024-05-18T09:20:00Z") },
];


export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>(mockResults);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formatDate = (date: Date) => {
    if (!date) return 'N/A';
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
