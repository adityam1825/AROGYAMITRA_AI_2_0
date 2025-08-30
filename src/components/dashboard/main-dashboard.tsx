'use client';

import { useLanguage } from '@/context/language-context';
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { SurgePredictionChart } from "@/components/dashboard/surge-prediction-chart";
import { HealthAdvisories } from "@/components/dashboard/health-advisories";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { SurgePredictionTool } from "@/components/dashboard/surge-prediction-tool";

const content = {
  en: {
    title: 'Mumbai Health Dashboard',
  },
  hi: {
    title: 'मुंबई स्वास्थ्य डैशबोर्ड',
  },
  mr: {
    title: 'मुंबई आरोग्य डॅशबोर्ड',
  },
};

export function MainDashboard() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.title}
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
    </>
  );
}
