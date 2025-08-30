'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from '@/context/language-context';
import { addDays, format, isSameDay } from 'date-fns';

const content = {
  en: {
    title: "Patient Admissions: 7-Day View",
    description: (date: string) => `Historical and predicted admissions around ${date}.`,
    historical: "Historical",
    predicted: "Predicted",
    admissions: "Admissions",
  },
  hi: {
    title: "रोगी प्रवेश: 7-दिवसीय दृश्य",
    description: (date: string) => `${date} के आसपास ऐतिहासिक और अनुमानित प्रवेश।`,
    historical: "ऐतिहासिक",
    predicted: "अनुमानित",
    admissions: "प्रवेश",
  },
  mr: {
    title: "रुग्ण प्रवेश: ७-दिवसांचे दृश्य",
    description: (date: string) => `${date} च्या आसपासचे ऐतिहासिक आणि अंदाजित प्रवेश.`,
    historical: "ऐतिहासिक",
    predicted: "अंदाजित",
    admissions: "प्रवेश",
  },
  kn: {
    title: "ರೋಗಿಗಳ ದಾಖಲಾತಿ: 7-ದಿನಗಳ ನೋಟ",
    description: (date: string) => `${date} ಸುತ್ತಮುತ್ತಲಿನ ಐತಿಹಾಸಿಕ ಮತ್ತು ಮುನ್ಸೂಚಿತ ದಾಖಲಾತಿಗಳು.`,
    historical: "ಐತಿಹಾಸಿಕ",
    predicted: "ಮುನ್ಸೂಚನೆ",
    admissions: "ದಾಖಲಾತಿಗಳು",
  },
  te: {
    title: "రోగి ప్రవేశాలు: 7-రోజుల వీక్షణ",
    description: (date: string) => `${date} చుట్టూ చారిత్రక మరియు అంచనా వేసిన ప్రవేశాలు.`,
    historical: "చారిత్రక",
    predicted: "అంచనా",
    admissions: "ప్రవేశాలు",
  },
  ta: {
    title: "நோயாளிகள் சேர்க்கை: 7-நாள் பார்வை",
    description: (date: string) => `${date} சுற்றியுள்ள வரலாற்று மற்றும் கணிக்கப்பட்ட சேர்க்கைகள்.`,
    historical: "வரலாற்று",
    predicted: "கணிக்கப்பட்டவை",
    admissions: "சேர்க்கைகள்",
  },
  sa: {
    title: "रोगीप्रवेशाः: ७-दिवसीयः दृष्टिकोणः",
    description: (date: string) => `${date} परितः ऐतिहासिकं तथा पूर्वानुमानितं प्रवेशाः।`,
    historical: "ऐतिहासिकम्",
    predicted: "पूर्वानुमानितम्",
    admissions: "प्रवेशाः",
  },
};

// Dummy festival data for demonstration
const festivals = [
  { date: new Date(2024, 8, 7), name: 'Ganesh Chaturthi', admissionMultiplier: 1.5 }, // Sep 7
  { date: new Date(2024, 10, 1), name: 'Diwali', admissionMultiplier: 1.8 }, // Nov 1
];

const generateChartData = (centerDate: Date) => {
    const data = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    for (let i = -3; i <= 3; i++) {
        const date = addDays(centerDate, i);
        const festival = festivals.find(f => isSameDay(f.date, date));
        const base = 1000 + Math.floor(Math.sin(date.getTime() / 86400000) * 200) + i * 50;
        const value = festival ? Math.floor(base * festival.admissionMultiplier) : base;

        const entry: { name: string; historical?: number; predicted?: number } = {
            name: format(date, 'MMM d'),
        };

        if (date <= today) {
            entry.historical = value;
        } else {
            entry.predicted = value;
        }
        
        data.push(entry);
    }
    return data;
}

export function SurgePredictionChart({ selectedDate }: { selectedDate: Date }) {
  const { language } = useLanguage();
  const t = content[language];
  const data = generateChartData(selectedDate);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description(format(selectedDate, 'MMMM d, yyyy'))}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              label={{ value: t.admissions, angle: -90, position: 'insideLeft', offset: 0, style: { fontSize: '12px', fill: 'hsl(var(--muted-foreground))' } }}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--card))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)'
              }}
            />
            <Legend wrapperStyle={{fontSize: '14px'}} />
            <Bar dataKey="historical" fill="hsl(var(--secondary))" name={t.historical} radius={[4, 4, 0, 0]} />
            <Bar dataKey="predicted" fill="hsl(var(--primary))" name={t.predicted} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
