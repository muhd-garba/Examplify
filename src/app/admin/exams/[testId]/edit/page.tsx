
"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useRouter, useParams } from 'next/navigation';
import { PlusCircle, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
import { Label } from "@/components/ui/label";

const optionSchema = z.object({
  text: z.string().min(1, "Option text cannot be empty."),
});

const questionSchema = z.object({
  text: z.string().min(1, "Question text cannot be empty."),
  options: z.array(optionSchema).min(2, "At least two options are required."),
  correctOptionIndex: z.string({ required_error: "Please select a correct answer." }),
});

const testSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute."),
  questions: z.array(questionSchema).min(1, "At least one question is required."),
});

type TestFormValues = z.infer<typeof testSchema>;

export default function EditTestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 60,
      questions: [],
    },
  });
  
  useEffect(() => {
    if (!testId) return;

    const fetchTest = async () => {
      try {
        const testRef = doc(db, "tests", testId);
        const testSnap = await getDoc(testRef);

        if (testSnap.exists()) {
          const testData = testSnap.data();
          form.reset({
            title: testData.title,
            description: testData.description,
            duration: testData.duration,
            questions: testData.questions.map((q: any) => ({
                ...q,
                correctOptionIndex: String(q.correctOptionIndex)
            }))
          });
        } else {
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "Test not found.",
          });
          router.push("/admin/exams");
        }
      } catch (error) {
         toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load test data.",
          });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTest();
  }, [testId, form, router, toast]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });
  
  async function onSubmit(data: TestFormValues) {
    try {
      const testRef = doc(db, "tests", testId);
      await updateDoc(testRef, {
        ...data,
        questions: data.questions.map(q => ({
          ...q,
          correctOptionIndex: parseInt(q.correctOptionIndex, 10)
        }))
      });

      toast({
        title: "Test Updated!",
        description: `The test "${data.title}" has been successfully updated.`,
      });
      router.push("/admin/exams");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update test",
        description: error.message,
      });
    }
  }

  if (loading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Test</h1>
          <p className="text-muted-foreground">Modify the details of this test.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Test Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Title</FormLabel>
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
                    <FormControl><Textarea placeholder="Describe the test..." {...field} /></FormControl>
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
              <CardTitle>Questions</CardTitle>
              <CardDescription>Edit the questions and options for this test.</CardDescription>
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
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <QuestionOptions form={form} questionIndex={index} />
                          </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => append({ text: "", options: [{ text: "" }, { text: "" }], correctOptionIndex: "0" })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function QuestionOptions({ form, questionIndex }: { form: any; questionIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.options`,
  });

  const { setValue } = form;

  const handleOptionRemove = (optionIndex: number) => {
    const currentCorrectIndex = form.getValues(`questions.${questionIndex}.correctOptionIndex`);
    if (String(optionIndex) === currentCorrectIndex) {
        setValue(`questions.${questionIndex}.correctOptionIndex`, "", { shouldValidate: true });
    }
    remove(optionIndex);
  };


  return (
    <div className="space-y-2">
      {fields.map((optionField, optionIndex) => (
        <FormField
          key={optionField.id}
          control={form.control}
          name={`questions.${questionIndex}.options.${optionIndex}.text`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center w-full gap-2">
                   <RadioGroupItem value={String(optionIndex)} id={`${questionIndex}-${optionIndex}`} />
                   <Label htmlFor={`${questionIndex}-${optionIndex}`} className="flex-1">
                    <Input {...field} placeholder={`Option ${optionIndex + 1}`} />
                  </Label>
                   {fields.length > 2 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleOptionRemove(optionIndex)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage/>
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
