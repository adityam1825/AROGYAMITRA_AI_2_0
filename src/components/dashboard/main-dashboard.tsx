'use client';

import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { SurgePredictionChart } from "@/components/dashboard/surge-prediction-chart";
import { HealthAdvisories } from "@/components/dashboard/health-advisories";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { SurgePredictionTool } from "@/components/dashboard/surge-prediction-tool";
import { HowItWorks } from './how-it-works';

const content = {
  en: {
    title: 'Health Dashboard',
  },
  hi: {
    title: 'स्वास्थ्य डैशबोर्ड',
  },
  mr: {
    title: 'आरोग्य डॅशबोर्ड',
  },
  kn: {
    title: 'ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  te: {
    title: 'ఆరోగ్య డాష్‌బోర్డ్',
  },
  ta: {
    title: 'சுகாதார டாஷ்போர்டு',
  },
  sa: {
    title: 'स्वास्थ्योपकरणपटलम्',
  },
};

export function MainDashboard() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {city} {t.title}
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
          </div>
        </div>
        <HowItWorks />
        <SurgePredictionTool />
        <RecentAlerts />
      </div>
    </>
  );
}
