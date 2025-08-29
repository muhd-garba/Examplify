
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { MoreHorizontal, PlusCircle, Link2, Trash2, Edit, ArrowLeft, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Test {
  id: string;
  title: string;
  subject: string;
  questions: any[];
  duration: number;
}

const mockTests: Test[] = [
    { id: "1", title: "Physics 101 Midterm", subject: "Physics", questions: [{}, {}, {}, {}, {}], duration: 60 },
    { id: "2", title: "World History: 1500-1800", subject: "History", questions: [{}, {}, {}], duration: 45 },
    { id: "3", title: "Calculus II Final", subject: "Mathematics", questions: [{}, {}, {}, {}, {}, {}, {}, {}], duration: 120 },
    { id: "4", title: "Intro to Chemistry", subject: "Chemistry", questions: [{}, {}], duration: 30 },
];

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>(mockTests);
  const { toast } = useToast();
  const router = useRouter();


  const copyInvitationLink = (testId: string) => {
    const link = `${window.location.origin}/candidate/exams/${testId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "The invitation link has been copied to your clipboard.",
    });
  };

  const deleteTest = async (testId: string) => {
    if (!confirm("Are you sure you want to delete this test?")) {
      return;
    }
  
    try {
      // This is a mock action, so we just filter the state
      setTests(tests.filter(test => test.id !== testId));
      toast({
        title: "Test Deleted",
        description: "The test has been successfully deleted.",
      });
  
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting test",
        description: error.message,
      });
    }
  };

  const navigateToEdit = (testId: string) => {
    router.push(`/admin/exams/${testId}/edit`);
  };

  const navigateToResults = (testId: string) => {
    router.push(`/admin/results`);
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Manage Tests</h1>
            <p className="text-muted-foreground">View, edit, and control your existing tests.</p>
          </div>
        </div>
        <Link href="/admin/exams/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Test
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Test List</CardTitle>
            <CardDescription>A list of all tests in the system. You can edit, delete, or view results for each test.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Duration (mins)</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.title}</TableCell>
                  <TableCell>{test.subject}</TableCell>
                  <TableCell>{test.questions.length}</TableCell>
                  <TableCell>{test.duration}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigateToEdit(test.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Test
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigateToResults(test.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Results
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => copyInvitationLink(test.id)}>
                          <Link2 className="mr-2 h-4 w-4" />
                          Copy Invite Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteTest(test.id)} className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" />
                           Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
