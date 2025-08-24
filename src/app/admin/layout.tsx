
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FilePlus2,
  ListOrdered,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';

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

const navItems = [
  { href: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
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
  const { toast } = useToast();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
    }
  };

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
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="size-9">
              <AvatarImage src={user?.photoURL || "https://placehold.co/40x40.png"} alt="Admin" data-ai-hint="person" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">{user?.displayName || "Admin User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "admin@examplify.com"}</p>
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
