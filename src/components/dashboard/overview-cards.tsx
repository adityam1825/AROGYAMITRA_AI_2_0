
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BedDouble, Droplets, CalendarDays } from "lucide-react";
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import { isSameDay, format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const content = {
  en: {
    admissions: "Admissions",
    occupancy: "Bed Occupancy",
    aqi: "AQI",
    event: "Major Event",
    admissionsChange: "+2.5% from yesterday",
    occupancyChange: "7,382 / 9,000 beds",
    aqiChange: "Unhealthy",
    eventChange: "Ganesh Chaturthi",
    ganeshChaturthi: "Ganesh Chaturthi",
    diwali: "Diwali",
    admissionsTooltip: "High admissions are likely due to respiratory issues from the Unhealthy AQI (158) and increased activity during Ganesh Chaturthi.",
  },
  hi: {
    admissions: "दाखिले",
    occupancy: "बेड की occupeेंसी",
    aqi: "एक्यूआई",
    event: "प्रमुख कार्यक्रम",
    admissionsChange: "+2.5% कल से",
    occupancyChange: "7,382 / 9,000 बेड",
    aqiChange: "अस्वास्थ्यकर",
    eventChange: "गणेश चतुर्थी",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दिवाली",
    admissionsTooltip: "अस्वास्थ्यकर एक्यूआई (158) से श्वसन संबंधी समस्याओं और गणेश चतुर्थी के दौरान बढ़ी हुई गतिविधि के कारण उच्च प्रवेश की संभावना है।",
  },
  mr: {
    admissions: "प्रवेश",
    occupancy: "बेड व्याप्ती",
    aqi: "AQI",
    event: "प्रमुख कार्यक्रम",
    admissionsChange: "+2.5% कालपासून",
    occupancyChange: "7,382 / 9,000 बेड",
    aqiChange: "अस्वास्थ्यकर",
    eventChange: "गणेश चतुर्थी",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दिवाळी",
    admissionsTooltip: "अस्वास्थ्यकर AQI (158) मुळे श्वसनाच्या समस्या आणि गणेश चतुर्थी दरम्यान वाढलेल्या हालचालींमुळे जास्त प्रवेश होण्याची शक्यता आहे.",
  },
  kn: {
    admissions: "ದಾಖಲಾತಿಗಳು",
    occupancy: "ಹಾಸಿಗೆ ಲಭ್ಯತೆ",
    aqi: "ಎಕ್ಯೂಐ",
    event: "ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮ",
    admissionsChange: "ನಿನ್ನೆಯಿಂದ +2.5%",
    occupancyChange: "7,382 / 9,000 ಹಾಸಿಗೆಗಳು",
    aqiChange: "ಅನಾರೋಗ್ಯಕರ",
    eventChange: "ಗಣೇಶ ಚತುರ್ಥಿ",
    ganeshChaturthi: "ಗಣೇಶ ಚತುರ್ಥಿ",
    diwali: "ದೀಪಾವಳಿ",
    admissionsTooltip: "ಅನಾರೋಗ್ಯಕರ AQI (158) ನಿಂದ ಉಸಿರಾಟದ ತೊಂದರೆಗಳು ಮತ್ತು ಗಣೇಶ ಚತುರ್ಥಿಯ ಸಮಯದಲ್ಲಿ ಹೆಚ್ಚಿದ ಚಟುವಟಿಕೆಯಿಂದಾಗಿ ಹೆಚ್ಚಿನ ಪ್ರವೇಶಗಳು ಉಂಟಾಗಬಹುದು.",
  },
  te: {
    admissions: "ప్రవేశాలు",
    occupancy: "పడకల లభ్యత",
    aqi: "ఎక్యూఐ",
    event: "ముఖ్య సంఘటన",
    admissionsChange: "నిన్నటి నుండి +2.5%",
    occupancyChange: "7,382 / 9,000 పడకలు",
    aqiChange: "అనారోగ్యకరం",
    eventChange: "వినాయక చవితి",
    ganeshChaturthi: "వినాయక చవితి",
    diwali: "దీపావళి",
    admissionsTooltip: "అనారోగ్యకరమైన AQI (158) నుండి శ్వాసకోశ సమస్యలు మరియు వినాయక చవితి సందర్భంగా పెరిగిన కార్యకలాపాల కారణంగా అధిక ప్రవేశాలు ఎక్కువగా ఉంటాయి.",
  },
  ta: {
    admissions: "சேர்க்கைகள்",
    occupancy: "படுக்கை வசதி",
    aqi: "ஏர் குவாலிட்டி இன்டெக்ஸ்",
    event: "முக்கிய நிகழ்வு",
    admissionsChange: "நேற்றிலிருந்து +2.5%",
    occupancyChange: "7,382 / 9,000 படுக்கைகள்",
    aqiChange: "ஆரோக்கியமற்றது",
    eventChange: "விநாயகர் சதுர்த்தி",
    ganeshChaturthi: "விநாயகர் சதுர்த்தி",
    diwali: "தீபாவளி",
    admissionsTooltip: "ஆரோக்கியமற்ற AQI (158) காரணமாக சுவாசப் பிரச்சினைகள் மற்றும் விநாயகர் சதுர்த்தியின் போது அதிகரித்த செயல்பாடு காரணமாக அதிக சேர்க்கை ஏற்பட வாய்ப்புள்ளது.",
  },
  sa: {
    admissions: "प्रवेशाः",
    occupancy: "शय्या-अधिभोगः",
    aqi: "वायु गुणवत्ता सूचकांक",
    event: "प्रमुखः उत्सवः",
    admissionsChange: "ह्यस्तनात् +२.५%",
    occupancyChange: "७,३८२ / ९,००० शय्याः",
    aqiChange: "अस्वास्थ्यकरम्",
    eventChange: "गणेश चतुर्थी",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दीपावली",
    admissionsTooltip: "अस्वास्थ्यकर-वायुगुणवत्ता-सूचकाङ्कात् (158) श्वसनसमस्यानां गणेशचतुर्थ्याः समये वर्धितक्रियाकलापानां च कारणात् अधिकप्रवेशानां सम्भावना वर्तते।",
  },
};

export function OverviewCards() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];

  const overviewData = [
    {
      title: t.admissions,
      value: "1,204",
      change: t.admissionsChange,
      icon: Users,
      tooltip: t.admissionsTooltip,
    },
    {
      title: t.occupancy,
      value: "82%",
      change: t.occupancyChange,
      icon: BedDouble,
    },
    {
      title: `${t.aqi} ${city}`,
      value: "158",
      change: t.aqiChange,
      icon: Droplets,
    },
    {
      title: t.event,
      value: t.eventChange,
      change: "Today",
      icon: CalendarDays,
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData.map((item, index) => (
           <Tooltip key={index}>
            <TooltipTrigger asChild>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">{item.change}</p>
                  </CardContent>
                </Card>
            </TooltipTrigger>
            {item.tooltip && (
              <TooltipContent>
                <p>{item.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
