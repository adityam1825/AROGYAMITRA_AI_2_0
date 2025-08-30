'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: "Patient Admissions: Historical vs. Predicted",
    description: "Next 5 day forecast of patient admissions based on current data models.",
    historical: "Historical",
    predicted: "Predicted",
    today: "Today",
  },
  hi: {
    title: "रोगी प्रवेश: ऐतिहासिक बनाम अनुमानित",
    description: "वर्तमान डेटा मॉडल के आधार पर रोगी प्रवेश का अगला 5 दिन का पूर्वानुमान।",
    historical: "ऐतिहासिक",
    predicted: "अनुमानित",
    today: "आज",
  },
  mr: {
    title: "रुग्ण प्रवेश: ऐतिहासिक विरुद्ध अंदाजित",
    description: "सध्याच्या डेटा मॉडेलवर आधारित रुग्ण प्रवेशाचा पुढील ५ दिवसांचा अंदाज.",
    historical: "ऐतिहासिक",
    predicted: "अंदाजित",
    today: "आज",
  },
  kn: {
    title: "ರೋಗಿಗಳ ದಾಖಲಾತಿ: ಐತಿಹಾಸಿಕ ಮತ್ತು ಮುನ್ಸೂಚನೆ",
    description: "ಪ್ರಸ್ತುತ ಡೇಟಾ ಮಾದರಿಗಳನ್ನು ಆಧರಿಸಿ ರೋಗಿಗಳ ದಾಖಲಾತಿಯ ಮುಂದಿನ 5 ದಿನಗಳ ಮುನ್ಸೂಚನೆ.",
    historical: "ಐತಿಹಾಸಿಕ",
    predicted: "ಮುನ್ಸೂಚನೆ",
    today: "ಇಂದು",
  },
  te: {
    title: "రోగి ప్రవేశాలు: చారిత్రక vs. అంచనా",
    description: "ప్రస్తుత డేటా నమూనాల ఆధారంగా రోగి ప్రవేశాల యొక్క తదుపరి 5 రోజుల సూచన.",
    historical: "చారిత్రక",
    predicted: "అంచనా",
    today: "నేడు",
  },
  ta: {
    title: "நோயாளிகள் சேர்க்கை: வரலாற்று மற்றும் கணிக்கப்பட்டவை",
    description: "தற்போதைய தரவு மாதிரிகளின் அடிப்படையில் நோயாளிகள் சேர்க்கையின் அடுத்த 5 நாள் முன்னறிவிப்பு.",
    historical: "வரலாற்று",
    predicted: "கணிக்கப்பட்டவை",
    today: "இன்று",
  },
  sa: {
    title: "रोगीप्रवेशाः: ऐतिहासिकं बनाम पूर्वानुमानितम्",
    description: "वर्तमान-आँकडा-आदर्शान् आधारीकृत्य रोगीप्रवेशस्य आगामि-पञ्चदिवसीयः पूर्वानुमानः।",
    historical: "ऐतिहासिकम्",
    predicted: "पूर्वानुमानितम्",
    today: "अद्य",
  },
};

export function SurgePredictionChart() {
  const { language } = useLanguage();
  const t = content[language];

  const data = [
    { name: 'Aug 1', historical: 950, predicted: 980 },
    { name: 'Aug 2', historical: 1020, predicted: 1050 },
    { name: 'Aug 3', historical: 1100, predicted: 1120 },
    { name: 'Aug 4', historical: 980, predicted: 1000 },
    { name: 'Aug 5', historical: 1200, predicted: 1250 },
    { name: 'Aug 6', historical: 1350, predicted: 1400 },
    { name: t.today, historical: 1204, predicted: 1300 },
    { name: 'D+1', predicted: 1500 },
    { name: 'D+2', predicted: 1650 },
    { name: 'D+3', predicted: 1600 },
    { name: 'D+4', predicted: 1450 },
    { name: 'D+5', predicted: 1300 },
  ];
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
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
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--background))' }}
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
