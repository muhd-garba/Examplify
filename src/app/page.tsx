
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, ShieldCheck, BarChart2 } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost">Admin Login</Button>
            </Link>
            <Link href="/candidate/dashboard">
              <Button>Candidate Login <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
           <div
            aria-hidden="true"
            className="absolute inset-0 top-0 h-full w-full bg-background [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          />
          <div className="container relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-center lg:text-left animate-fade-in-up">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                The Future of Online Assessment is Here
              </h1>
              <p className="text-lg text-muted-foreground">
                Examplify provides a seamless, secure, and intuitive platform for creating, managing, and taking tests online. Empower your institution with modern tools.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/admin/dashboard">
                  <Button size="lg" className="w-full">
                    Get Started as Admin
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/candidate/dashboard">
                  <Button size="lg" variant="outline" className="w-full">
                    Take a Test
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-up [animation-delay:200ms]">
                <Image
                  src="https://picsum.photos/800/600"
                  alt="A modern computer-based testing interface"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="modern computer interface"
                />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-muted/50">
          <div className="container space-y-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Examplify?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need for a streamlined and secure examination process.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { icon: BookOpen, title: "Effortless Test Creation", desc: "Build comprehensive tests with our intuitive creator, supporting multiple question types." },
                { icon: ShieldCheck, title: "Secure & Reliable", desc: "Ensure test integrity with secure authentication and a robust, scalable infrastructure." },
                { icon: BarChart2, title: "Instant Analytics", desc: "Get immediate results and detailed performance insights for both candidates and administrators." },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md animate-fade-in-up" style={{animationDelay: `${i * 200}ms`}}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-28">
            <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                <div className="order-2 lg:order-1 animate-fade-in-up">
                    <h2 className="text-3xl font-bold tracking-tight">Simple Steps to Success</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our platform is designed for ease of use. Get up and running in minutes.</p>
                    <ul className="mt-8 space-y-6">
                        {["Create a test with our intuitive builder.", "Invite candidates with a simple email list.", "View detailed results instantly upon completion."].map((step, i) => (
                             <li key={i} className="flex items-start">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{i + 1}</div>
                                <p className="ml-4 text-lg">{step}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="order-1 lg:order-2 animate-fade-in-up [animation-delay:200ms]">
                    <Image
                        src="https://picsum.photos/800/600?grayscale"
                        alt="Screenshot of admin dashboard"
                        width={800}
                        height={600}
                        className="rounded-xl shadow-xl"
                        data-ai-hint="admin dashboard"
                    />
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-28 bg-muted/50">
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
                 </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { name: "Sarah L.", role: "Professor", quote: "Examplify has revolutionized how I conduct my midterms. It's so much more efficient than paper-based tests.", avatarHint: "woman teacher" },
                        { name: "Michael B.", role: "HR Manager", quote: "We use Examplify for our pre-employment screening. It's reliable, secure, and saves us countless hours.", avatarHint: "man suit" },
                        { name: "Jessica P.", role: "Student", quote: "Taking tests on Examplify is straightforward and stress-free. I love getting my results right away!", avatarHint: "student person" },
                    ].map((t, i) => (
                        <div key={i} className="bg-background p-6 rounded-lg shadow-md animate-fade-in-up" style={{animationDelay: `${i * 200}ms`}}>
                            <p className="italic text-muted-foreground">"{t.quote}"</p>
                            <div className="mt-4 flex items-center gap-3">
                                <Image src={`https://picsum.photos/seed/${t.name}/40/40`} alt={t.name} width={40} height={40} className="rounded-full" data-ai-hint={t.avatarHint} />
                                <div>
                                    <p className="font-semibold">{t.name}</p>
                                    <p className="text-sm text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 md:py-32">
            <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Transform Your Assessments?</h2>
                <p className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground">
                    Join leading institutions and companies who trust Examplify. Create your first test today.
                </p>
                <div className="mt-8">
                     <Link href="/admin/dashboard">
                        <Button size="lg">
                            Get Started for Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t">
          <div className="container py-6 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Examplify. All Rights Reserved.
          </div>
      </footer>
    </div>
  );
}
