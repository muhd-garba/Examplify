
"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const handleLoginSuccess = async (user: User) => {
    try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/candidate/dashboard');
            }
        } else {
            // This case might happen with Google sign-in if the doc wasn't created,
            // or if a user was somehow deleted from Firestore but not Auth.
            // We can attempt to create it here or just deny login.
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "User profile not found. Please sign up or contact support.",
            });
            await auth.signOut();
        }
    } catch(error) {
        console.error("Error fetching user data:", error);
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Could not retrieve your user profile. Please try again.",
        });
        await auth.signOut();
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      await handleLoginSuccess(userCredential.user);
    } catch (error: any) {
      console.error("Login error:", error.code, error.message);
      let errorMessage = "An unknown error occurred. Please try again.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid credentials. Please check your email and password.";
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // After Google sign-in, we check their role from Firestore to redirect correctly.
      await handleLoginSuccess(result.user);
    } catch (error: any) {
       console.error("Google Sign-in error:", error.code, error.message);
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: "Could not sign in with Google. Please try again.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your CBTsytem account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.521 4.792 29.632 2.5 24 2.5C11.418 2.5 1.5 12.418 1.5 25s9.918 22.5 22.5 22.5S46.5 37.582 46.5 25c0-2.384-.216-4.661-.609-6.917z"></path>
            <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.843-5.843A11.977 11.977 0 0 0 24 2.5C18.319 2.5 13.186 5.343 9.389 9.611z"></path>
            <path fill="#4CAF50" d="M24 47.5c5.94 0 11.219-1.928 14.92-5.181l-6.522-5.02c-2.43 1.636-5.462 2.701-8.398 2.701-5.223 0-9.651-3.344-11.303-8H4.996C6.726 39.52 14.77 47.5 24 47.5z"></path>
            <path fill="#1976D2" d="M43.611 20.083L43.594 20H24v8h11.303a12.04 12.04 0 0 1-4.065 5.992l6.522 5.02c3.512-3.248 5.833-7.96 5.833-13.012 0-2.384-.216-4.661-.609-6.917z"></path>
          </svg>
          Sign In with Google
        </Button>
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
