import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { BookCopy, Users, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Exams", value: "12", icon: BookCopy },
    { title: "Total Candidates", value: "150", icon: Users },
    { title: "Completed Tests", value: "342", icon: CheckCircle },
  ];

  const recentResults = [
    { name: "Alice Johnson", exam: "Physics 101", score: "85%", status: "Passed" },
    { name: "Bob Williams", exam: "Calculus II", score: "92%", status: "Passed" },
    { name: "Charlie Brown", exam: "Intro to Chemistry", score: "45%", status: "Failed" },
    { name: "Diana Miller", exam: "World History", score: "76%", status: "Passed" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{result.name}</TableCell>
                  <TableCell>{result.exam}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                    <Badge variant={result.status === "Passed" ? "default" : "destructive"} className={`${result.status === "Passed" ? 'bg-green-500' : ''}`}>
                      {result.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
