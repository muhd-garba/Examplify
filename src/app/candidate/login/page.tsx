"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function CandidateLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role !== 'candidate') {
        await auth.signOut();
        throw new Error("This account is not registered as a candidate.");
      }
      
       toast({ title: "Login Successful", description: "Redirecting to your dashboard..." });
       router.push('/candidate/dashboard');
    } catch(error: any) {
        const code = error?.code || '';

        // Temporary debug logs - remove when issue is resolved
        try {
          // eslint-disable-next-line no-console
          console.debug('Candidate sign-in failed', { code, message: error?.message, online: typeof navigator !== 'undefined' ? navigator.onLine : 'unknown' });
          // quick same-origin fetch to help diagnose network routing (will fail if offline)
          if (typeof window !== 'undefined') {
            fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
              .then(res => console.debug('favicon check', { ok: res.ok, status: res.status }))
              .catch(err => console.debug('favicon check failed', err));
          }
        } catch (logErr) {
          // eslint-disable-next-line no-console
          console.debug('Error while logging sign-in failure', logErr);
        }

        if (code === 'auth/network-request-failed') {
          toast({ variant: "destructive", title: "Network Error", description: "Unable to reach authentication server. Check your internet connection and try again." });
        } else if (code === 'auth/user-not-found') {
          toast({ variant: "destructive", title: "User not found", description: "No account found with this email. Please sign up." });
        } else if (code === 'auth/wrong-password') {
          toast({ variant: "destructive", title: "Incorrect password", description: "The password you entered is incorrect." });
        } else {
          toast({ variant: "destructive", title: "Login Failed", description: error.message });
        }
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
     try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role !== 'candidate') {
          await auth.signOut();
          throw new Error("This Google account is registered as an Admin. Please use a different account.");
      }

      if (!userDoc.exists()) {
          // This is a new user, create their document
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            role: 'candidate',
            createdAt: new Date(),
          });
      }
      
      toast({ title: "Login Successful", description: "Redirecting to your dashboard..." });
      router.push('/candidate/dashboard');

    } catch (error: any) {
       toast({ variant: "destructive", title: "Login Failed", description: error.message });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Candidate Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard and assigned tests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
            <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
             {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
        <Separator className="my-6" />
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={googleLoading}>
            {googleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.5 174.3 57.9l-67.4 64.8C297.7 99.9 274.9 88 248 88c-73.2 0-133.1 59.9-133.1 133.1s59.9 133.1 133.1 133.1c76.9 0 115.7-32.3 124.2-61.7H256v-85.3h232.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>}
            Sign in with Google
        </Button>
      </CardContent>
       <CardFooter>
        <div className="text-sm text-center w-full">
            Don&apos;t have an account?{' '}
            <Link href="/candidate/signup" className="underline">
              Sign up
            </Link>
          </div>
      </CardFooter>
    </Card>
  );
}
