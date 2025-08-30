
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from '@/context/language-context';
import { addDays, format } from 'date-fns';

const content = {
  en: {
    title: "Patient Admissions: 7-Day View",
    description: "Historical and predicted admissions for the next 7 days.",
    historical: "Historical",
    predicted: "Predicted",
    admissions: "Admissions",
  },
  hi: {
    title: "रोगी प्रवेश: 7-दिवसीय दृश्य",
    description: "अगले 7 दिनों के लिए ऐतिहासिक और अनुमानित प्रवेश।",
    historical: "ऐतिहासिक",
    predicted: "अनुमानित",
    admissions: "प्रवेश",
  },
  mr: {
    title: "रुग्ण प्रवेश: ७-दिवसांचे दृश्य",
    description: "पुढील ७ दिवसांसाठी ऐतिहासिक आणि अंदाजित प्रवेश.",
    historical: "ऐतिहासिक",
    predicted: "अंदाजित",
    admissions: "प्रवेश",
  },
  kn: {
    title: "ರೋಗಿಗಳ ದಾಖಲಾತಿ: 7-ದಿನಗಳ ನೋಟ",
    description: "ಮುಂದಿನ 7 ದಿನಗಳ ಐತಿಹಾಸಿಕ ಮತ್ತು ಮುನ್ಸೂಚಿತ ದಾಖಲಾತಿಗಳು.",
    historical: "ಐತಿಹಾಸಿಕ",
    predicted: "ಮುನ್ಸೂಚನೆ",
    admissions: "ದಾಖಲಾತಿಗಳು",
  },
  te: {
    title: "రోగి ప్రవేశాలు: 7-రోజుల వీక్షణ",
    description: "రాబోయే 7 రోజులకు చారిత్రక మరియు అంచనా వేసిన ప్రవేశాలు.",
    historical: "చారిత్రక",
    predicted: "అంచనా",
    admissions: "ప్రవేశాలు",
  },
  ta: {
    title: "நோயாளிகள் சேர்க்கை: 7-நாள் பார்வை",
    description: "அடுத்த 7 நாட்களுக்கான வரலாற்று மற்றும் கணிக்கப்பட்ட சேர்க்கைகள்.",
    historical: "வரலாற்று",
    predicted: "கணிக்கப்பட்டவை",
    admissions: "சேர்க்கைகள்",
  },
  sa: {
    title: "रोगीप्रवेशाः: ७-दिवसीयः दृष्टिकोणः",
    description: "आगामिनां ७ दिवसानां कृते ऐतिहासिकं तथा पूर्वानुमानितं प्रवेशाः।",
    historical: "ऐतिहासिकम्",
    predicted: "पूर्वानुमानितम्",
    admissions: "प्रवेशाः",
  },
};


const generateChartData = () => {
    const data = [];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
        const date = addDays(today, i);
        const value = 1000 + Math.floor(Math.sin(date.getTime() / 86400000) * 200) + i * 50;
        
        const entry: { name: string; historical?: number; predicted?: number } = {
            name: format(date, 'MMM d'),
        };

        if (i <= 0) {
            entry.historical = value;
        } else {
            entry.predicted = value;
        }
        
        data.push(entry);
    }
    return data;
}

export function SurgePredictionChart() {
  const { language } = useLanguage();
  const t = content[language];
  const data = generateChartData();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
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
