import type { Metadata } from "next";
import { Header } from "@/components/features/dashboard/layout/header";
import { AppSidebar } from "@/components/features/dashboard/layout/sidebar";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { OverviewCards } from "@/components/features/dashboard/overview-cards";
import { SurgePredictionChart } from "@/components/features/dashboard/surge-prediction-chart";
import { HealthAdvisories } from "@/components/features/dashboard/health-advisories";
import { RecentAlerts } from "@/components/features/dashboard/recent-alerts";
import { SurgePredictionTool } from "@/components/features/dashboard/surge-prediction-tool";

export const metadata: Metadata = {
  title: "Dashboard | SurgeGuard Mumbai",
  description: "Real-time dashboard for patient surge prediction and management.",
};

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Mumbai Health Dashboard
              </h1>
            </div>
            <div className="space-y-4">
              <OverviewCards />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                 <div className="col-span-4">
                  <SurgePredictionChart />
                 </div>
                <div className="col-span-4 lg:col-span-3 space-y-4">
                  <HealthAdvisories />
                  <RecentAlerts />
                </div>
              </div>
              <SurgePredictionTool />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
