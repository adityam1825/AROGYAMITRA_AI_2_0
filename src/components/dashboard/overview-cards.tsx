
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BedDouble, Droplets, CalendarDays } from "lucide-react";
import { useLanguage } from '@/context/language-context';
import { useCity, type City } from '@/context/city-context';
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
    admissionsChange: (change: number) => `${change > 0 ? '+' : ''}${change}% from yesterday`,
    occupancyChange: (occupied: number, total: number) => `${occupied.toLocaleString()} / ${total.toLocaleString()} beds`,
    aqiChange: "Unhealthy",
    ganeshChaturthi: "Ganesh Chaturthi",
    diwali: "Diwali",
    durgaPuja: "Durga Puja",
    admissionsTooltip: (city: string, event: string) => `High admissions in ${city} are likely due to respiratory issues from the Unhealthy AQI (158) and increased activity during ${event}.`,
  },
  hi: {
    admissions: "दाखिले",
    occupancy: "बेड की occupeेंसी",
    aqi: "एक्यूआई",
    event: "प्रमुख कार्यक्रम",
    admissionsChange: (change: number) => `कल से ${change > 0 ? '+' : ''}${change}%`,
    occupancyChange: (occupied: number, total: number) => `${occupied.toLocaleString()} / ${total.toLocaleString()} बेड`,
    aqiChange: "अस्वास्थ्यकर",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दिवाली",
    durgaPuja: "दुर्गा पूजा",
    admissionsTooltip: (city: string, event: string) => `${city} में अस्वास्थ्यकर एक्यूआई (158) से श्वसन संबंधी समस्याओं और ${event} के दौरान बढ़ी हुई गतिविधि के कारण उच्च प्रवेश की संभावना है।`,
  },
  mr: {
    admissions: "प्रवेश",
    occupancy: "बेड व्याप्ती",
    aqi: "AQI",
    event: "प्रमुख कार्यक्रम",
    admissionsChange: (change: number) => `कालपासून ${change > 0 ? '+' : ''}${change}%`,
    occupancyChange: (occupied: number, total: number) => `${occupied.toLocaleString()} / ${total.toLocaleString()} बेड`,
    aqiChange: "अस्वास्थ्यकर",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दिवाळी",
    durgaPuja: "दुर्गा पूजा",
    admissionsTooltip: (city: string, event: string) => `${city} मध्ये अस्वास्थ्यकर AQI (158) मुळे श्वसनाच्या समस्या आणि ${event} दरम्यान वाढलेल्या हालचालींमुळे जास्त प्रवेश होण्याची शक्यता आहे.`,
  },
  kn: {
    admissions: "ದಾಖಲಾತಿಗಳು",
    occupancy: "ಹಾಸಿಗೆ ಲಭ್ಯತೆ",
    aqi: "ಎಕ್ಯೂಐ",
    event: "ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮ",
    admissionsChange: (change: number) => `ನಿನ್ನೆಯಿಂದ ${change > 0 ? '+' : ''}${change}%`,
    occupancyChange: (occupied: number, total: number) => `${occupied.toLocaleString()} / ${total.toLocaleString()} ಹಾಸಿಗೆಗಳು`,
    aqiChange: "ಅನಾರೋಗ್ಯಕರ",
    ganeshChaturthi: "ಗಣೇಶ ಚತುರ್ಥಿ",
    diwali: "ದೀಪಾವಳಿ",
    durgaPuja: "ದುರ್ಗಾ ಪೂಜೆ",
    admissionsTooltip: (city: string, event: string) => `${city} ನಲ್ಲಿ ಅನಾರೋಗ್ಯಕರ AQI (158) ನಿಂದ ಉಸಿರಾಟದ ತೊಂದರೆಗಳು ಮತ್ತು ${event} ಸಮಯದಲ್ಲಿ ಹೆಚ್ಚಿದ ಚಟುವಟಿಕೆಯಿಂದಾಗಿ ಹೆಚ್ಚಿನ ಪ್ರವೇಶಗಳು ಉಂಟಾಗಬಹುದು.`,
  },
  te: {
    admissions: "ప్రవేశాలు",
    occupancy: "పడకల లభ్యత",
    aqi: "ఎక్యూఐ",
    event: "ముఖ్య సంఘటన",
    admissionsChange: (change: number) => `నిన్నటి నుండి ${change > 0 ? '+' : ''}${change}%`,
    occupancyChange: (occupied: number, total: number) => `${occupied.toLocaleString()} / ${total.toLocaleString()} పడకలు`,
    aqiChange: "అనారోగ్యకరం",
    ganeshChaturthi: "వినాయక చవితి",
    diwali: "దీపావళి",
    durgaPuja: "దుర్గా పూజ",
    admissionsTooltip: (city: string, event: string) => `${city} లో అనారోగ్యకరమైన AQI (158) నుండి శ్వాసకోశ సమస్యలు మరియు ${event} సందర్భంగా పెరిగిన కార్యలాపాల కారణంగా అధిక ప్రవేశాలు ఎక్కువగా ఉంటాయి.`,
  },
  ta: {
    admissions: "சேர்க்கைகள்",
    occupancy: "படுக்கை வசதி",
    aqi: "ஏர் குவாலிட்டி இன்டெக்ஸ்",
    event: "முக்கிய நிகழ்வு",
    admissionsChange: (change: number) => `நேற்றிலிருந்து ${change > 0 ? '+' : ''}${change}%`,
    occupancyChange: (occupied: number, total: number) => `${occupied.toLocaleString()} / ${total.toLocaleString()} படுக்கைகள்`,
    aqiChange: "ஆரோக்கியமற்றது",
    ganeshChaturthi: "விநாயகர் சதுர்த்தி",
    diwali: "தீபாவளி",
    durgaPuja: "துர்கா பூஜை",
    admissionsTooltip: (city: string, event: string) => `${city} இல் ஆரோக்கியமற்ற AQI (158) காரணமாக சுவாசப் பிரச்சினைகள் மற்றும் ${event} இன் போது அதிகரித்த செயல்பாடு காரணமாக அதிக சேர்க்கை ஏற்பட வாய்ப்புள்ளது.`,
  },
  san: {
    admissions: "प्रवेशाः",
    occupancy: "शय्या-अधिभोगः",
    aqi: "वायु गुणवत्ता सूचकांक",
    event: "प्रमुखः उत्सवः",
    admissionsChange: (change: number) => `ह्यस्तनात् ${change > 0 ? '+' : ''}${change}%`,
    occupancyChange: (occupied: number, total: number) => `${occupied.toLocaleString()} / ${total.toLocaleString()} शय्याः`,
    aqiChange: "अस्वास्थ्यकरम्",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दीपावली",
    durgaPuja: "दुर्गा पूजा",
    admissionsTooltip: (city: string, event: string) => `${city} नगरे अस्वास्थ्यकर-वायुगुणवत्ता-सूचकाङ्कात् (158) श्वसनसमस्यानां ${event} इत्यस्य समये वर्धितक्रियाकलापानां च कारणात् अधिकप्रवेशानां सम्भावना वर्तते।`,
  },
};

