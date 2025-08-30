"use client";

import { useLanguage } from "@/context/language-context";
import { PersonalizedAdvisories } from "./personalized-advisories";
import { SymptomChecker } from "./symptom-checker";
import { EmergencySOS } from "./emergency-sos";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bell, History, Ban } from 'lucide-react';

const content = {
    en: {
        title: "Citizen Buddy",
        reminders: "Reminders",
        remindersDesc: "Set medication and appointment reminders.",
        report: "Report an Issue",
        reportDesc: "Report a local health concern.",
        comingSoon: "Coming Soon",
    },
    hi: {
        title: "सिटीजन बडी",
        reminders: "रिमाइंडर",
        remindersDesc: "दवा और अपॉइंटमेंट रिमाइंडर सेट करें।",
        report: "समस्या की रिपोर्ट करें",
        reportDesc: "स्थानीय स्वास्थ्य संबंधी चिंता की रिपोर्ट करें।",
        comingSoon: "जल्द आ रहा है",
    },
    mr: {
        title: "सिटिझन बडी",
        reminders: "स्मरणपत्रे",
        remindersDesc: "औषध आणि भेटीची आठवण सेट करा.",
        report: "समस्येची तक्रार करा",
        reportDesc: "स्थानिक आरोग्य समस्येची तक्रार करा.",
        comingSoon: "लवकरच येत आहे",
    },
    kn: {
        title: "ಸಿಟಿಜನ್ ಬಡ್ಡಿ",
        reminders: "ಜ್ಞಾಪನೆಗಳು",
        remindersDesc: "ಔಷಧಿ ಮತ್ತು ನೇಮಕಾತಿ ಜ್ಞಾಪನೆಗಳನ್ನು ಹೊಂದಿಸಿ.",
        report: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
        reportDesc: "ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಕಾಳಜಿಯನ್ನು ವರದಿ ಮಾಡಿ.",
        comingSoon: "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ",
    },
    te: {
        title: "సిటిజన్ బడ్డీ",
        reminders: "రిమైండర్‌లు",
        remindersDesc: "మందులు మరియు అపాయింట్‌మెంట్ రిమైండర్‌లను సెట్ చేయండి.",
        report: "సమస్యను నివేదించండి",
        reportDesc: "స్థానిక ఆరోగ్య సమస్యను నివేదించండి.",
        comingSoon: "త్వరలో వస్తుంది",
    },
    ta: {
        title: "சிட்டிசன் படி",
        reminders: "நினைவூட்டல்கள்",
        remindersDesc: "மருந்து மற்றும் சந்திப்பு நினைவூட்டல்களை அமைக்கவும்.",
        report: "சிக்கலைப் புகாரளிக்கவும்",
        reportDesc: "உள்ளூர் சுகாதார அக்கறையைப் புகாரளிக்கவும்.",
        comingSoon: "விரைவில் வருகிறது",
    },
    sa: {
        title: "नागरिक-बन्धुः",
        reminders: "स्मारकाणि",
        remindersDesc: "औषधं नियुक्तिस्मारकाणि च स्थापयन्तु।",
        report: "समस्यां सूचयन्तु",
        reportDesc: "स्थानीयां स्वास्थ्यचिन्तां सूचयन्तु।",
        comingSoon: "शीघ्रम् आगमिष्यति",
    },
};

const PlaceholderCard = ({ title, description, icon: Icon, comingSoonText }: { title: string, description: string, icon: React.ElementType, comingSoonText: string }) => (
    <Card className="h-full border-dashed border-2 cursor-not-allowed opacity-60">
        <CardHeader>
            <div className="flex items-center gap-2">
                <Icon className="h-6 w-6 text-muted-foreground" />
                <CardTitle className="text-muted-foreground">{title}</CardTitle>
            </div>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-center h-24">
                <div className="text-center text-muted-foreground">
                    <Ban className="mx-auto h-8 w-8" />
                    <p className="mt-2 text-sm font-semibold">{comingSoonText}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

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
        <PersonalizedAdvisories />
        <div className="grid md:grid-cols-2 gap-6">
            <SymptomChecker />
            <EmergencySOS />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          <PlaceholderCard title={t.reminders} description={t.remindersDesc} icon={Bell} comingSoonText={t.comingSoon} />
          <PlaceholderCard title={t.report} description={t.reportDesc} icon={History} comingSoonText={t.comingSoon} />
        </div>
      </div>
    </>
  );
}
