'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bot, Zap, ShieldCheck, ListChecks, Loader2 } from 'lucide-react';
import { getSurgePredictions } from '@/app/actions';
import type { GenerateSurgePredictionsOutput } from '@/ai/flows/generate-surge-predictions';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: "AI Surge Prediction Tool",
    description: "Input real-time data to generate a patient surge forecast and receive actionable recommendations.",
    historicalData: "Historical Data (JSON)",
    pollutionLevels: "Real-time Pollution Levels (JSON)",
    eventCalendar: "Event Calendar (JSON)",
    generatePrediction: "Generate Prediction",
    analyzing: "AI is analyzing the data... Please wait.",
    predictionGenerated: "Prediction Generated",
    analysisComplete: "AI analysis complete. See results below.",
    predictionFailed: "Prediction Failed",
    predictedSurge: "Predicted Surge",
    confidenceLevel: "Confidence Level",
    recommendations: "Recommendations",
  },
  hi: {
    title: "एआई सर्ज पूर्वानुमान उपकरण",
    description: "रोगी वृद्धि का पूर्वानुमान उत्पन्न करने और कार्रवाई योग्य सिफारिशें प्राप्त करने के लिए वास्तविक समय डेटा इनपुट करें।",
    historicalData: "ऐतिहासिक डेटा (JSON)",
    pollutionLevels: "वास्तविक समय प्रदूषण स्तर (JSON)",
    eventCalendar: "इवेंट कैलेंडर (JSON)",
    generatePrediction: "पूर्वानुमान उत्पन्न करें",
    analyzing: "एआई डेटा का विश्लेषण कर रहा है... कृपया प्रतीक्षा करें।",
    predictionGenerated: "पूर्वानुमान उत्पन्न हुआ",
    analysisComplete: "एआई विश्लेषण पूरा हुआ। नीचे परिणाम देखें।",
    predictionFailed: "पूर्वानुमान विफल",
    predictedSurge: "अनुमानित उछाल",
    confidenceLevel: "आत्मविश्वास स्तर",
    recommendations: "सिफारिशें",
  },
  mr: {
    title: "AI वाढीच्या अंदाजाचे साधन",
    description: "रुग्णांच्या वाढीचा अंदाज घेण्यासाठी आणि कार्यवाही करण्यायोग्य शिफारसी मिळवण्यासाठी रिअल-टाइम डेटा इनपुट करा.",
    historicalData: "ऐतिहासिक डेटा (JSON)",
    pollutionLevels: "रिअल-टाइम प्रदूषण पातळी (JSON)",
    eventCalendar: "कार्यक्रम कॅलेंडर (JSON)",
    generatePrediction: "अंदाज तयार करा",
    analyzing: "AI डेटाचे विश्लेषण करत आहे... कृपया प्रतीक्षा करा.",
    predictionGenerated: "अंदाज तयार झाला",
    analysisComplete: "AI विश्लेषण पूर्ण झाले. खाली निकाल पहा.",
    predictionFailed: "अंदाज अयशस्वी",
    predictedSurge: "अपेक्षित वाढ",
    confidenceLevel: "आत्मविश्वास पातळी",
    recommendations: "शिफारसी",
  },
  kn: {
    title: "AI ಸರ್ಜ್ ಪ್ರಿಡಿಕ್ಷನ್ ಟೂಲ್",
    description: "ರೋಗಿಗಳ ಏರಿಕೆಯ ಮುನ್ಸೂಚನೆಯನ್ನು ರಚಿಸಲು ಮತ್ತು ಕ್ರಮಬದ್ಧ ಶಿಫಾರಸುಗಳನ್ನು ಸ್ವೀಕರಿಸಲು ನೈಜ-ಸಮಯದ ಡೇಟಾವನ್ನು ಇನ್ಪುಟ್ ಮಾಡಿ.",
    historicalData: "ಐತಿಹಾಸಿಕ ಡೇಟಾ (JSON)",
    pollutionLevels: "ನೈಜ-ಸಮಯದ ಮಾಲಿನ್ಯ ಮಟ್ಟಗಳು (JSON)",
    eventCalendar: "ಈವೆಂಟ್ ಕ್ಯಾಲೆಂಡರ್ (JSON)",
    generatePrediction: "ಮುನ್ಸೂಚನೆಯನ್ನು ರಚಿಸಿ",
    analyzing: "AI ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ... ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ.",
    predictionGenerated: "ಮುನ್ಸೂಚನೆ ರಚಿಸಲಾಗಿದೆ",
    analysisComplete: "AI ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ಕೆಳಗೆ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ.",
    predictionFailed: "ಮುನ್ಸೂಚನೆ ವಿಫಲವಾಗಿದೆ",
    predictedSurge: "ಊಹಿಸಲಾದ ಏರಿಕೆ",
    confidenceLevel: "ವಿಶ್ವಾಸದ ಮಟ್ಟ",
    recommendations: "ಶಿಫಾರಸುಗಳು",
  },
  te: {
    title: "AI సర్జ్ ప్రిడిక్షన్ సాధనం",
    description: "రోగి పెరుగుదల సూచనను రూపొందించడానికి మరియు చర్యారూప సిఫార్సులను స్వీకరించడానికి నిజ-సమయ డేటాను ఇన్‌పుట్ చేయండి.",
    historicalData: "చారిత్రక డేటా (JSON)",
    pollutionLevels: "నిజ-సమయ కాలుష్య స్థాయిలు (JSON)",
    eventCalendar: "ఈవెంట్ క్యాలెండర్ (JSON)",
    generatePrediction: "సూచనను రూపొందించండి",
    analyzing: "AI డేటాను విశ్లేషిస్తోంది... దయచేసి వేచి ఉండండి.",
    predictionGenerated: "సూచన రూపొందించబడింది",
    analysisComplete: "AI విశ్లేషణ పూర్తయింది. క్రింద ఫలితాలను చూడండి.",
    predictionFailed: "సూచన విఫలమైంది",
    predictedSurge: "ఊహించిన పెరుగుదల",
    confidenceLevel: "విశ్వాస స్థాయి",
    recommendations: "సిఫార్సులు",
  },
  ta: {
    title: "AI சர்ஜ் கணிப்பு கருவி",
    description: "நோயாளிகளின் எழுச்சி முன்னறிவிப்பை உருவாக்க மற்றும் செயல்படக்கூடிய பரிந்துரைகளைப் பெற நிகழ்நேர தரவை உள்ளிடவும்.",
    historicalData: "வரலாற்றுத் தரவு (JSON)",
    pollutionLevels: "நிகழ்நேர மாசுபாடு அளவுகள் (JSON)",
    eventCalendar: "நிகழ்வு நாட்காட்டி (JSON)",
    generatePrediction: "கணிப்பை உருவாக்கு",
    analyzing: "AI தரவை பகுப்பாய்வு செய்கிறது... ദയവായി കാത്തിരിക്കുക.",
    predictionGenerated: "கணிப்பு உருவாக்கப்பட்டது",
    analysisComplete: "AI பகுப்பாய்வு முடிந்தது. கீழே உள்ள முடிவுகளைக் காண்க.",
    predictionFailed: "கணிப்பு தோல்வியுற்றது",
    predictedSurge: "கணிக்கப்பட்ட எழுச்சி",
    confidenceLevel: "நம்பிக்கை நிலை",
    recommendations: "பரிந்துரைகள்",
  },
  sa: {
    title: "AI वृद्धि-पूर्वानुमान-साधनम्",
    description: "रोगी-वृद्धि-पूर्वानुमानं जनयितुं क्रियात्मकाः सूचनाः प्राप्तुं च वास्तविक-समय-आँकडान् निवेशयन्तु।",
    historicalData: "ऐतिहासिक-आँकडाः (JSON)",
    pollutionLevels: "वास्तविक-समय-प्रदूषण-स्तराः (JSON)",
    eventCalendar: "घटना-पञ्जिका (JSON)",
    generatePrediction: "पूर्वानुमानं जनयन्तु",
    analyzing: "AI आँकडान् विश्लेषयति... कृपया प्रतीक्षां कुर्वन्तु।",
    predictionGenerated: "पूर्वानुमानं जनितम्",
    analysisComplete: "AI विश्लेषणं सम्पन्नम्। अधः परिणामान् पश्यन्तु।",
    predictionFailed: "पूर्वानुमानं विफलम्",
    predictedSurge: "पूर्वानुमानिता वृद्धिः",
    confidenceLevel: "विश्वासस्तरः",
    recommendations: "अनुशंसाः",
  },
};

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
  const { language } = useLanguage();
  const t = content[language];
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
        title: t.predictionGenerated,
        description: t.analysisComplete,
      })
    } else {
      console.error(result.error);
       toast({
        variant: "destructive",
        title: t.predictionFailed,
        description: result.error || "An unknown error occurred.",
      })
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="historical-data">{t.historicalData}</Label>
            <Textarea
              id="historical-data"
              value={historicalData}
              onChange={(e) => setHistoricalData(e.target.value)}
              rows={10}
              className="font-code text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pollution-levels">{t.pollutionLevels}</Label>
            <Textarea
              id="pollution-levels"
              value={pollutionLevels}
              onChange={(e) => setPollutionLevels(e.target.value)}
              rows={10}
              className="font-code text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-calendar">{t.eventCalendar}</Label>
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
          {t.generatePrediction}
        </Button>
        
        {isLoading && (
            <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">{t.analyzing}</p>
                </div>
            </div>
        )}

        {prediction && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                  <ListChecks className="w-5 h-5 text-primary"/>
                  <CardTitle className="text-md font-medium">{t.predictedSurge}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{prediction.predictedSurge}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                  <ShieldCheck className="w-5 h-5 text-primary"/>
                  <CardTitle className="text-md font-medium">{t.confidenceLevel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{prediction.confidenceLevel}</p>
                </CardContent>
              </Card>
            </div>
             <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                 <Zap className="w-5 h-5 text-primary"/>
                <CardTitle className="text-md font-medium">{t.recommendations}</CardTitle>
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
