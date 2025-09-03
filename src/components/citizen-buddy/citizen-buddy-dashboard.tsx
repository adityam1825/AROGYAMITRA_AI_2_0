"use client";

import { useLanguage } from "@/context/language-context";
import { PersonalizedAdvisories } from "./personalized-advisories";
import { SymptomChecker } from "./symptom-checker";
import { EmergencySOS } from "./emergency-sos";
import { MedicationReminders } from "./medication-reminders";
import { FindHospitals } from "./find-hospitals";
import { BookAppointment } from "./book-appointment";
import { CitizenHealthBuddy } from "./citizen-health-buddy";

const content = {
    en: {
        title: "Citizen Buddy",
    },
    hi: {
        title: "सिटीजन बडी",
    },
    mr: {
        title: "सिटिझन बडी",
    },
    kn: {
        title: "ಸಿಟಿಜನ್ ಬಡ್ಡಿ",
    },
    te: {
        title: "సిటిజన్ బడ్డీ",
    },
    ta: {
        title: "சிட்டிசன் படி",
    },
    san: {
        title: "नागरिक-बन्धुः",
    },
};

export function CitizenBuddyDashboard() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.title}
        </h1>
      </div>
      <div className="space-y-6">
        <CitizenHealthBuddy />
        <PersonalizedAdvisories />
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <SymptomChecker />
            <EmergencySOS />
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <MedicationReminders />
          <FindHospitals />
        </div>
        <div className="grid md:grid-cols-1 gap-6 items-stretch">
          <BookAppointment />
        </div>
      </div>
    </>
  );
}
