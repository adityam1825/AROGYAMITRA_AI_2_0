
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BedDouble, Droplets, CalendarDays } from "lucide-react";
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import { isSameDay, format } from 'date-fns';

const content = {
  en: {
    admissions: "Admissions",
    occupancy: "Bed Occupancy",
    aqi: "AQI",
    event: "Major Event",
    admissionsChange: (date: string) => `on ${date}`,
    occupancyChange: "7,382 / 9,000 beds",
    aqiChange: "Unhealthy",
    eventChange: "No major event",
    ganeshChaturthi: "Ganesh Chaturthi",
    diwali: "Diwali",
  },
  hi: {
    admissions: "दाखिले",
    occupancy: "बेड की occupeेंसी",
    aqi: "एक्यूआई",
    event: "प्रमुख कार्यक्रम",
    admissionsChange: (date: string) => `${date} को`,
    occupancyChange: "7,382 / 9,000 बेड",
    aqiChange: "अस्वास्थ्यकर",
    eventChange: "कोई प्रमुख कार्यक्रम नहीं",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दिवाली",
  },
  mr: {
    admissions: "प्रवेश",
    occupancy: "बेड व्याप्ती",
    aqi: "AQI",
    event: "प्रमुख कार्यक्रम",
    admissionsChange: (date: string) => `${date} रोजी`,
    occupancyChange: "7,382 / 9,000 बेड",
    aqiChange: "अस्वास्थ्यकर",
    eventChange: "कोणताही मोठा कार्यक्रम नाही",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दिवाळी",
  },
  kn: {
    admissions: "ದಾಖಲಾತಿಗಳು",
    occupancy: "ಹಾಸಿಗೆ ಲಭ್ಯತೆ",
    aqi: "ಎಕ್ಯೂಐ",
    event: "ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮ",
    admissionsChange: (date: string) => `${date} ರಂದು`,
    occupancyChange: "7,382 / 9,000 ಹಾಸಿಗೆಗಳು",
    aqiChange: "ಅನಾರೋಗ್ಯಕರ",
    eventChange: "ಯಾವುದೇ ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮವಿಲ್ಲ",
    ganeshChaturthi: "ಗಣೇಶ ಚತುರ್ಥಿ",
    diwali: "ದೀಪಾವಳಿ",
  },
  te: {
    admissions: "ప్రవేశాలు",
    occupancy: "పడకల లభ్యత",
    aqi: "ఎక్యూఐ",
    event: "ముఖ్య సంఘటన",
    admissionsChange: (date: string) => `${date} న`,
    occupancyChange: "7,382 / 9,000 పడకలు",
    aqiChange: "అనారోగ్యకరం",
    eventChange: "ముఖ్యమైన సంఘటనలు లేవు",
    ganeshChaturthi: "వినాయక చవితి",
    diwali: "దీపావళి",
  },
  ta: {
    admissions: "சேர்க்கைகள்",
    occupancy: "படுக்கை வசதி",
    aqi: "ஏர் குவாலிட்டி இன்டெக்ஸ்",
    event: "முக்கிய நிகழ்வு",
    admissionsChange: (date: string) => `${date} அன்று`,
    occupancyChange: "7,382 / 9,000 படுக்கைகள்",
    aqiChange: "ஆரோக்கியமற்றது",
    eventChange: "முக்கிய நிகழ்வுகள் இல்லை",
    ganeshChaturthi: "விநாயகர் சதுர்த்தி",
    diwali: "தீபாவளி",
  },
  sa: {
    admissions: "प्रवेशाः",
    occupancy: "शय्या-अधिभोगः",
    aqi: "वायु गुणवत्ता सूचकांक",
    event: "प्रमुखः उत्सवः",
    admissionsChange: (date: string) => `${date} दिनाङ्के`,
    occupancyChange: "७,३८२ / ९,००० शय्याः",
    aqiChange: "अस्वास्थ्यकरम्",
    eventChange: "कोऽपि प्रमुखः उत्सवः नास्ति",
    ganeshChaturthi: "गणेश चतुर्थी",
    diwali: "दीपावली",
  },
};

// Dummy festival data for demonstration
const festivals = [
    { date: new Date(2024, 0, 15), name: 'Makar Sankranti', admissionMultiplier: 1.1 },
    { date: new Date(2024, 0, 26), name: 'Republic Day', admissionMultiplier: 1.2 },
    { date: new Date(2024, 1, 14), name: 'Vasant Panchami', admissionMultiplier: 1.1 },
    { date: new Date(2024, 2, 8), name: 'Maha Shivaratri', admissionMultiplier: 1.3 },
    { date: new Date(2024, 2, 25), name: 'Holi', admissionMultiplier: 1.6 },
    { date: new Date(2024, 3, 11), name: 'Eid-ul-Fitr', admissionMultiplier: 1.5 },
    { date: new Date(2024, 3, 17), name: 'Rama Navami', admissionMultiplier: 1.3 },
    { date: new Date(2024, 4, 23), name: 'Buddha Purnima', admissionMultiplier: 1.1 },
    { date: new Date(2024, 5, 17), name: 'Eid al-Adha', admissionMultiplier: 1.5 },
    { date: new Date(2024, 6, 7), name: 'Rath Yatra', admissionMultiplier: 1.4 },
    { date: new Date(2024, 7, 15), name: 'Independence Day', admissionMultiplier: 1.2 },
    { date: new Date(2024, 7, 19), name: 'Raksha Bandhan', admissionMultiplier: 1.3 },
    { date: new Date(2024, 7, 26), name: 'Janmashtami', admissionMultiplier: 1.4 },
    { date: new Date(2024, 8, 7), name: 'Ganesh Chaturthi', admissionMultiplier: 1.7 },
    { date: new Date(2024, 8, 15), name: 'Onam', admissionMultiplier: 1.3 },
    { date: new Date(2024, 9, 3), name: 'Navaratri', admissionMultiplier: 1.2 },
    { date: new Date(2024, 9, 12), name: 'Dussehra', admissionMultiplier: 1.5 },
    { date: new Date(2024, 10, 1), name: 'Diwali', admissionMultiplier: 1.8 },
    { date: new Date(2024, 10, 15), name: 'Guru Nanak Jayanti', admissionMultiplier: 1.2 },
    { date: new Date(2024, 11, 25), name: 'Christmas', admissionMultiplier: 1.2 },
];

export function OverviewCards({ selectedDate }: { selectedDate: Date }) {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];

  const today = new Date();
  const isToday = isSameDay(selectedDate, today);

  const festival = festivals.find(f => isSameDay(f.date, selectedDate));
  
  const baseAdmissions = isToday ? 1204 : 1000 + Math.floor(Math.random() * 400);
  const dailyAdmissions = festival ? Math.floor(baseAdmissions * festival.admissionMultiplier) : baseAdmissions;

  const eventName = festival ? festival.name : t.eventChange;

  const overviewData = [
    {
      title: t.admissions,
      value: dailyAdmissions.toLocaleString(),
      change: t.admissionsChange(format(selectedDate, 'MMM d')),
      icon: Users,
    },
    {
      title: t.occupancy,
      value: `${Math.min(82 + (dailyAdmissions - 1200) / 50, 95).toFixed(0)}%`,
      change: t.occupancyChange,
      icon: BedDouble,
    },
    {
      title: `${t.aqi} ${city}`,
      value: (158 + Math.floor(Math.sin(selectedDate.getTime() / 100000000) * 20)).toString(),
      change: t.aqiChange,
      icon: Droplets,
    },
    {
      title: t.event,
      value: eventName,
      change: isToday ? 'Today' : format(selectedDate, 'EEEE'),
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
