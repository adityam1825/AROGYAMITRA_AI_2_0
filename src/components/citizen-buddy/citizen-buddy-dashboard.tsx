"use client";

import { useLanguage } from "@/context/language-context";
import { PersonalizedAdvisories } from "./personalized-advisories";
import { SymptomChecker } from "./symptom-checker";
import { EmergencySOS } from "./emergency-sos";
import { MedicationReminders } from "./medication-reminders";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Hospital, CalendarPlus, Ban } from 'lucide-react';

const content = {
    en: {
        title: "Citizen Buddy",
        findHospital: "Find Nearby Hospitals",
        findHospitalDesc: "Locate clinics and hospitals near you.",
        bookAppointment: "Book Appointment",
        bookAppointmentDesc: "Schedule a visit with a doctor.",
        comingSoon: "Coming Soon",
    },
    hi: {
        title: "सिटीजन बडी",
        findHospital: "आस-पास के अस्पताल खोजें",
        findHospitalDesc: "अपने आस-पास के क्लिनिक और अस्पताल खोजें।",
        bookAppointment: "अपॉइंटमेंट बुक करें",
        bookAppointmentDesc: "डॉक्टर के साथ विज़िट शेड्यूल करें।",
        comingSoon: "जल्द आ रहा है",
    },
    mr: {
        title: "सिटिझन बडी",
        findHospital: "जवळची रुग्णालये शोधा",
        findHospitalDesc: "तुमच्या जवळची क्लिनिक आणि रुग्णालये शोधा.",
        bookAppointment: "अपॉइंटमेंट बुक करा",
        bookAppointmentDesc: "डॉक्टरांसोबत भेटीची वेळ निश्चित करा.",
        comingSoon: "लवकरच येत आहे",
    },
    kn: {
        title: "ಸಿಟಿಜನ್ ಬಡ್ಡಿ",
        findHospital: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
        findHospitalDesc: "ನಿಮ್ಮ ಹತ್ತಿರದ ಕ್ಲಿನಿಕ್‌ಗಳು ಮತ್ತು ಆಸ್ಪತ್ರೆಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ.",
        bookAppointment: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಿ",
        bookAppointmentDesc: "ವೈದ್ಯರೊಂದಿಗೆ ಭೇಟಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ.",
        comingSoon: "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ",
    },
    te: {
        title: "సిటిజన్ బడ్డీ",
        findHospital: " సమీపంలోని ఆసుపత్రులను కనుగొనండి",
        findHospitalDesc: "మీకు సమీపంలోని క్లినిక్‌లు మరియు ఆసుపత్రులను గుర్తించండి.",
        bookAppointment: "అపాయింట్‌మెంట్ బుక్ చేయండి",
        bookAppointmentDesc: "డాక్టర్‌తో సందర్శనను షెడ్యూల్ చేయండి.",
        comingSoon: "త్వరలో వస్తుంది",
    },
    ta: {
        title: "சிட்டிசன் படி",
        findHospital: "அருகிலுள்ள மருத்துவமனைகளைக் கண்டறியவும்",
        findHospitalDesc: "உங்களுக்கு அருகிலுள்ள கிளினிக்குகள் மற்றும் மருத்துவமனைகளைக் கண்டறியவும்.",
        bookAppointment: "சந்திப்பை பதிவு செய்யவும்",
        bookAppointmentDesc: " மருத்துவருடன் சந்திப்பைத் திட்டமிடுங்கள்.",
        comingSoon: "விரைவில் வருகிறது",
    },
    sa: {
        title: "नागरिक-बन्धुः",
        findHospital: "समीपस्थानि चिकित्सालयान् अन्विष्यन्तु",
        findHospitalDesc: "भवतः समीपे चिकित्सालयान् अन्विष्यन्तु।",
        bookAppointment: "समयं निश्चिनोतु",
        bookAppointmentDesc: "वैद्येन सह मेलनस्य समयं निश्चिनोतु।",
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
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <SymptomChecker />
            <EmergencySOS />
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <MedicationReminders />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PlaceholderCard title={t.findHospital} description={t.findHospitalDesc} icon={Hospital} comingSoonText={t.comingSoon} />
            <PlaceholderCard title={t.bookAppointment} description={t.bookAppointmentDesc} icon={CalendarPlus} comingSoonText={t.comingSoon} />
          </div>
        </div>
      </div>
    </>
  );
}
