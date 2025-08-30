"use client";

import { useLanguage } from "@/context/language-context";
import { PersonalizedAdvisories } from "./personalized-advisories";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Stethoscope, Bell, AlertTriangle, MessageSquare, History, Ban } from 'lucide-react';

const content = {
    en: {
        title: "Citizen Buddy",
        advisories: "Personalized Health Advisories",
        advisoriesDesc: "AI-powered health tips based on real-time conditions in your city.",
        symptomChecker: "Symptom Checker",
        symptomCheckerDesc: "Get basic guidance on your symptoms.",
        reminders: "Reminders",
        remindersDesc: "Set medication and appointment reminders.",
        sos: "Emergency SOS",
        sosDesc: "Alert authorities in an emergency.",
        report: "Report an Issue",
        reportDesc: "Report a local health concern.",
        comingSoon: "Coming Soon",
    },
    hi: {
        title: "सिटीजन बडी",
        advisories: "व्यक्तिगत स्वास्थ्य सलाह",
        advisoriesDesc: "आपके शहर की वास्तविक समय की स्थितियों के आधार पर एआई-संचालित स्वास्थ्य युक्तियाँ।",
        symptomChecker: "लक्षण परीक्षक",
        symptomCheckerDesc: "अपने लक्षणों पर बुनियादी मार्गदर्शन प्राप्त करें।",
        reminders: "रिमाइंडर",
        remindersDesc: "दवा और अपॉइंटमेंट रिमाइंडर सेट करें।",
        sos: "आपातकालीन एसओएस",
        sosDesc: "आपात स्थिति में अधिकारियों को सचेत करें।",
        report: "समस्या की रिपोर्ट करें",
        reportDesc: "स्थानीय स्वास्थ्य संबंधी चिंता की रिपोर्ट करें।",
        comingSoon: "जल्द आ रहा है",
    },
    mr: {
        title: "सिटिझन बडी",
        advisories: "वैयक्तिकृत आरोग्य सल्ला",
        advisoriesDesc: "तुमच्या शहरातील वास्तविक परिस्थितीवर आधारित AI-शक्तीवर चालणाऱ्या आरोग्य टिप्स.",
        symptomChecker: "लक्षण तपासक",
        symptomCheckerDesc: "तुमच्या लक्षणांवर मूलभूत मार्गदर्शन मिळवा.",
        reminders: "स्मरणपत्रे",
        remindersDesc: "औषध आणि भेटीची आठवण सेट करा.",
        sos: "आपत्कालीन एसओएस",
        sosDesc: "आणीबाणीच्या परिस्थितीत अधिकाऱ्यांना सतर्क करा.",
        report: "समस्येची तक्रार करा",
        reportDesc: "स्थानिक आरोग्य समस्येची तक्रार करा.",
        comingSoon: "लवकरच येत आहे",
    },
    kn: {
        title: "ಸಿಟಿಜನ್ ಬಡ್ಡಿ",
        advisories: "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
        advisoriesDesc: "ನಿಮ್ಮ ನಗರದ ನೈಜ-ಸಮಯದ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ AI-ಚಾಲಿತ ಆರೋಗ್ಯ ಸಲಹೆಗಳು.",
        symptomChecker: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷಕ",
        symptomCheckerDesc: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳ ಬಗ್ಗೆ ಮೂಲಭೂತ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
        reminders: "ಜ್ಞಾಪನೆಗಳು",
        remindersDesc: "ಔಷಧಿ ಮತ್ತು ನೇಮಕಾತಿ ಜ್ಞಾಪನೆಗಳನ್ನು ಹೊಂದಿಸಿ.",
        sos: "ತುರ್ತು ಎಸ್‌ಒಎಸ್",
        sosDesc: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಅಧಿಕಾರಿಗಳನ್ನು ಎಚ್ಚರಿಸಿ.",
        report: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
        reportDesc: "ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಕಾಳಜಿಯನ್ನು ವರದಿ ಮಾಡಿ.",
        comingSoon: "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ",
    },
    te: {
        title: "సిటిజన్ బడ్డీ",
        advisories: "వ్యక్తిగతీకరించిన ఆరోగ్య సలహాలు",
        advisoriesDesc: "మీ నగరంలోని వాస్తవ-సమయ పరిస్థితుల ఆధారంగా AI-ఆధారిత ఆరోగ్య చిట్కాలు.",
        symptomChecker: "లక్షణాల తనిఖీ",
        symptomCheckerDesc: "మీ లక్షణాలపై ప్రాథమిక మార్గదర్శకత్వం పొందండి.",
        reminders: "రిమైండర్‌లు",
        remindersDesc: "మందులు మరియు అపాయింట్‌మెంట్ రిమైండర్‌లను సెట్ చేయండి.",
        sos: "అత్యవసర SOS",
        sosDesc: "అత్యవసర పరిస్థితిలో అధికారులను అప్రమత్తం చేయండి.",
        report: "సమస్యను నివేదించండి",
        reportDesc: "స్థానిక ఆరోగ్య సమస్యను నివేదించండి.",
        comingSoon: "త్వరలో వస్తుంది",
    },
    ta: {
        title: "சிட்டிசன் படி",
        advisories: "தனிப்பயனாக்கப்பட்ட சுகாதார ஆலோசனைகள்",
        advisoriesDesc: "உங்கள் நகரத்தில் நிகழ்நேர நிலைமைகளின் அடிப்படையில் AI-இயங்கும் சுகாதார குறிப்புகள்.",
        symptomChecker: "அறிகுறி சரிபார்ப்பு",
        symptomCheckerDesc: "உங்கள் அறிகுறிகள் குறித்த அடிப்படை வழிகாட்டுதலைப் பெறுங்கள்.",
        reminders: "நினைவூட்டல்கள்",
        remindersDesc: "மருந்து மற்றும் சந்திப்பு நினைவூட்டல்களை அமைக்கவும்.",
        sos: "அவசர எஸ்ஓஎஸ்",
        sosDesc: "அவசரகாலத்தில் அதிகாரிகளை எச்சரிக்கவும்.",
        report: "சிக்கலைப் புகாரளிக்கவும்",
        reportDesc: "உள்ளூர் சுகாதார அக்கறையைப் புகாரளிக்கவும்.",
        comingSoon: "விரைவில் வருகிறது",
    },
    sa: {
        title: "नागरिक-बन्धुः",
        advisories: "वैयक्तिकीकृताः स्वास्थ्यपरामर्शाः",
        advisoriesDesc: "भवतः नगरे वास्तविकसमयस्थितीनां आधारेण AI-चालिताः स्वास्थ्यसूचनाः।",
        symptomChecker: "लक्षणपरीक्षकः",
        symptomCheckerDesc: "स्वस्य लक्षणेषु आधारभूतं मार्गदर्शनं प्राप्नुवन्तु।",
        reminders: "स्मारकाणि",
        remindersDesc: "औषधं नियुक्तिस्मारकाणि च स्थापयन्तु।",
        sos: "आपत्कालीनः एसओएस",
        sosDesc: "आपत्काले अधिकारिणः सूचयन्तु।",
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlaceholderCard title={t.symptomChecker} description={t.symptomCheckerDesc} icon={MessageSquare} comingSoonText={t.comingSoon} />
          <PlaceholderCard title={t.reminders} description={t.remindersDesc} icon={Bell} comingSoonText={t.comingSoon} />
          <PlaceholderCard title={t.sos} description={t.sosDesc} icon={AlertTriangle} comingSoonText={t.comingSoon} />
          <PlaceholderCard title={t.report} description={t.reportDesc} icon={History} comingSoonText={t.comingSoon} />
        </div>
      </div>
    </>
  );
}
