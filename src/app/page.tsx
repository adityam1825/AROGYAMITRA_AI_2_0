import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import {
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { SurgePredictionChart } from "@/components/dashboard/surge-prediction-chart";
import { HealthAdvisories } from "@/components/dashboard/health-advisories";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { SurgePredictionTool } from "@/components/dashboard/surge-prediction-tool";
import { MainDashboard } from "@/components/dashboard/main-dashboard";

export const metadata: Metadata = {
  title: "Dashboard | SurgeGuard Mumbai",
  description: "Real-time dashboard for patient surge prediction and management.",
};

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 md:p-8 pt-6 bg-muted/40">
            <div className="max-w-7xl mx-auto space-y-4">
                <MainDashboard />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
