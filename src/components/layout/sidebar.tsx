'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, CalendarDays, Backpack, Wrench, PlaneTakeoff } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/itinerary', label: 'Itinerary', icon: CalendarDays },
  { href: '/packing-list', label: 'Packing List', icon: Backpack },
  { href: '/tools', label: 'Tools', icon: Wrench },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isRootPath = (href: string) => href === '/' && pathname !== '/';

  return (
    <Sidebar className="hidden md:flex md:flex-col md:border-r" style={{'--sidebar-width': '280px'} as React.CSSProperties}>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <PlaneTakeoff className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold">WanderEase</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton 
                  isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                  className={cn(isRootPath(item.href) && 'text-muted-foreground')}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-base">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
