
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Database, Siren, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: "How ArogyaMitra Thinks",
    description: "Understanding the AI's decision-making process.",
    dataSources: "Data Sources",
    predictionModel: "Prediction Model",
    alertTriggers: "Alert Triggers",
    source1: "Real-time hospital admissions",
    source2: "Live Air Quality Index (AQI)",
    source3: "Public event & festival calendars",
    modelDesc: "The AI uses a combination of historical data and real-time inputs to forecast patient volume for the next 7 days.",
    trigger1: "Predicted admissions > 85% of hospital capacity",
    trigger2: "AQI level rises to 'Severe' (>250)",
    trigger3: "High-density public event starts within 48 hours",
  },
  hi: {
    title: "आरोग्यमित्र कैसे सोचता है",
    description: "एआई की निर्णय लेने की प्रक्रिया को समझना।",
    dataSources: "डेटा स्रोत",
    predictionModel: "भविष्यवाणी मॉडल",
    alertTriggers: "अलर्ट ट्रिगर",
    source1: "वास्तविक समय में अस्पताल में प्रवेश",
    source2: "लाइव वायु गुणवत्ता सूचकांक (एक्यूआई)",
    source3: "सार्वजनिक कार्यक्रम और त्योहार कैलेंडर",
    modelDesc: "एआई अगले 7 दिनों के लिए रोगी की मात्रा का अनुमान लगाने के लिए ऐतिहासिक डेटा और वास्तविक समय के इनपुट के संयोजन का उपयोग करता है।",
    trigger1: "अनुमानित प्रवेश > अस्पताल की क्षमता का 85%",
    trigger2: "एक्यूआई स्तर 'गंभीर' (>250) तक बढ़ जाता है",
    trigger3: "उच्च घनत्व वाला सार्वजनिक कार्यक्रम 48 घंटों के भीतर शुरू होता है",
  },
  mr: {
    title: "आरोग्यमित्र कसे विचार करते",
    description: "AI च्या निर्णय प्रक्रियेला समजून घेणे.",
    dataSources: "डेटा स्रोत",
    predictionModel: "अंदाज मॉडेल",
    alertTriggers: "अलर्ट ट्रिगर्स",
    source1: "रिअल-टाइम हॉस्पिटल प्रवेश",
    source2: "थेट हवा गुणवत्ता निर्देशांक (AQI)",
    source3: "सार्वजनिक कार्यक्रम आणि उत्सव कॅलेंडर",
    modelDesc: "पुढील ७ दिवसांसाठी रुग्णांच्या संख्येचा अंदाज लावण्यासाठी AI ऐतिहासिक डेटा आणि रिअल-टाइम इनपुटचे संयोजन वापरते.",
    trigger1: "अपेक्षित प्रवेश > हॉस्पिटल क्षमतेच्या ८५%",
    trigger2: "AQI पातळी 'गंभीर' (>250) पर्यंत वाढते",
    trigger3: "उच्च-घनतेचा सार्वजनिक कार्यक्रम ४८ तासांच्या आत सुरू होतो",
  },
  kn: {
    title: "ಆರೋಗ್ಯಮಿತ್ರ ಹೇಗೆ ಯೋಚಿಸುತ್ತದೆ",
    description: "ಎಐನ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು.",
    dataSources: "ಡೇಟಾ ಮೂಲಗಳು",
    predictionModel: "ಭವಿಷ್ಯವಾಣಿ ಮಾದರಿ",
    alertTriggers: "ಎಚ್ಚರಿಕೆ ಪ್ರಚೋದಕಗಳು",
    source1: "ನೈಜ-ಸಮಯದ ಆಸ್ಪತ್ರೆ ದಾಖಲಾತಿಗಳು",
    source2: "ಲೈವ್ ವಾಯು ಗುಣಮಟ್ಟ ಸೂಚ್ಯಂಕ (AQI)",
    source3: "ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಹಬ್ಬದ ಕ್ಯಾಲೆಂಡರ್‌ಗಳು",
    modelDesc: "ಮುಂದಿನ 7 ದಿನಗಳವರೆಗೆ ರೋಗಿಗಳ ಪ್ರಮಾಣವನ್ನು ಮುನ್ಸೂಚಿಸಲು ಎಐ ಐತಿಹಾಸಿಕ ಡೇಟಾ ಮತ್ತು ನೈಜ-ಸಮಯದ ಇನ್‌ಪುಟ್‌ಗಳ ಸಂಯೋಜನೆಯನ್ನು ಬಳಸುತ್ತದೆ.",
    trigger1: "ಊಹಿಸಲಾದ ದಾಖಲಾತಿಗಳು > ಆಸ್ಪತ್ರೆಯ ಸಾಮರ್ಥ್ಯದ 85%",
    trigger2: "AQI ಮಟ್ಟವು 'ತೀವ್ರ' (>250) ಕ್ಕೆ ಏರುತ್ತದೆ",
    trigger3: "ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆಯ ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮವು 48 ಗಂಟೆಗಳಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ",
  },
  te: {
    title: "ఆరోగ్యమిత్ర ఎలా ఆలోచిస్తుంది",
    description: "AI యొక్క నిర్ణయం తీసుకునే ప్రక్రియను అర్థం చేసుకోవడం.",
    dataSources: "డేటా మూలాలు",
    predictionModel: "అంచనా నమూనా",
    alertTriggers: "హెచ్చరిక ట్రిగ్గర్లు",
    source1: "నిజ-సమయ ఆసుపత్రి ప్రవేశాలు",
    source2: "లైవ్ ఎయిర్ క్వాలిటీ ఇండెక్స్ (AQI)",
    source3: "ప్రజా కార్యక్రమం & పండుగ క్యాలెండర్లు",
    modelDesc: "AI రాబోయే 7 రోజులకు రోగి పరిమాణాన్ని అంచనా వేయడానికి చారిత్రక డేటా మరియు నిజ-సమయ ఇన్‌పుట్‌ల కలయికను ఉపయోగిస్తుంది.",
    trigger1: "ఊహించిన ప్రవేశాలు > ఆసుపత్రి సామర్థ్యంలో 85%",
    trigger2: "AQI స్థాయి 'తీవ్రమైన' (>250)కి పెరుగుతుంది",
    trigger3: "అధిక-సాంద్రత ప్రజా కార్యక్రమం 48 గంటలలో ప్రారంభమవుతుంది",
  },
  ta: {
    title: "ஆரோக்கியமித்ரா எப்படி சிந்திக்கிறது",
    description: "AI-யின் முடிவெடுக்கும் செயல்முறையைப் புரிந்துகொள்வது.",
    dataSources: "தரவு ஆதாரங்கள்",
    predictionModel: "கணிப்பு மாதிரி",
    alertTriggers: "எச்சரிக்கை தூண்டுதல்கள்",
    source1: "நிகழ்நேர மருத்துவமனை சேர்க்கைகள்",
    source2: "நேரடி காற்று தரக் குறியீடு (AQI)",
    source3: "பொது நிகழ்வு மற்றும் திருவிழா நாட்காட்டிகள்",
    modelDesc: "அடுத்த 7 நாட்களுக்கு நோயாளி அளவைக் கணிக்க AI வரலாற்றுத் தரவு மற்றும் நிகழ்நேர உள்ளீடுகளின் கலவையைப் பயன்படுத்துகிறது.",
    trigger1: "கணிக்கப்பட்ட சேர்க்கைகள் > மருத்துவமனைத் திறனில் 85%",
    trigger2: "AQI நிலை 'கடுமையான' (>250) ஆக உயர்கிறது",
    trigger3: "அதிக அடர்த்தி கொண்ட பொது நிகழ்வு 48 மணி நேரத்திற்குள் தொடங்குகிறது",
  },
  sa: {
    title: "आरोग्यमित्रः कथं चिन्तयति",
    description: "एआई-निर्णयप्रक्रियायाः अवगमनम्।",
    dataSources: "दत्तांशस्रोतांसि",
    predictionModel: "पूर्वानुमानप्रतिरूपम्",
    alertTriggers: "सूचनाप्रवर्तकाः",
    source1: "वास्तविककालीनाः चिकित्सालयप्रवेशाः",
    source2: "प्रत्यक्षः वायुगुणवत्तासूचकाङ्कः (AQI)",
    source3: "सार्वजनिककार्यक्रमाः उत्सवपञ्चाङ्गानि च",
    modelDesc: "आगामिनां ७ दिवसानां कृते रोगीणां परिमाणस्य पूर्वानुमानार्थं एआई ऐतिहासिकदत्तांशस्य वास्तविककालीन-निवेशानां च संयोजनं प्रयुङ्क्ते।",
    trigger1: "पूर्वानुमानिताः प्रवेशाः > चिकित्सालयस्य क्षमतायाः ८५%",
    trigger2: "वायुगुणवत्तास्तरः 'गम्भीरः' (>250) वर्धते",
    trigger3: "उच्चघनत्वयुक्तः सार्वजनिककार्यक्रमः ४८ होराभ्यन्तरे आरभ्यते",
  },
};

export function HowItWorks() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-muted rounded-full">
                    <Database className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold">{t.dataSources}</p>
            </div>
            <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />
             <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-muted rounded-full">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold">{t.predictionModel}</p>
            </div>
             <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />
             <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-muted rounded-full">
                    <Siren className="h-8 w-8 text-destructive" />
                </div>
                <p className="font-semibold">{t.alertTriggers}</p>
            </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-md">{t.dataSources}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p>• {t.source1}</p>
                    <p>• {t.source2}</p>
                    <p>• {t.source3}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-md">{t.predictionModel}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <p>{t.modelDesc}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-md">{t.alertTriggers}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p>• {t.trigger1}</p>
                    <p>• {t.trigger2}</p>
                    <p>• {t.trigger3}</p>
                </CardContent>
            </Card>
        </div>
      </CardContent>
    </Card>
  );
}
