
"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '@/lib/firebase';

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["admin", "candidate"], { required_error: "You must select a role."}),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "candidate",
    },
  });

  // Helper function to create user document in Firestore
  const createUserDocument = async (uid: string, name: string | null, email: string | null, role: "admin" | "candidate") => {
    if (!uid || !email) return;
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, {
      uid,
      name,
      email,
      role,
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: values.name });
      await createUserDocument(user.uid, values.name, values.email, values.role);
      
      toast({
        title: "Account Created",
        description: "You have successfully signed up. Please log in.",
      });
      router.push('/login');
    } catch (error: any) {
       let errorMessage = "An unknown error occurred.";
       if (error.code === 'auth/email-already-in-use') {
           errorMessage = "This email is already in use. Please log in instead.";
       }
       toast({
        variant: "destructive",
        title: "Sign-up Failed",
        description: errorMessage,
      });
    }
  }

  async function handleGoogleSignUp() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // Only create a new user document if one doesn't already exist
      if (!userDoc.exists()) {
        // For Google sign up, default role is candidate.
        await createUserDocument(user.uid, user.displayName, user.email, "candidate");
      }
      
      toast({
        title: "Account Created / Logged In",
        description: "You have successfully signed in with Google.",
      });

      // Redirect to login which will handle role-based routing
      router.push('/login');

    } catch (error: any) {
      console.error("Google sign up error:", error);
      toast({
        variant: "destructive",
        title: "Google Sign-Up Failed",
        description: "Could not sign up with Google. Please try again.",
      });
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Get started with CBTsytem today!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="candidate">Candidate</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.521 4.792 29.632 2.5 24 2.5C11.418 2.5 1.5 12.418 1.5 25s9.918 22.5 22.5 22.5S46.5 37.582 46.5 25c0-2.384-.216-4.661-.609-6.917z"></path>
            <path fill="#FF3D00" d="m6.306 14.91l6.571 4.819C14.655 15.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.843-5.843A11.977 11.977 0 0 0 24 2.5C18.319 2.5 13.186 5.343 9.389 9.611z"></path>
            <path fill="#4CAF50" d="M24 47.5c5.94 0 11.219-1.928 14.92-5.181l-6.522-5.02c-2.43 1.636-5.462 2.701-8.398 2.701-5.223 0-9.651-3.344-11.303-8H4.996C6.726 39.52 14.77 47.5 24 47.5z"></path>
            <path fill="#1976D2" d="M43.611 20.083L43.594 20H24v8h11.303a12.04 12.04 0 0 1-4.065 5.992l6.522 5.02c3.512-3.248 5.833-7.96 5.833-13.012 0-2.384-.216-4.661-.609-6.917z"></path>
          </svg>
          Sign Up with Google
        </Button>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
