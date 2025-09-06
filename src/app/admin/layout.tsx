
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  FilePlus2,
  ListOrdered,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Loader2,
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
  { href: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
  { href: '/admin/exams/create', icon: FilePlus2, label: 'Create Test' },
  { href: '/admin/exams', icon: ListOrdered, label: 'Manage Tests' },
  { href: '/admin/candidates', icon: Users, label: 'Candidates' },
  { href: '/admin/results', icon: BarChart3, label: 'Results' },
];

export default function AdminLayout({
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
    router.push('/admin/login');
  };
  
  useEffect(() => {
    const isAuthPage = pathname.includes('/admin/login') || pathname.includes('/admin/signup');
    
    if (loading || roleLoading) {
      // Still loading, don't do anything yet.
      return;
    }

    if (user && role === 'admin' && isAuthPage) {
        router.replace('/admin/dashboard');
    }

    if (!user && !isAuthPage) {
        router.replace('/admin/login');
        return;
    }
    
    if (user && role === 'candidate') {
        router.replace('/candidate/dashboard');
        toast({ variant: 'destructive', title: 'Access Denied', description: 'You do not have permission to access the admin dashboard.' });
    }

  }, [user, role, loading, roleLoading, pathname, router, toast]);

  if ((loading || roleLoading) && !(pathname.includes('/admin/login') || pathname.includes('/admin/signup'))) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if ((pathname.includes('/admin/login') || pathname.includes('/admin/signup'))) {
    return <>{children}</>
  }
  
  if (role !== 'admin') {
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
              <Link href="/admin/settings">
                <SidebarMenuButton isActive={pathname === '/admin/settings'}>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
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
              <AvatarImage src={user?.photoURL ?? `https://picsum.photos/40/40`} alt={user?.displayName ?? "Admin"} data-ai-hint="person" />
              <AvatarFallback>{user?.displayName?.charAt(0) ?? 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">{user?.displayName ?? 'Admin User'}</p>
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
