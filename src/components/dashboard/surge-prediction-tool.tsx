'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Zap, ShieldCheck, ListChecks, Loader2, Volume2 } from 'lucide-react';
import { getSurgePredictions } from '@/app/actions';
import type { GenerateSurgePredictionsOutput } from '@/ai/flows/generate-surge-predictions';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';

const content = {
  en: {
    title: "AI Surge Prediction Tool",
    description: "Click the button to generate a patient surge forecast for the selected city and receive actionable recommendations.",
    generatePrediction: "Generate Prediction for",
    analyzing: "AI is analyzing the data... Please wait.",
    predictionGenerated: "Prediction Generated",
    analysisComplete: "AI analysis complete. See results below.",
    predictionFailed: "Prediction Failed",
    predictedSurge: "Predicted Surge",
    confidenceLevel: "Confidence Level",
    recommendations: "Recommendations",
    listen: "Listen to Prediction",
  },
  hi: {
    title: "एआई सर्ज पूर्वानुमान उपकरण",
    description: "चयनित शहर के लिए रोगी वृद्धि का पूर्वानुमान उत्पन्न करने और कार्रवाई योग्य सिफारिशें प्राप्त करने के लिए बटन पर क्लिक करें।",
    generatePrediction: "के लिए पूर्वानुमान उत्पन्न करें",
    analyzing: "एआई डेटा का विश्लेषण कर रहा है... कृपया प्रतीक्षा करें।",
    predictionGenerated: "पूर्वानुमान उत्पन्न हुआ",
    analysisComplete: "एआई विश्लेषण पूरा हुआ। नीचे परिणाम देखें।",
    predictionFailed: "पूर्वानुमान विफल",
    predictedSurge: "अनुमानित उछाल",
    confidenceLevel: "आत्मविश्वास स्तर",
    recommendations: "सिफारिशें",
    listen: "भविष्यवाणी सुनें",
  },
  mr: {
    title: "AI वाढीच्या अंदाजाचे साधन",
    description: "निवडलेल्या शहरासाठी रुग्णांच्या वाढीचा अंदाज घेण्यासाठी आणि कार्यवाही करण्यायोग्य शिफारसी मिळवण्यासाठी बटणावर क्लिक करा.",
    generatePrediction: "साठी अंदाज तयार करा",
    analyzing: "AI डेटाचे विश्लेषण करत आहे... कृपया प्रतीक्षा करा.",
    predictionGenerated: "अंदाज तयार झाला",
    analysisComplete: "AI विश्लेषण पूर्ण झाले. खाली निकाल पहा.",
    predictionFailed: "अंदाज अयशस्वी",
    predictedSurge: "अपेक्षित वाढ",
    confidenceLevel: "आत्मविश्वास पातळी",
    recommendations: "शिफारसी",
    listen: "अंदाज ऐका",
  },
  kn: {
    title: "AI ಸರ್ಜ್ ಪ್ರಿಡಿಕ್ಷನ್ ಟೂಲ್",
    description: "ಆಯ್ದ ನಗರಕ್ಕೆ ರೋಗಿಗಳ ಏರಿಕೆಯ ಮುನ್ಸೂಚನೆಯನ್ನು ರಚಿಸಲು ಮತ್ತು ಕ್ರಮಬದ್ಧ ಶಿಫಾರಸುಗಳನ್ನು ಸ್ವೀಕರಿಸಲು ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    generatePrediction: "ಗಾಗಿ ಮುನ್ಸೂಚನೆಯನ್ನು ರಚಿಸಿ",
    analyzing: "AI ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ... ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ.",
    predictionGenerated: "ಮುನ್ಸೂಚನೆ ರಚಿಸಲಾಗಿದೆ",
    analysisComplete: "AI ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ಕೆಳಗೆ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ.",
    predictionFailed: "ಮುನ್ಸೂಚನೆ ವಿಫಲವಾಗಿದೆ",
    predictedSurge: "ಊಹಿಸಲಾದ ಏರಿಕೆ",
    confidenceLevel: "ವಿಶ್ವಾಸದ ಮಟ್ಟ",
    recommendations: "ಶಿಫಾರಸುಗಳು",
    listen: "ಭವಿಷ್ಯವಾಣಿಯನ್ನು ಆಲಿಸಿ",
  },
  te: {
    title: "AI సర్జ్ ప్రిడిక్షన్ సాధనం",
    description: "ఎంచుకున్న నగరం కోసం రోగి పెరుగుదల సూచనను రూపొందించడానికి మరియు చర్యారూప సిఫార్సులను స్వీకరించడానికి బటన్‌ను క్లిక్ చేయండి.",
    generatePrediction: "కోసం సూచనను రూపొందించండి",
    analyzing: "AI డేటాను విశ్లేషిస్తోంది... దయచేసి వేచి ఉండండి.",
    predictionGenerated: "సూచన రూపొందించబడింది",
    analysisComplete: "AI విశ్లేషణ పూర్తయింది. క్రింద ఫలితాలను చూడండి.",
    predictionFailed: "సూచన విఫలమైంది",
    predictedSurge: "ఊహించిన పెరుగుదల",
    confidenceLevel: "విశ్వాస స్థాయి",
    recommendations: "సిఫార్సులు",
    listen: "సూచనను వినండి",
  },
  ta: {
    title: "AI சர்ஜ் கணிப்பு கருவி",
    description: "தேர்ந்தெடுக்கப்பட்ட நகரத்திற்கான நோயாளிகளின் எழுச்சி முன்னறிவிப்பை உருவாக்க மற்றும் செயல்படக்கூடிய பரிந்துரைகளைப் பெற பொத்தானைக் கிளிக் செய்யவும்.",
    generatePrediction: "க்கான கணிப்பை உருவாக்கு",
    analyzing: "AI தரவை பகுப்பாய்வு செய்கிறது... ദയവായി കാത്തിരിക്കുക.",
    predictionGenerated: "கணிப்பு உருவாக்கப்பட்டது",
    analysisComplete: "AI பகுப்பாய்வு முடிந்தது. கீழே உள்ள முடிவுகளைக் காண்க.",
    predictionFailed: "கணிப்பு தோல்வியுற்றது",
    predictedSurge: "கணிக்கப்பட்ட எழுச்சி",
    confidenceLevel: "நம்பிக்கை நிலை",
    recommendations: "பரிந்துரைகள்",
    listen: "கணிப்பைக் கேளுங்கள்",
  },
  sa: {
    title: "AI वृद्धि-पूर्वानुमान-साधनम्",
    description: "निर्दिष्टस्य नगरस्य कृते रोगी-वृद्धि-पूर्वानुमानं जनयितुं क्रियात्मकाः सूचनाः प्राप्तुं च नुदन्तु।",
    generatePrediction: "कृते पूर्वानुमानं जनयन्तु",
    analyzing: "AI आँकडान् विश्लेषयति... कृपया प्रतीक्षां कुर्वन्तु।",
    predictionGenerated: "पूर्वानुमानं जनितम्",
    analysisComplete: "AI विश्लेषणं सम्पन्नम्। अधः परिणामान् पश्यन्तु।",
    predictionFailed: "पूर्वानुमानं विफलम्",
    predictedSurge: "पूर्वानुमानिता वृद्धिः",
    confidenceLevel: "विश्वासस्तरः",
    recommendations: "अनुशंसाः",
    listen: "भविष्यवाणीं शृणोतु",
  },
};

export function SurgePredictionTool() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];
  const [prediction, setPrediction] = useState<GenerateSurgePredictionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleGeneratePrediction = async () => {
    setIsLoading(true);
    setPrediction(null);
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }

    const result = await getSurgePredictions({ city });
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

  const handleListen = () => {
    if (prediction && prediction.audio) {
      if (audioPlayer) {
        audioPlayer.pause();
        setAudioPlayer(null);
      }
      const audio = new Audio(prediction.audio);
      setAudioPlayer(audio);
      audio.play();
      audio.onended = () => setAudioPlayer(null);
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
        <div className='flex justify-center'>
            <Button onClick={handleGeneratePrediction} disabled={isLoading} size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
            {t.generatePrediction} {city}
            </Button>
        </div>
        
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary"/>
                    <CardTitle className="text-md font-medium">{t.recommendations}</CardTitle>
                 </div>
                 <Button onClick={handleListen} size="sm" variant="outline" disabled={!prediction.audio}>
                    <Volume2 className="mr-2 h-4 w-4" />
                    {t.listen}
                </Button>
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
