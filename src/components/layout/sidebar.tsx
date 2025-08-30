'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    dashboard: "Dashboard",
    citizenBuddy: "Citizen Buddy",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    citizenBuddy: "सिटीजन बडी",
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    citizenBuddy: "सिटिझन बडी",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    citizenBuddy: "ಸಿಟಿಜನ್ ಬಡ್ಡಿ",
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    citizenBuddy: "సిటిజన్ బడ్డీ",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    citizenBuddy: "சிட்டிசன் படி",
  },
  sa: {
    dashboard: "उपकरणपटलम्",
    citizenBuddy: "नागरिक-बन्धुः",
  },
};

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6 text-primary"
  >
    <path
      fillRule="evenodd"
      d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 015.69 3.117.75.75 0 01-.88.941A5.247 5.247 0 0012 13.5a5.247 5.247 0 00-4.81 2.558.75.75 0 01-.88-.94z"
      clipRule="evenodd"
    />
  </svg>
);


export function AppSidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <LogoIcon />
          <span className="text-lg font-semibold">ArogyaMitra AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/'}
              tooltip={t.dashboard}
            >
              <Link href="/">
                <LayoutDashboard />
                <span>{t.dashboard}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/citizen-buddy'}
              tooltip={t.citizenBuddy}
            >
              <Link href="/citizen-buddy">
                <Users />
                <span>{t.citizenBuddy}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
