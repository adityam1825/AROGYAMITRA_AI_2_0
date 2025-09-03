import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import {
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";
import { CitizenBuddyDashboard } from "@/components/citizen-buddy/citizen-buddy-dashboard";


export const metadata: Metadata = {
  title: "Citizen Buddy | ArogyaMitra AI",
  description: "Personalized health advisories, symptom checker, and emergency tools for citizens.",
};

export default function CitizenBuddyPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-background">
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 md:p-8 pt-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <CitizenBuddyDashboard />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
