
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Examplify</CardTitle>
            <CardDescription>
              Authentication has been removed. You can now directly access the admin or candidate dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/dashboard">
              <Button className="w-full">
                Go to Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/candidate/dashboard">
              <Button variant="outline" className="w-full">
                Go to Candidate Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
