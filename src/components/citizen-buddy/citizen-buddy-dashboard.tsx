"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/language-context";
import { PersonalizedAdvisories } from "./personalized-advisories";
import { Stethoscope, Bell, AlertTriangle, MessageSquare, History } from 'lucide-react';

const content = {
    en: {
        title: "Citizen Buddy",
        advisories: "Advisories",
        symptomChecker: "Symptom Checker",
        reminders: "Reminders",
        sos: "SOS",
        report: "Report Issue",
    },
    hi: {
        title: "सिटीजन बडी",
        advisories: "सलाह",
        symptomChecker: "लक्षण परीक्षक",
        reminders: "रिमाइंडर",
        sos: "एसओएस",
        report: "समस्या की रिपोर्ट करें",
    },
    mr: {
        title: "सिटिझन बडी",
        advisories: "सल्ला",
        symptomChecker: "लक्षण तपासक",
        reminders: "स्मरणपत्रे",
        sos: "एसओएस",
        report: "समस्येची तक्रार करा",
    },
    kn: {
        title: "ಸಿಟಿಜನ್ ಬಡ್ಡಿ",
        advisories: "ಸಲಹೆಗಳು",
        symptomChecker: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷಕ",
        reminders: "ಜ್ಞಾಪನೆಗಳು",
        sos: "ಎಸ್‌ಒಎಸ್",
        report: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
    },
    te: {
        title: "సిటిజన్ బడ్డీ",
        advisories: "సలహాలు",
        symptomChecker: "లక్షణాల తనిఖీ",
        reminders: "రిమైండర్‌లు",
        sos: "SOS",
        report: "సమస్యను నివేదించండి",
    },
    ta: {
        title: "சிட்டிசன் படி",
        advisories: "ஆலோசனைகள்",
        symptomChecker: "அறிகுறி சரிபார்ப்பு",
        reminders: "நினைவூட்டல்கள்",
        sos: "எஸ்ஓஎஸ்",
        report: "சிக்கலைப் புகாரளிக்கவும்",
    },
    sa: {
        title: "नागरिक-बन्धुः",
        advisories: "परामर्शाः",
        symptomChecker: "लक्षणपरीक्षकः",
        reminders: "स्मारकाणि",
        sos: "एसओएस",
        report: "समस्यां सूचयन्तु",
    },
};


export function CitizenBuddyDashboard() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.title}
        </h1>
      </div>
      <Tabs defaultValue="advisories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="advisories"><Stethoscope className="mr-2" />{t.advisories}</TabsTrigger>
          <TabsTrigger value="symptom-checker" disabled><MessageSquare className="mr-2" />{t.symptomChecker}</TabsTrigger>
          <TabsTrigger value="reminders" disabled><Bell className="mr-2" />{t.reminders}</TabsTrigger>
          <TabsTrigger value="sos" disabled><AlertTriangle className="mr-2" />{t.sos}</TabsTrigger>
          <TabsTrigger value="report" disabled><History className="mr-2" />{t.report}</TabsTrigger>
        </TabsList>
        <TabsContent value="advisories" className="space-y-4">
          <PersonalizedAdvisories />
        </TabsContent>
      </Tabs>
    </>
  );
}
