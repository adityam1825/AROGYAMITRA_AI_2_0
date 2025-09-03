import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import {
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";
import { MainDashboard } from "@/components/dashboard/main-dashboard";

export const metadata: Metadata = {
  title: "Dashboard | ArogyaMitra AI",
  description: "Real-time dashboard for patient surge prediction and management.",
};

export default function DashboardPage() {
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
                <MainDashboard />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
