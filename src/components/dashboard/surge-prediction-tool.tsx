'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bot, Zap, ShieldCheck, ListChecks, Loader2 } from 'lucide-react';
import { getSurgePredictions } from '@/app/actions';
import type { GenerateSurgePredictionsOutput } from '@/ai/flows/generate-surge-predictions';
import { useToast } from "@/hooks/use-toast"

const sampleHistoricalData = JSON.stringify([
    {"date": "2023-08-01", "admissions": 950, "discharges": 930},
    {"date": "2023-08-02", "admissions": 1020, "discharges": 980},
    {"date": "2023-08-03", "admissions": 1100, "discharges": 1050},
    {"date": "2023-08-04", "admissions": 980, "discharges": 960}
], null, 2);

const samplePollutionData = JSON.stringify({
    "location": "Mumbai",
    "aqi": 158,
    "pm2.5": "68.2 µg/m³",
    "pm10": "120.5 µg/m³"
}, null, 2);

const sampleEventData = JSON.stringify([
    {"event": "Ganesh Chaturthi", "startDate": "2024-09-07", "endDate": "2024-09-17", "scale": "Large"},
    {"event": "Diwali", "startDate": "2024-11-01", "endDate": "2024-11-05", "scale": "Large"}
], null, 2);

export function SurgePredictionTool() {
  const [historicalData, setHistoricalData] = useState(sampleHistoricalData);
  const [pollutionLevels, setPollutionLevels] = useState(samplePollutionData);
  const [eventCalendar, setEventCalendar] = useState(sampleEventData);
  const [prediction, setPrediction] = useState<GenerateSurgePredictionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePrediction = async () => {
    setIsLoading(true);
    setPrediction(null);
    const result = await getSurgePredictions({
      historicalData: historicalData,
      realtimePollutionLevels: pollutionLevels,
      eventCalendar: eventCalendar
    });
    setIsLoading(false);

    if (result.success && result.data) {
      setPrediction(result.data);
      toast({
        title: "Prediction Generated",
        description: "AI analysis complete. See results below.",
      })
    } else {
      console.error(result.error);
       toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: result.error || "An unknown error occurred.",
      })
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle>AI Surge Prediction Tool</CardTitle>
        </div>
        <CardDescription>
          Input real-time data to generate a patient surge forecast and receive actionable recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="historical-data">Historical Data (JSON)</Label>
            <Textarea
              id="historical-data"
              value={historicalData}
              onChange={(e) => setHistoricalData(e.target.value)}
              rows={10}
              className="font-code text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pollution-levels">Real-time Pollution Levels (JSON)</Label>
            <Textarea
              id="pollution-levels"
              value={pollutionLevels}
              onChange={(e) => setPollutionLevels(e.target.value)}
              rows={10}
              className="font-code text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-calendar">Event Calendar (JSON)</Label>
            <Textarea
              id="event-calendar"
              value={eventCalendar}
              onChange={(e) => setEventCalendar(e.target.value)}
              rows={10}
              className="font-code text-xs"
            />
          </div>
        </div>
        <Button onClick={handleGeneratePrediction} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
          Generate Prediction
        </Button>
        
        {isLoading && (
            <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">AI is analyzing the data... Please wait.</p>
                </div>
            </div>
        )}

        {prediction && (
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <ListChecks className="w-5 h-5 text-primary"/>
                <CardTitle className="text-md font-medium">Predicted Surge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{prediction.predictedSurge}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <ShieldCheck className="w-5 h-5 text-primary"/>
                <CardTitle className="text-md font-medium">Confidence Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{prediction.confidenceLevel}</p>
              </CardContent>
            </Card>
             <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                 <Zap className="w-5 h-5 text-primary"/>
                <CardTitle className="text-md font-medium">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground whitespace-pre-line">{prediction.recommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