const cityData: Record<City, { admissions: number; change: number; occupied: number; total: number; aqi: number; event: string; eventTime: string; }> = {
    'Mumbai': { admissions: 1204, change: 2.5, occupied: 7382, total: 9000, aqi: 158, event: 'ganeshChaturthi', eventTime: "Today" },
    'Pune': { admissions: 950, change: 1.8, occupied: 6200, total: 8000, aqi: 140, event: 'ganeshChaturthi', eventTime: "Today" },
    'Thane': { admissions: 800, change: 3.1, occupied: 4500, total: 5500, aqi: 165, event: 'ganeshChaturthi', eventTime: "Today" },
    'Delhi': { admissions: 1500, change: 5.2, occupied: 8500, total: 10000, aqi: 250, event: 'diwali', eventTime: "In 2 weeks" },
    'Kolkata': { admissions: 1100, change: 4.5, occupied: 7000, total: 8500, aqi: 190, event: 'durgaPuja', eventTime: "Next week" },
    'Bangalore': { admissions: 700, change: -1.0, occupied: 5000, total: 7000, aqi: 90, event: 'diwali', eventTime: "In 2 weeks" },
    'Chennai': { admissions: 650, change: 0.5, occupied: 4500, total: 6000, aqi: 110, event: 'diwali', eventTime: "In 2 weeks" },
    'Hyderabad': { admissions: 850, change: 2.0, occupied: 5500, total: 7500, aqi: 120, event: 'diwali', eventTime: "In 2 weeks" },
    'Ahmedabad': { admissions: 900, change: 3.0, occupied: 6000, total: 7000, aqi: 180, event: 'diwali', eventTime: "In 2 weeks" },
    'Jaipur': { admissions: 500, change: 1.0, occupied: 3500, total: 5000, aqi: 160, event: 'diwali', eventTime: "In 2 weeks" },
    'Surat': { admissions: 750, change: 2.5, occupied: 4800, total: 6000, aqi: 170, event: 'diwali', eventTime: "In 2 weeks" },
    'Navi Mumbai': { admissions: 600, change: 1.5, occupied: 3800, total: 5000, aqi: 150, event: 'ganeshChaturthi', eventTime: "Today" },
    'Kalyan': { admissions: 450, change: 2.8, occupied: 2800, total: 4000, aqi: 170, event: 'ganeshChaturthi', eventTime: "Today" },
    'Vasai-Virar': { admissions: 550, change: 3.5, occupied: 3200, total: 4500, aqi: 175, event: 'ganeshChaturthi', eventTime: "Today" },
    'Panvel': { admissions: 300, change: 1.2, occupied: 2000, total: 3000, aqi: 145, event: 'ganeshChaturthi', eventTime: "Today" },
};


export function OverviewCards() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];

  const data = cityData[city] || cityData['Mumbai'];
  const eventName = t[data.event as keyof typeof t] || data.event;

  const overviewData = [
    {
      title: t.admissions,
      value: data.admissions.toLocaleString(),
      change: t.admissionsChange(data.change),
      icon: Users,
      tooltip: t.admissionsTooltip(city, eventName),
    },
    {
      title: t.occupancy,
      value: `${Math.round((data.occupied / data.total) * 100)}%`,
      change: t.occupancyChange(data.occupied, data.total),
      icon: BedDouble,
    },
    {
      title: `${t.aqi} ${city}`,
      value: data.aqi.toString(),
      change: t.aqiChange,
      icon: Droplets,
    },
    {
      title: t.event,
      value: eventName,
      change: data.eventTime,
      icon: CalendarDays,
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData.map((item, index) => (
           <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
                <Card className="interactive-card">
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
                <p className="max-w-xs">{item.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
