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
import { Download, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const results = [
  { id: "1", candidate: "Alice Johnson", exam: "Physics 101", score: 85, status: "Passed", date: "2023-10-26" },
  { id: "2", candidate: "Bob Williams", exam: "Calculus II", score: 92, status: "Passed", date: "2023-10-25" },
  { id: "3", candidate: "Charlie Brown", exam: "Intro to Chemistry", score: 45, status: "Failed", date: "2023-10-25" },
  { id: "4", candidate: "Diana Miller", exam: "World History", score: 76, status: "Passed", date: "2023-10-24" },
  { id: "5", candidate: "Alice Johnson", exam: "Calculus II", score: 78, status: "Passed", date: "2023-10-23" },
];

export default function ResultsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Results</h1>
          <p className="text-muted-foreground">View and export exam results.</p>
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
          <CardTitle>All Exam Results</CardTitle>
          <CardDescription>A comprehensive list of all exam submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Score (%)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.candidate}</TableCell>
                  <TableCell>{result.exam}</TableCell>
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
