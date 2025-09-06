
"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  User,
  Loader2
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';


const navItems = [
  { href: '/candidate/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/candidate/results', icon: GraduationCap, label: 'My Results' },
];

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, loading, roleLoading } = useAuth();
  const { toast } = useToast();

   const handleSignOut = async () => {
    await auth.signOut();
    toast({ title: 'Signed Out', description: 'You have been successfully signed out.' });
    router.push('/candidate/login');
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/candidate/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!roleLoading && user && role === 'admin') {
      router.replace('/admin/dashboard');
      toast({ variant: 'destructive', title: 'Access Denied', description: 'Admins cannot access the candidate dashboard.' });
    }
  }, [user, role, roleLoading, router, toast]);

   if (loading || roleLoading || !user || role === 'admin') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <SidebarTrigger className="ml-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <User />
                  <span>Profile</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut}>
                  <LogOut />
                  <span>Exit</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="size-9">
              <AvatarImage src={user?.photoURL ?? "https://picsum.photos/40/40?grayscale"} alt={user?.displayName ?? "Candidate"} data-ai-hint="person student" />
              <AvatarFallback>{user?.displayName?.charAt(0) ?? 'C'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">{user?.displayName ?? 'Candidate User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
