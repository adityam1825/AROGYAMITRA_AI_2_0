'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
  { name: 'Aug 1', historical: 950, predicted: 980 },
  { name: 'Aug 2', historical: 1020, predicted: 1050 },
  { name: 'Aug 3', historical: 1100, predicted: 1120 },
  { name: 'Aug 4', historical: 980, predicted: 1000 },
  { name: 'Aug 5', historical: 1200, predicted: 1250 },
  { name: 'Aug 6', historical: 1350, predicted: 1400 },
  { name: 'Today', historical: 1204, predicted: 1300 },
  { name: 'D+1', predicted: 1500 },
  { name: 'D+2', predicted: 1650 },
  { name: 'D+3', predicted: 1600 },
  { name: 'D+4', predicted: 1450 },
  { name: 'D+5', predicted: 1300 },
];

export function SurgePredictionChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Patient Admissions: Historical vs. Predicted</CardTitle>
        <CardDescription>Next 5 day forecast of patient admissions based on current data models.</CardDescription>
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
            <Bar dataKey="historical" fill="hsl(var(--secondary))" name="Historical" radius={[4, 4, 0, 0]} />
            <Bar dataKey="predicted" fill="hsl(var(--primary))" name="Predicted" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
