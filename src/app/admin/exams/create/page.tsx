"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { PlusCircle, Trash2 } from "lucide-react";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const optionSchema = z.object({
  text: z.string().min(1, "Option text cannot be empty."),
});

const questionSchema = z.object({
  text: z.string().min(1, "Question text cannot be empty."),
  options: z.array(optionSchema).min(2, "At least two options are required."),
  correctOptionIndex: z.string().min(1, "Please select a correct answer."),
});

const examSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute."),
  questions: z.array(questionSchema).min(1, "At least one question is required."),
  candidateEmails: z.string().min(1, "Please enter at least one candidate email."),
});

type ExamFormValues = z.infer<typeof examSchema>;

export default function CreateExamPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 60,
      questions: [{ text: "", options: [{ text: "" }, { text: "" }], correctOptionIndex: "" }],
      candidateEmails: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });
  
  async function onSubmit(data: ExamFormValues) {
    try {
      // 1. Create the exam document
      const examData = {
        title: data.title,
        description: data.description,
        duration: data.duration,
        questions: data.questions.map(q => ({
          ...q,
          correctOptionIndex: parseInt(q.correctOptionIndex, 10)
        }))
      };
      const examDocRef = await addDoc(collection(db, "exams"), examData);

      // 2. Create invitations in a batch
      const batch = writeBatch(db);
      const emails = data.candidateEmails.split(',').map(email => email.trim()).filter(email => email);
      
      emails.forEach(email => {
        const invitationRef = doc(collection(db, "invitations"));
        batch.set(invitationRef, {
          candidateEmail: email,
          examId: examDocRef.id,
          status: "invited"
        });
      });

      await batch.commit();

      toast({
        title: "Exam Created!",
        description: `The exam "${data.title}" has been created and invitations sent.`,
      });
      router.push("/admin/exams");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create exam",
        description: error.message,
      });
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Exam</h1>
        <p className="text-muted-foreground">Fill in the details to create a new exam and invite candidates.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Physics 101 Midterm" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the exam..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (in minutes)</FormLabel>
                    <FormControl><Input type="number" placeholder="60" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Invite Candidates</CardTitle>
              <CardDescription>Enter candidate email addresses, separated by commas.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="candidateEmails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Emails</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="candidate1@example.com, candidate2@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>Add questions and options for this exam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name={`questions.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Text</FormLabel>
                        <FormControl><Textarea placeholder="What is the capital of France?" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`questions.${index}.correctOptionIndex`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Options (select the correct one)</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <QuestionOptions control={form.control} questionIndex={index} />
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => append({ text: "", options: [{ text: "" }, { text: "" }], correctOptionIndex: "" })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">Create Exam & Send Invites</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function QuestionOptions({ control, questionIndex }: { control: any; questionIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  return (
    <div className="space-y-2">
      {fields.map((optionField, optionIndex) => (
        <FormField
          key={optionField.id}
          control={control}
          name={`questions.${questionIndex}.options.${optionIndex}.text`}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <div className="flex items-center w-full gap-2">
                  <RadioGroupItem value={String(optionIndex)} />
                  <Input {...field} placeholder={`Option ${optionIndex + 1}`} />
                   {fields.length > 2 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(optionIndex)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      ))}
       <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ text: "" })}
        className="mt-2"
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Option
      </Button>
    </div>
  );
}
