"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
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
import { MoreHorizontal, PlusCircle, Link2, Trash2, Edit } from "lucide-react";
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
  questions: any[];
  duration: number;
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTests = async () => {
      const querySnapshot = await getDocs(collection(db, "tests"));
      const testsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Test));
      setTests(testsData);
    };
    fetchTests();
  }, []);

  const copyInvitationLink = (testId: string) => {
    const link = `${window.location.origin}/candidate/exams/${testId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "The invitation link has been copied to your clipboard.",
    });
  };

  const deleteTest = async (testId: string) => {
    if (confirm("Are you sure you want to delete this test?")) {
      try {
        await deleteDoc(doc(db, "tests", testId));
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
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tests</h1>
          <p className="text-muted-foreground">Manage your tests and questions.</p>
        </div>
        <Link href="/admin/exams/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Test
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Test List</CardTitle>
            <CardDescription>A list of all tests in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
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
                        <DropdownMenuItem onClick={() => copyInvitationLink(test.id)}>
                          <Link2 className="mr-2 h-4 w-4" />
                          Copy Invite Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
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
