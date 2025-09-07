"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, BookOpen, Users, BarChart2, Shield, Clock, Award } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Custom hook for fade-in animations
function useFadeInAnimation(delay = 0) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  return {
    ref,
    style: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(50px)",
      transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
    }
  };
}

export default function HomePage() {
  // Hero section animation
  const heroAnimation = useFadeInAnimation();
  const heroImageAnimation = useFadeInAnimation(0.2);
  
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-down animate-duration-500">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-2 md:flex">
            <Link href="/admin/login">
              <Button variant="ghost" className="transition-all duration-300 hover:-translate-y-0.5">Admin Login</Button>
            </Link>
            <Link href="/candidate/login">
              <Button className="group transition-all duration-300 hover:-translate-y-0.5">
                Candidate Login 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </nav>
          <nav className="flex items-center gap-2 md:hidden">
            <Link href="/admin/login">
              <Button size="sm">Admin</Button>
            </Link>
            <Link href="/candidate/login">
              <Button size="sm">Candidate</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative w-full py-24 md:py-32 lg:py-40">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(hsl(var(--muted))_1px,transparent_1px)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 top-0 z-0 h-full w-full bg-background [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            />
            <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6 text-center lg:text-left" ref={heroAnimation.ref} style={heroAnimation.style}>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  The Future of <span className="text-primary">Secure</span> Online Assessment
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-lg mx-auto lg:mx-0">
                  Examplify is a robust, all-in-one platform for creating, managing, and conducting secure computer-based tests with ease and efficiency.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link href="/admin/login">
                    <Button size="lg" className="w-full transition-all duration-300 hover:scale-105 group">
                      Admin Dashboard
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/candidate/login">
                    <Button size="lg" variant="outline" className="w-full transition-all duration-300 hover:scale-105">
                      Candidate Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative" ref={heroImageAnimation.ref} style={heroImageAnimation.style}>
                <Image
                  src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Students taking a computer based test"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-2xl transition-all duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-xl bg-primary/20"></div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 md:py-28 bg-muted/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="container space-y-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need for Seamless Exams</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  From creation to analysis, Examplify streamlines the entire examination lifecycle.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: BookOpen, title: "Intuitive Test Builder", desc: "Easily create tests with multiple question types, time limits, and custom instructions." },
                  { icon: Users, title: "Candidate Management", desc: "Invite candidates via email, track their progress, and manage user roles effortlessly." },
                  { icon: BarChart2, title: "Instant, Detailed Results", desc: "Automated grading and in-depth analytics provide immediate insights for everyone." },
                ].map((feature, i) => {
                  const animation = useFadeInAnimation(i * 0.1);
                  return (
                    <div key={i} ref={animation.ref} style={animation.style} className="flex flex-col items-center text-center p-8 bg-card rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 border border-border/50">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <feature.icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-20 md:py-28">
            <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <div {...useFadeInAnimation()}>
                  <h2 className="text-3xl font-bold tracking-tight">Focus on Learning, Not Logistics</h2>
                  <p className="mt-4 text-lg text-muted-foreground">Examplify is built with a modern, secure, and scalable foundation, allowing you to conduct assessments with confidence.</p>
                  <ul className="mt-8 space-y-5">
                    {[
                      { icon: Shield, text: "Secure Authentication for Admins and Candidates." },
                      { icon: Clock, text: "Timed test environment with auto-submission." },
                      { icon: BarChart2, text: "Detailed performance review for candidates after completion." },
                      { icon: Award, text: "Built on a robust stack for reliability and speed." },
                    ].map((item, i) => {
                      const animation = useFadeInAnimation(i * 0.1);
                      return (
                        <li key={i} ref={animation.ref} style={animation.style} className="flex items-start">
                          <item.icon className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                          <p className="text-lg text-muted-foreground">{item.text}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div {...useFadeInAnimation(0.2)}>
                  <Image
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="A person taking a computer based test"
                    width={800}
                    height={700}
                    className="rounded-xl shadow-2xl transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-xl bg-primary/20"></div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-20 md:py-28 bg-muted/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by Educators & Professionals</h2>
              </div>
              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Dr. Evelyn Reed", role: "University Professor", quote: "Examplify has transformed my final exams. The automated grading saves me days of work, and the students appreciate the instant feedback.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" },
                  { name: "David Chen", role: "Hiring Manager", quote: "We use Examplify for our technical assessments. It's secure, reliable, and provides a professional experience for our candidates.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" },
                  { name: "Maria Garcia", role: "High School Student", quote: "The interface is so clean and easy to use. I can focus on the test without any distractions. Getting my score right away is a huge plus!", avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" },
                ].map((t, i) => {
                  const animation = useFadeInAnimation(i * 0.2);
                  return (
                    <div key={i} ref={animation.ref} style={animation.style} className="bg-card p-6 rounded-xl shadow-lg flex flex-col border border-border/50 transition-all duration-300 hover:-translate-y-2">
                      <p className="flex-grow text-muted-foreground before:content-['“'] after:content-['”'] before:mr-1 after:ml-1 before:text-2xl after:text-2xl before:font-serif after:font-serif">{t.quote}</p>
                      <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
                        <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full" />
                        <div>
                          <p className="font-semibold text-foreground">{t.name}</p>
                          <p className="text-sm text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20 md:py-32">
            <div className="container text-center">
              <div {...useFadeInAnimation()}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Revolutionize Your Assessments?</h2>
                <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                  Join leading institutions and companies who trust Examplify. Create your first test today and experience the future of online testing.
                </p>
                <div className="mt-8">
                  <Link href="/admin/login">
                    <Button size="lg" className="transition-all duration-300 hover:scale-105 group">
                      Get Started for Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <Logo />
              <p className="text-muted-foreground text-sm max-w-xs">A modern, secure, and intuitive platform for online examinations.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-2">
              <div>
                <h3 className="font-semibold text-foreground">Product</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Company</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Legal</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Examplify. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}