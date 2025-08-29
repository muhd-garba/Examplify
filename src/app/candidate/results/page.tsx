
"use client";

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
import { Badge } from "@/components/ui/badge";

const results = [
    { id: "1", test: "Physics 101", score: 85, status: "Passed", date: "2023-10-26" },
    { id: "2", test: "Calculus II", score: 92, status: "Passed", date: "2023-10-25" },
    { id: "3", test: "Intro to Chemistry", score: 45, status: "Failed", date: "2023-10-25" },
    { id: "4", test: "World History", score: 76, status: "Passed", date: "2023-10-24" },
    { id: "5", test: "Calculus II", score: 78, status: "Passed", date: "2023-10-23" },
];

export default function CandidateResultsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Results</h1>
        <p className="text-muted-foreground">View your past test results.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
          <CardDescription>A list of all the tests you have taken.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Score (%)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Taken</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.test}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                     <Badge variant={result.status === "Passed" ? "default" : "destructive"} className={`${result.status === "Passed" ? 'bg-green-500' : ''}`}>
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{result.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

