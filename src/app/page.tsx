"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="absolute top-0 left-0 w-full p-4 sm:p-6 lg:p-8">
        <Logo />
      </header>
      <div className="flex-1">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center p-8 text-center bg-background">
            <div className="w-full max-w-md space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome to Examplify
              </h1>
              <p className="text-lg text-muted-foreground">
                The modern platform for online assessment. Access the right tools for your role with a single click.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/admin/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full">
                    Go to Admin Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/candidate/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full">
                    Go to Candidate Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Image
              src="https://picsum.photos/1200/1800"
              alt="A student looking at a computer screen"
              width={1200}
              height={1800}
              className="h-full w-full object-cover"
              data-ai-hint="student computer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent lg:bg-gradient-to-r" />
          </div>
        </div>
      </div>
    </div>
  );
}
