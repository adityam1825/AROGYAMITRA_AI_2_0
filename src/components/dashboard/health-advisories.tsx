
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Volume2, Loader2, Square, Zap } from 'lucide-react';
import { generateSpeech, getPersonalizedAdvisory } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import type { GeneratePersonalizedAdvisoryOutput } from '@/ai/flows/generate-personalized-advisory';

const content = {
  en: {
    header: "Real-Time Health Advisories",
    listen: "Listen",
    stop: "Stop",
    audioFailed: "Audio Failed",
    audioFailedDesc: "Could not generate audio for the advisory.",
    advisoryFailed: "Advisory Failed",
    generating: "Generating for",
  },
  hi: {
    header: "वास्तविक समय स्वास्थ्य सलाह",
    listen: "सुनें",
    stop: "रोकें",
    audioFailed: "ऑडियो विफल",
    audioFailedDesc: "सलाह के लिए ऑडियो उत्पन्न नहीं किया जा सका।",
    advisoryFailed: "सलाह विफल",
    generating: "के लिए उत्पन्न हो रहा है",
  },
  mr: {
    header: "रिअल-टाइम आरोग्य सल्ला",
    listen: "ऐका",
    stop: "थांबा",
    audioFailed: "ऑडिओ अयशस्वी",
    audioFailedDesc: "सल्ला देण्यासाठी ऑडिओ तयार करता आला नाही.",
    advisoryFailed: "सल्ला अयशस्वी",
    generating: "साठी तयार होत आहे",
  },
  kn: {
    header: "ನೈಜ-ಸಮಯದ ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    audioFailed: "ಆಡಿಯೋ ವಿಫಲವಾಗಿದೆ",
    audioFailedDesc: "ಸಲಹೆಗಾಗಿ ಆಡಿಯೊವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    advisoryFailed: "ಸಲಹೆ ವಿಫಲವಾಗಿದೆ",
    generating: "ಗಾಗಿ ರಚಿಸಲಾಗುತ್ತಿದೆ",
  },
  te: {
    header: "నిజ-సమయ ఆరోగ్య సలహాలు",
    listen: "వినండి",
    stop: "ఆపు",
    audioFailed: "ఆడియో విఫలమైంది",
    audioFailedDesc: "సలహా కోసం ఆడియోను రూపొందించలేకపోయింది.",
    advisoryFailed: "సలహా విఫలమైంది",
    generating: "కోసం ఉత్పత్తి చేస్తోంది",
  },
  ta: {
    header: "ನೈಜ-ಸಮಯದ ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    audioFailed: "ಆಡಿಯೋ ವಿಫಲವಾಗಿದೆ",
    audioFailedDesc: "ಸಲಹೆಗಾಗಿ ಆಡಿಯೊವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    advisoryFailed: "ಸಲಹೆ ವಿಫಲವಾಗಿದೆ",
    generating: "ಗಾಗಿ ರಚಿಸಲಾಗುತ್ತಿದೆ",
  },
  san: {
    header: "वास्तविकसमय-स्वास्थ्यपरामर्शाः",
    listen: "शृणोतु",
    stop: "विरामः",
    audioFailed: "श्रव्यं विफलम्",
    audioFailedDesc: "परामर्शार्थं श्रव्यं निर्मातुं न शक्तम्।",
    advisoryFailed: "परामर्शं विफलम्",
    generating: "कृते जनयन्",
  },
};


export function HealthAdvisories() {
  const { language } = useLanguage();
  const { city } = useCity();
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [advisory, setAdvisory] = useState<GeneratePersonalizedAdvisoryOutput | null>(null);
  const { toast } = useToast();
  
  const t = content[language];

  useEffect(() => {
    // Stop audio and clear state when language or city changes
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }
    setAdvisory(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, city]);
  
  const handleGenerateAdvisory = async () => {
    setIsLoading(true);
    setAdvisory(null);
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }

    const result = await getPersonalizedAdvisory({ city, language });

    if (result.success && result.data) {
        setAdvisory(result.data);
    } else {
        toast({
            variant: "destructive",
            title: t.advisoryFailed,
            description: result.error || "An unknown error occurred.",
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGenerateAdvisory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, language]);


  const handleListen = async () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
      return;
    }

    if (advisory?.audio) {
        const audio = new Audio(advisory.audio);
        setAudioPlayer(audio);
        audio.play();
        audio.onended = () => setAudioPlayer(null);
        return;
    }
    
    if (advisory) {
        setIsLoading(true);
        const textToSpeak = `${advisory.surgeAdvisory} ${advisory.aqiAdvisory} ${advisory.eventAdvisory}`;
        const speechResult = await generateSpeech({ text: textToSpeak, language });
        
        if (speechResult.success && speechResult.data) {
          setAdvisory(prev => prev ? {...prev, audio: speechResult.data.audio} : null);
          const audio = new Audio(speechResult.data.audio);
          setAudioPlayer(audio);
          audio.play();
          audio.onended = () => setAudioPlayer(null);
        } else {
          toast({
            variant: "destructive",
            title: t.audioFailed,
            description: speechResult.error || t.audioFailedDesc,
          });
        }
        setIsLoading(false);
    }
  };


  return (
    <Card className="interactive-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <HeartPulse className="h-6 w-6 text-primary" />
                <CardTitle>{t.header}</CardTitle>
            </div>
             <Button onClick={handleListen} disabled={isLoading || !advisory} size="sm" variant="outline">
              {isLoading && !advisory ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : audioPlayer ? (
                <Square className="mr-2 h-4 w-4" />
              ) : (
                <Volume2 className="mr-2 h-4 w-4" />
              )}
              {audioPlayer ? t.stop : t.listen}
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && !advisory && (
             <div className="flex items-center justify-center h-24">
                <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-sm text-muted-foreground">{t.generating} {city}...</p>
                </div>
            </div>
        )}
        {advisory && (
             <div className="space-y-2 text-sm text-muted-foreground">
                <p>• {advisory.surgeAdvisory}</p>
                <p>• {advisory.aqiAdvisory}</p>
                <p>• {advisory.eventAdvisory}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
