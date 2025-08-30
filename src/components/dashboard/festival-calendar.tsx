
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { isSameDay } from 'date-fns';

const content = {
  en: {
    title: "Event Calendar",
    description: "Select a date to see AI-powered predictions and advisories for that day.",
  },
  hi: {
    title: "इवेंट कैलेंडर",
    description: "उस दिन के लिए एआई-संचालित भविष्यवाणियों और सलाह देखने के लिए एक तारीख चुनें।",
  },
  mr: {
    title: "कार्यक्रम दिनदर्शिका",
    description: "त्या दिवसासाठी AI-शक्तीवर चालणारे अंदाज आणि सल्ला पाहण्यासाठी एक तारीख निवडा.",
  },
  kn: {
    title: "ಈವೆಂಟ್ ಕ್ಯಾಲೆಂಡರ್",
    description: "ಆ ದಿನದ AI-ಚಾಲಿತ ಭವಿಷ್ಯವಾಣಿಗಳು ಮತ್ತು ಸಲಹೆಗಳನ್ನು ನೋಡಲು ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  },
  te: {
    title: "ఈవెంట్ క్యాలెండర్",
    description: "ఆ రోజు కోసం AI-ఆధారిత అంచనాలు మరియు సలహాలను చూడటానికి ఒక తేదీని ఎంచుకోండి.",
  },
  ta: {
    title: "நிகழ்வு காலண்டர்",
    description: "அந்த நாளுக்கான AI-இயங்கும் கணிப்புகள் மற்றும் ஆலோசனைகளைப் பார்க்க ஒரு தேதியைத் தேர்ந்தெடுக்கவும்.",
  },
  sa: {
    title: "कार्यक्रम-पञ्जिका",
    description: "तस्य दिनस्य कृते AI-चालितानि भविष्यवाण्यानि परामर्शाः च द्रष्टुं दिनाङ्कं चिनोतु।",
  },
};

const festivals = [
    { date: new Date(2024, 0, 15), name: 'Makar Sankranti' },
    { date: new Date(2024, 0, 26), name: 'Republic Day' },
    { date: new Date(2024, 1, 14), name: 'Vasant Panchami' },
    { date: new Date(2024, 2, 8), name: 'Maha Shivaratri' },
    { date: new Date(2024, 2, 25), name: 'Holi' },
    { date: new Date(2024, 3, 11), name: 'Eid-ul-Fitr' },
    { date: new Date(2024, 3, 17), name: 'Rama Navami' },
    { date: new Date(2024, 4, 23), name: 'Buddha Purnima' },
    { date: new Date(2024, 5, 17), name: 'Eid al-Adha' },
    { date: new Date(2024, 6, 7), name: 'Rath Yatra' },
    { date: new Date(2024, 7, 15), name: 'Independence Day' },
    { date: new Date(2024, 7, 19), name: 'Raksha Bandhan' },
    { date: new Date(2024, 7, 26), name: 'Janmashtami' },
    { date: new Date(2024, 8, 7), name: 'Ganesh Chaturthi' },
    { date: new Date(2024, 8, 15), name: 'Onam' },
    { date: new Date(2024, 9, 3), name: 'Navaratri' },
    { date: new Date(2024, 9, 12), name: 'Dussehra' },
    { date: new Date(2024, 10, 1), name: 'Diwali' },
    { date: new Date(2024, 10, 15), name: 'Guru Nanak Jayanti' },
    { date: new Date(2024, 11, 25), name: 'Christmas' },
];

export function FestivalCalendar({ selectedDate, onDateChange }: { selectedDate: Date; onDateChange: (date: Date) => void }) {
  const { language } = useLanguage();
  const t = content[language];
  
  const modifiers = {
    festival: festivals.map(f => f.date),
  };

  const modifiersStyles = {
    festival: {
      fontWeight: 'bold',
      color: 'hsl(var(--primary))',
      textDecoration: 'underline',
    },
  };

  const renderDay = (day: Date) => {
    const festival = festivals.find(f => isSameDay(f.date, day));
    return (
      <div className="relative flex items-center justify-center h-full w-full">
        {day.getDate()}
        {festival && <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary" />}
      </div>
    );
  };
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateChange(date)}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          components={{ DayContent: (props) => renderDay(props.date) }}
        />
      </CardContent>
    </Card>
  );
}
