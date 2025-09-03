'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Siren } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const content = {
    en: {
        title: "Recent Alerts",
        description: "Automated notifications and critical updates.",
        alerts: [
          {
            name: "Dr. Anya Sharma",
            role: "Cardiology",
            message: "Staffing alert: Cardiology dept requires 2 additional nurses for the night shift.",
            time: "5m ago",
          },
          {
            name: "System",
            role: "Supply Chain",
            message: "Low stock warning: Oxygen cylinders below 20% capacity at Sion Hospital.",
            time: "30m ago",
          },
          {
            name: "Mumbai Health Dept",
            role: "Public Advisory",
            message: "Air quality alert issued for the next 48 hours. Advise vulnerable patients.",
            time: "1h ago",
          },
        ]
    },
    hi: {
        title: "हालिया अलर्ट",
        description: "स्वचालित सूचनाएं और महत्वपूर्ण अपडेट।",
        alerts: [
          {
            name: "डॉ. अनन्या शर्मा",
            role: "कार्डियोलॉजी",
            message: "स्टाफिंग अलर्ट: कार्डियोलॉजी विभाग को रात की पाली के लिए 2 अतिरिक्त नर्सों की आवश्यकता है।",
            time: "5 मिनट पहले",
          },
          {
            name: "सिस्टम",
            role: "आपूर्ति श्रृंखला",
            message: "कम स्टॉक की चेतावनी: सायन अस्पताल में ऑक्सीजन सिलेंडर 20% क्षमता से नीचे।",
            time: "30 मिनट पहले",
          },
          {
            name: "मुंबई स्वास्थ्य विभाग",
            role: "सार्वजनिक सलाह",
            message: "अगले 48 घंटों के लिए वायु गुणवत्ता अलर्ट जारी किया गया। कमजोर रोगियों को सलाह दें।",
            time: "1 घंटा पहले",
          },
        ]
    },
    mr: {
        title: "अलीकडील सूचना",
        description: "स्वयंचलित सूचना आणि गंभीर अद्यतने.",
        alerts: [
          {
            name: "डॉ. अन्या शर्मा",
            role: "कार्डिओलॉजी",
            message: "कर्मचारी सूचना: कार्डिओलॉजी विभागाला रात्रीच्या पाळीसाठी २ अतिरिक्त परिचारिकांची आवश्यकता आहे.",
            time: "5 मिनिटांपूर्वी",
          },
          {
            name: "प्रणाली",
            role: "पुरवठा साखळी",
            message: "कमी स्टॉकचा इशारा: सायन रुग्णालयात ऑक्सिजन सिलिंडर २०% क्षमतेपेक्षा कमी.",
            time: "30 मिनिटांपूर्वी",
          },
          {
            name: "मुंबई आरोग्य विभाग",
            role: "सार्वजनिक सल्ला",
            message: "पुढील ४८ तासांसाठी हवेच्या गुणवत्तेचा इशारा जारी. असुरक्षित रुग्णांना सल्ला द्या.",
            time: "१ तासापूर्वी",
          },
        ]
    },
    kn: {
        title: "ಇತ್ತೀಚಿನ ಎಚ್ಚರಿಕೆಗಳು",
        description: "ಸ್ವಯಂಚಾಲಿತ ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ನಿರ್ಣಾಯಕ ನವೀಕರಣಗಳು.",
        alerts: [
            {
                name: "ಡಾ. ಅನ್ಯಾ ಶರ್ಮಾ",
                role: "ಹೃದ್ರೋಗ ಶಾಸ್ತ್ರ",
                message: "ಸಿಬ್ಬಂದಿ ಎಚ್ಚರಿಕೆ: ಹೃದ್ರೋಗ ವಿಭಾಗಕ್ಕೆ ರಾತ್ರಿ ಪಾಳಿಗಾಗಿ 2 ಹೆಚ್ಚುವರಿ ದಾದಿಯರ ಅಗತ್ಯವಿದೆ.",
                time: "5ನಿಮಿಷಗಳ ಹಿಂದೆ",
            },
            {
                name: "ಸಿಸ್ಟಮ್",
                role: "ಸರಬರಾಜು ಸರಣಿ",
                message: "ಕಡಿಮೆ ಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆ: ಸಿಯಾನ್ ಆಸ್ಪತ್ರೆಯಲ್ಲಿ ಆಮ್ಲಜನಕ ಸಿಲಿಂಡರ್‌ಗಳು 20% ಸಾಮರ್ಥ್ಯಕ್ಕಿಂತ ಕಡಿಮೆ.",
                time: "30ನಿಮಿಷಗಳ ಹಿಂದೆ",
            },
            {
                name: "ಮುಂಬೈ ಆರೋಗ್ಯ ಇಲಾಖೆ",
                role: "ಸಾರ್ವಜನಿಕ ಸಲಹೆ",
                message: "ಮುಂದಿನ 48 ಗಂಟೆಗಳ ಕಾಲ ವಾಯು ಗುಣಮಟ್ಟದ ಎಚ್ಚರಿಕೆ ನೀಡಲಾಗಿದೆ. ದುರ್ಬಲ ರೋಗಿಗಳಿಗೆ ಸಲಹೆ ನೀಡಿ.",
                time: "1ಗಂಟೆ ಹಿಂದೆ",
            },
        ]
    },
    te: {
        title: "ఇటీవలి హెచ్చరికలు",
        description: "స్వయంచాలక నోటిఫికేషన్‌లు మరియు క్లిష్టమైన నవీకరణలు.",
        alerts: [
          {
            name: "డా. అన్య శర్మ",
            role: "కార్డియాలజీ",
            message: "సిబ్బంది హెచ్చరిక: కార్డియాలజీ విభాగానికి రాత్రి షిఫ్ట్ కోసం 2 అదనపు నర్సులు అవసరం.",
            time: "5ని క్రితం",
          },
          {
            name: "సిస్టమ్",
            role: "సరఫరా గొలుసు",
            message: "తక్కువ స్టాక్ హెచ్చరిక: సియోన్ ఆసుపత్రిలో ఆక్సిజన్ సిలిండర్లు 20% సామర్థ్యం కంటే తక్కువ.",
            time: "30ని క్రితం",
          },
          {
            name: "ముంబై ఆరోగ్య శాఖ",
            role: "ప్రజా సలహా",
            message: "తదుపరి 48 గంటలపాటు వాయు నాణ్యత హెచ్చరిక జారీ చేయబడింది. బలహీనమైన రోగులకు సలహా ఇవ్వండి.",
            time: "1గంట క్రితం",
          },
        ]
    },
    ta: {
        title: "சமீபத்திய எச்சரிக்கைகள்",
        description: "தானியங்கு அறிவிப்புகள் மற்றும் முக்கியமான புதுப்பிப்புகள்.",
        alerts: [
          {
            name: "டாக்டர் அன்யா சர்மா",
            role: "இதயவியல்",
            message: "பணியாளர் எச்சரிக்கை: இதயவியல் துறைக்கு இரவுப் பணிக்கு 2 கூடுதல் செவிலியர்கள் தேவை.",
            time: "5நிமிடங்களுக்கு முன்பு",
          },
          {
            name: "கணினி",
            role: "விநியோகச் சங்கிலி",
            message: "குறைந்த இருப்பு எச்சரிக்கை: சியான் மருத்துவமனையில் ஆக்சிஜன் சிலிண்டர்கள் 20% கொள்ளளவுக்கும் குறைவாக உள்ளது.",
            time: "30நிமிடங்களுக்கு முன்பு",
          },
          {
            name: "மும்பை சுகாதாரத் துறை",
            role: "பொது ஆலோசனை",
            message: "அடுத்த 48 மணி நேரத்திற்கு காற்றுத் தர எச்சரிக்கை வெளியிடப்பட்டுள்ளது. பாதிக்கப்படக்கூடிய நோயாளிகளுக்கு அறிவுரை வழங்கவும்.",
            time: "1மணி நேரத்திற்கு முன்பு",
          },
        ]
    },
    san: {
        title: "नवीनाः सूचनाः",
        description: "स्वचालिताः सूचनाः तथा च महत्त्वपूर्णाः अद्यतनाः।",
        alerts: [
          {
            name: "वैद्य। अन्या शर्मा",
            role: "हृద్రोगविज्ञानम्",
            message: "कर्मचारि-सूचना: हृద్రोगविभागाय रात्रिपाल्यार्थं द्वयोः अतिरिक्तयोः परिचारिकयोः आवश्यकता अस्ति।",
            time: "५ निमेषाः पूर्वम्",
          },
          {
            name: "तन्त्रम्",
            role: "आपूर्तिशृङ्खला",
            message: "न्यून-स्कन्ध-चेतावनी: सियन-चिकित्सालये प्राणवायु-सिलिण्डराणि २०% क्षमतयाः न्यूनानि सन्ति।",
            time: "३० निमेषाः पूर्वम्",
          },
          {
            name: "मुम्बई-स्वास्थ्यविभागः",
            role: "सार्वजनिकपरामर्शः",
            message: "आगामि ४८ होरापर्यन्तं वायुगुणवत्तासूचना प्रसारिता। दुर्बलेभ्यः रोगिभ्यः परामर्शं ददतु।",
            time: "१ होरा पूर्वम्",
          },
        ]
    }
};

export function RecentAlerts() {
  const { language } = useLanguage();
  const t = content[language];
    
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Siren className="h-6 w-6 text-destructive" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {t.alerts.map((alert, index) => (
          <div key={index} className="flex items-start space-x-4">
            <Avatar className="h-9 w-9">
                <AvatarFallback>{alert.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{alert.name}</p>
                <p className="text-sm text-muted-foreground">{alert.time}</p>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
