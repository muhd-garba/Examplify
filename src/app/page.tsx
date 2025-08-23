
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ArrowRight, UserCog, User } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <Logo />
        <div className="flex gap-2">
          <Link href="/login">
             <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
            CBTsytem
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            A Smart and Secure Online Exam Platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                <span>Get Started</span>
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
       <footer className="p-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} CBTsytem. All rights reserved.
      </footer>
    </div>
  );
}
