'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BedDouble, Droplets, CalendarDays } from "lucide-react";
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';

const content = {
  en: {
    admissions: "Total Admissions (24h)",
    occupancy: "Bed Occupancy",
    aqi: "AQI",
    event: "Upcoming Major Event",
    admissionsChange: "+15.2% from yesterday",
    occupancyChange: "7,382 / 9,000 beds",
    aqiChange: "Unhealthy",
    eventChange: "in 12 days",
    eventValue: "Ganesh Chaturthi",
  },
  hi: {
    admissions: "कुल दाखिले (24 घंटे)",
    occupancy: "बेड की occupeेंसी",
    aqi: "एक्यूआई",
    event: "आगामी प्रमुख कार्यक्रम",
    admissionsChange: "कल से +15.2%",
    occupancyChange: "7,382 / 9,000 बेड",
    aqiChange: "अस्वास्थ्यकर",
    eventChange: "12 दिनों में",
    eventValue: "गणेश चतुर्थी",
  },
  mr: {
    admissions: "एकूण प्रवेश (24 तास)",
    occupancy: "बेड व्याप्ती",
    aqi: "AQI",
    event: "आगामी प्रमुख कार्यक्रम",
    admissionsChange: "कालपासून +15.2%",
    occupancyChange: "7,382 / 9,000 बेड",
    aqiChange: "अस्वास्थ्यकर",
    eventChange: "12 दिवसांत",
    eventValue: "गणेश चतुर्थी",
  },
  kn: {
    admissions: "ಒಟ್ಟು ದಾಖಲಾತಿಗಳು (24ಗಂ)",
    occupancy: "ಹಾಸಿಗೆ ಲಭ್ಯತೆ",
    aqi: "ಎಕ್ಯೂಐ",
    event: "ಮುಂಬರುವ ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮ",
    admissionsChange: "ನಿನ್ನೆಯಿಂದ +15.2%",
    occupancyChange: "7,382 / 9,000 ಹಾಸಿಗೆಗಳು",
    aqiChange: "ಅನಾರೋಗ್ಯಕರ",
    eventChange: "12 ದಿನಗಳಲ್ಲಿ",
    eventValue: "ಗಣೇಶ ಚತುರ್ಥಿ",
  },
  te: {
    admissions: "మొత్తం ప్రవేశాలు (24గం)",
    occupancy: "పడకల లభ్యత",
    aqi: "ఎక్యూఐ",
    event: "రాబోయే ముఖ్య సంఘటన",
    admissionsChange: "నిన్నటి నుండి +15.2%",
    occupancyChange: "7,382 / 9,000 పడకలు",
    aqiChange: "అనారోగ్యకరం",
    eventChange: "12 రోజుల్లో",
    eventValue: "గణేష్ చతుర్థి",
  },
  ta: {
    admissions: "மொத்த சேர்க்கைகள் (24ம)",
    occupancy: "படுக்கை வசதி",
    aqi: "ஏர் குவாலிட்டி இன்டெக்ஸ்",
    event: "வரவிருக்கும் முக்கிய நிகழ்வு",
    admissionsChange: "நேற்றிலிருந்து +15.2%",
    occupancyChange: "7,382 / 9,000 படுக்கைகள்",
    aqiChange: "ஆரோக்கியமற்றது",
    eventChange: "12 நாட்களில்",
    eventValue: "கணேஷ் சதுர்த்தி",
  },
  sa: {
    admissions: "कुल प्रवेशाः (२४हो)",
    occupancy: "शय्या-अधिभोगः",
    aqi: "वायु गुणवत्ता सूचकांक",
    event: "आगामी प्रमुखः उत्सवः",
    admissionsChange: "ह्यः +१५.२%",
    occupancyChange: "७,३८२ / ९,००० शय्याः",
    aqiChange: "अस्वास्थ्यकरम्",
    eventChange: "१२ दिनेषु",
    eventValue: "गणेश चतुर्थी",
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
      value: t.eventValue,
      change: t.eventChange,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
