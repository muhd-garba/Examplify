
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ArrowRight, BookOpen, Users, BarChart, ShieldCheck, Zap, Server } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="#how-it-works" className="text-muted-foreground transition-colors hover:text-foreground">How it Works</Link>
            <Link href="#testimonials" className="text-muted-foreground transition-colors hover:text-foreground">Testimonials</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
               <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
             <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <div className="container relative text-center animate-fade-in-up px-4 mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                    The Future of Online Examinations
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    CBTsytem provides a smart, secure, and seamless platform for creating, managing, and taking computer-based tests.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                        <span>Get Started for Free</span>
                        <ArrowRight className="ml-2" />
                    </Button>
                    </Link>
                    <Link href="/login">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            Admin Login
                        </Button>
                    </Link>
                </div>
                 <div className="mt-12 relative">
                    <Image 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                        alt="CBTsytem Dashboard"
                        width={1024}
                        height={576}
                        className="rounded-lg shadow-2xl mx-auto"
                        data-ai-hint="dashboard screen"
                    />
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/40">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Why Choose CBTsytem?</h2>
                    <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Discover the powerful features that make our platform the best choice for online testing.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                        <p className="text-muted-foreground">Advanced security features to prevent cheating and ensure test integrity. Highly reliable with 99.9% uptime.</p>
                    </div>
                     <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <Zap className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Intuitive Test Builder</h3>
                        <p className="text-muted-foreground">Easily create complex tests with multiple question types, time limits, and automated grading.</p>
                    </div>
                     <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <BarChart className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                        <p className="text-muted-foreground">Get detailed reports and insights into candidate performance to make data-driven decisions.</p>
                    </div>
                     <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <Users className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Easy Candidate Management</h3>
                        <p className="text-muted-foreground">Invite, manage, and track candidates effortlessly through a centralized dashboard.</p>
                    </div>
                    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <BookOpen className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Seamless Test Experience</h3>
                        <p className="text-muted-foreground">A clean, distraction-free interface for candidates to focus on their tests, on any device.</p>
                    </div>
                     <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        <Server className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Scalable Infrastructure</h3>
                        <p className="text-muted-foreground">Built on robust cloud infrastructure to handle thousands of concurrent test takers without a hitch.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Simple Steps to Get Started</h2>
                    <p className="mt-2 text-muted-foreground">A streamlined process for both administrators and candidates.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-primary">For Admins</h3>
                        <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">1</div>
                                <div className="w-px h-full bg-border mt-2"></div>
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Create an Account</h4>
                                <p className="text-muted-foreground">Sign up as an admin to get access to your dashboard.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">2</div>
                                 <div className="w-px h-full bg-border mt-2"></div>
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Build Your Test</h4>
                                <p className="text-muted-foreground">Use our intuitive test builder to create questions and set rules.</p>
                            </div>
                        </div>
                         <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">3</div>
                            <div>
                                <h4 className="font-bold mb-1">Invite Candidates & Analyze</h4>
                                <p className="text-muted-foreground">Invite candidates via email and view detailed results as they come in.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image 
                            src="https://images.unsplash.com/photo-1588196749107-4a171a0149b8?q=80&w=2074&auto=format&fit=crop" 
                            alt="Admin dashboard" 
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl"
                            data-ai-hint="dashboard interface"
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/40">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Loved by Educators and Institutions</h2>
                    <p className="mt-2 text-muted-foreground">Don't just take our word for it. Here's what people are saying.</p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                                <Avatar className="w-16 h-16 mb-4">
                                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop" data-ai-hint="male person" />
                                    <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                                <p className="text-muted-foreground italic mb-4 text-center">"CBTsytem has revolutionized how we conduct our entrance exams. It's secure, easy to use, and has saved us countless hours."</p>
                                <p className="font-bold">John Doe</p>
                                <p className="text-sm text-muted-foreground">Principal, Tech University</p>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                     <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                                <Avatar className="w-16 h-16 mb-4">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" data-ai-hint="female person" />
                                    <AvatarFallback>U2</AvatarFallback>
                                </Avatar>
                                <p className="text-muted-foreground italic mb-4 text-center">"The best platform for online assessments. The advanced analytics helped us identify key areas of improvement for our students."</p>
                                <p className="font-bold">Jane Smith</p>
                                <p className="text-sm text-muted-foreground">Director, Future Coders Academy</p>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                     <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                                <Avatar className="w-16 h-16 mb-4">
                                    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" data-ai-hint="female person" />
                                    <AvatarFallback>U3</AvatarFallback>
                                </Avatar>
                                <p className="text-muted-foreground italic mb-4 text-center">"A seamless experience for both our administrators and the test-takers. The support team is also incredibly responsive."</p>
                                <p className="font-bold">Samuel Lee</p>
                                <p className="text-sm text-muted-foreground">HR Manager, Innovate Inc.</p>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Elevate Your Testing Process?</h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Join hundreds of institutions who trust CBTsytem for their online examinations. Sign up today and experience the difference.</p>
                <div className="mt-8">
                     <Link href="/signup">
                        <Button size="lg">
                            <span>Get Started Now</span>
                            <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

      </main>
      
       <footer className="border-t">
        <div className="container mx-auto py-12 px-4">
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <Logo />
                    <p className="text-muted-foreground mt-2">The smart and secure online exam platform.</p>
                </div>
                <div className="grid grid-cols-2 md:col-span-2 gap-8">
                    <div>
                        <h4 className="font-semibold">Product</h4>
                        <ul className="space-y-2 mt-2">
                            <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Security</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Company</h4>
                        <ul className="space-y-2 mt-2">
                             <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} CBTsytem. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                    <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
