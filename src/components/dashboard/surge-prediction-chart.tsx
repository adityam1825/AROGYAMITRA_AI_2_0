
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import { addDays, format } from 'date-fns';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useMemo } from 'react';

const content = {
  en: {
    title: "Patient Admissions: 7-Day View",
    description: "Historical and predicted admissions for the next 7 days.",
    historical: "Historical",
    predicted: "Predicted",
    admissions: "Admissions",
    tooltipDescription: (value: number, type: string) => `On this day, the ${type.toLowerCase()} number of admissions was ${value}.`,
  },
  hi: {
    title: "रोगी प्रवेश: 7-दिवसीय दृश्य",
    description: "अगले 7 दिनों के लिए ऐतिहासिक और अनुमानित प्रवेश।",
    historical: "ऐतिहासिक",
    predicted: "अनुमानित",
    admissions: "प्रवेश",
    tooltipDescription: (value: number, type: string) => `इस दिन, ${type.toLowerCase()} प्रवेश की संख्या ${value} थी।`,
  },
  mr: {
    title: "रुग्ण प्रवेश: ७-दिवसांचे दृश्य",
    description: "पुढील ७ दिवसांसाठी ऐतिहासिक आणि अंदाजित प्रवेश.",
    historical: "ऐतिहासिक",
    predicted: "अंदाजित",
    admissions: "प्रवेश",
    tooltipDescription: (value: number, type: string) => `या दिवशी, ${type.toLowerCase()} प्रवेशांची संख्या ${value} होती।`,
  },
  kn: {
    title: "ರೋಗಿಗಳ ದಾಖಲಾತಿ: 7-ದಿನಗಳ ನೋಟ",
    description: "ಮುಂದಿನ 7 ದಿನಗಳ ಐತಿಹಾಸಿಕ ಮತ್ತು ಮುನ್ಸೂಚಿತ ದಾಖಲಾತಿಗಳು.",
    historical: "ಐತಿಹಾಸಿಕ",
    predicted: "ಮುನ್ಸೂಚನೆ",
    admissions: "ದಾಖಲಾತಿಗಳು",
    tooltipDescription: (value: number, type: string) => `ಈ ದಿನ, ${type.toLowerCase()} ದಾಖಲಾತಿಗಳ ಸಂಖ್ಯೆ ${value} ಆಗಿತ್ತು.`,
  },
  te: {
    title: "రోగి ప్రవేశాలు: 7-రోజుల వీక్షణ",
    description: "రాబోయే 7 రోజులకు చారిత్రక మరియు అంచనా వేసిన ప్రవేశాలు.",
    historical: "చారిత్రక",
    predicted: "అంచనా",
    admissions: "ప్రవేశాలు",
    tooltipDescription: (value: number, type: string) => `ఈ రోజు, ${type.toLowerCase()} ప్రవేశాల సంఖ్య ${value}.`,
  },
  ta: {
    title: "நோயாளிகள் சேர்க்கை: 7-நாள் பார்வை",
    description: "அடுத்த 7 நாட்களுக்கான வரலாற்று மற்றும் கணிக்கப்பட்ட சேர்க்கைகள்.",
    historical: "வரலாற்று",
    predicted: "கணிக்கப்பட்டவை",
    admissions: "சேர்க்கைகள்",
    tooltipDescription: (value: number, type: string) => `இந்த நாளில், ${type.toLowerCase()} சேர்க்கைகளின் எண்ணிக்கை ${value} ஆக இருந்தது.`,
  },
  san: {
    title: "रोगीप्रवेशाः: ७-दिवसीयः दृष्टिकोणः",
    description: "आगामिनां ७ दिवसानां कृते ऐतिहासिकं तथा पूर्वानुमानितं प्रवेशाः।",
    historical: "ऐतिहासिकम्",
    predicted: "पूर्वानुमानितम्",
    admissions: "प्रवेशाः",
    tooltipDescription: (value: number, type: string) => `अस्मिन् दिने, ${type.toLowerCase()} प्रवेशानां संख्या ${value} आसीत्।`,
  },
};


const generateChartData = (city: string) => {
    const data = [];
    const today = new Date();
    // Use a simple hash of the city name to create a seed for randomization
    const seed = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let i = -3; i <= 3; i++) {
        const date = addDays(today, i);
        // Base value + sine wave for seasonality + city-specific variation + daily trend
        const value = 1000 + Math.floor(Math.sin(date.getTime() / 86400000 + seed) * 200) + (seed % 100) + i * 50;
        
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

const CustomTooltip = ({ active, payload, label, t }: TooltipProps<ValueType, NameType> & { t: typeof content['en'] }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const value = data.value as number;
    const type = data.name === t.historical ? t.historical : t.predicted;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {type}
            </span>
            <span className="font-bold text-muted-foreground">{label}</span>
          </div>
          <div className="flex flex-col space-y-1">
             <span className="text-[0.70rem] uppercase text-muted-foreground">
              {t.admissions}
            </span>
            <span className="font-bold">
              {value}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 max-w-xs">{t.tooltipDescription(value, type)}</p>
      </div>
    );
  }

  return null;
};

export function SurgePredictionChart() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];
  
  const data = useMemo(() => generateChartData(city), [city]);
  
  return (
    <Card className="h-full interactive-card">
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
              content={<CustomTooltip t={t} />}
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
