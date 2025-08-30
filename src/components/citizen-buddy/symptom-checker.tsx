'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, MessageSquare, Loader2, Volume2, Sparkles } from 'lucide-react';
import { getSymptomGuidance } from '@/app/actions';
import type { SymptomCheckerOutput } from '@/ai/flows/symptom-checker-flow';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: "Symptom Checker",
    description: "Describe your symptoms to get basic AI-powered guidance. This is not a medical diagnosis.",
    placeholder: "e.g., I have a headache and a slight cough...",
    getGuidance: "Get AI Guidance",
    generating: "AI is analyzing your symptoms...",
    guidanceFailed: "Guidance Failed",
    aiGuidance: "AI Guidance",
    listen: "Listen",
  },
  hi: {
    title: "लक्षण परीक्षक",
    description: "बुनियादी एआई-संचालित मार्गदर्शन प्राप्त करने के लिए अपने लक्षणों का वर्णन करें। यह एक चिकित्सा निदान नहीं है।",
    placeholder: "जैसे, मुझे सिरदर्द और हल्की खांसी है...",
    getGuidance: "एआई मार्गदर्शन प्राप्त करें",
    generating: "एआई आपके लक्षणों का विश्लेषण कर रहा है...",
    guidanceFailed: "मार्गदर्शन विफल",
    aiGuidance: "एआई मार्गदर्शन",
    listen: "सुनें",
  },
  mr: {
    title: "लक्षण तपासक",
    description: "मूलभूत AI-शक्तीवर चालणारे मार्गदर्शन मिळवण्यासाठी तुमच्या लक्षणांचे वर्णन करा. हे वैद्यकीय निदान नाही.",
    placeholder: "उदा., मला डोकेदुखी आणि थोडा खोकला आहे...",
    getGuidance: "एआय मार्गदर्शन मिळवा",
    generating: "एआय तुमच्या लक्षणांचे विश्लेषण करत आहे...",
    guidanceFailed: "मार्गदर्शन अयशस्वी",
    aiGuidance: "एआय मार्गदर्शन",
    listen: "ऐका",
  },
  kn: {
    title: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷಕ",
    description: "ಮೂಲಭೂತ AI-ಚಾಲಿತ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ.",
    placeholder: "ಉದಾ., ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಸ್ವಲ್ಪ ಕೆಮ್ಮು ಇದೆ...",
    getGuidance: "ಎಐ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ",
    generating: "ಎಐ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
    guidanceFailed: "ಮಾರ್ಗದರ್ಶನ ವಿಫಲವಾಗಿದೆ",
    aiGuidance: "ಎಐ ಮಾರ್ಗದರ್ಶನ",
    listen: "ಆಲಿಸಿ",
  },
  te: {
    title: "లక్షణాల తనిఖీ",
    description: "ప్రాథమిక AI-ఆధారిత మార్గదర్శకత్వం పొందడానికి మీ లక్షణాలను వివరించండి. ఇది వైద్య నిర్ధారణ కాదు.",
    placeholder: "ఉదా., నాకు తలనొప్పి మరియు తేలికపాటి దగ్గు ఉంది...",
    getGuidance: "AI మార్గదర్శకత్వం పొందండి",
    generating: "AI మీ లక్షణాలను విశ్లేషిస్తోంది...",
    guidanceFailed: "మార్గదర్శకత్వం విఫలమైంది",
    aiGuidance: "AI మార్గదర్శకత్వం",
    listen: "వినండి",
  },
  ta: {
    title: "அறிகுறி சரிபார்ப்பு",
    description: "அடிப்படை AI-இயங்கும் வழிகாட்டுதலைப் பெற உங்கள் அறிகுறிகளை விவரிக்கவும். இது மருத்துவ निदानம் அல்ல.",
    placeholder: "எ.கா., எனக்கு தலைவலி மற்றும் லேசான இருமல் உள்ளது...",
    getGuidance: "AI வழிகாட்டுதலைப் பெறுங்கள்",
    generating: "AI உங்கள் அறிகுறிகளை பகுப்பாய்வு செய்கிறது...",
    guidanceFailed: "வழிகாட்டுதல் தோல்வியுற்றது",
    aiGuidance: "AI வழிகாட்டுதல்",
    listen: "கேளுங்கள்",
  },
  sa: {
    title: "लक्षणपरीक्षकः",
    description: "आधारभूतं AI-चालितं मार्गदर्शनं प्राप्तुं स्वस्य लक्षणानि वर्णयन्तु। एषः वैद्यकीयः निदानः नास्ति।",
    placeholder: "यथा, मम शिरोवेदना, अल्पः कासः च अस्ति...",
    getGuidance: "एआई मार्गदर्शनं प्राप्नुवन्तु",
    generating: "एआई भवतः लक्षणानि विश्लेषयति...",
    guidanceFailed: "मार्गदर्शनं विफलम्",
    aiGuidance: "एआई मार्गदर्शनम्",
    listen: "शृणोतु",
  },
};

export function SymptomChecker() {
  const { language } = useLanguage();
  const t = content[language];
  const [symptoms, setSymptoms] = useState('');
  const [guidance, setGuidance] = useState<SymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleGetGuidance = async () => {
    if (!symptoms.trim()) return;
    setIsLoading(true);
    setGuidance(null);
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }

    const result = await getSymptomGuidance({ symptoms, language });
    setIsLoading(false);

    if (result.success && result.data) {
      setGuidance(result.data);
    } else {
      console.error(result.error);
       toast({
        variant: "destructive",
        title: t.guidanceFailed,
        description: result.error || "An unknown error occurred.",
      })
    }
  };
  
  const handleListen = () => {
    if (guidance && guidance.audio) {
      if (audioPlayer) {
        audioPlayer.pause();
        setAudioPlayer(null);
      }
      const audio = new Audio(guidance.audio);
      setAudioPlayer(audio);
      audio.play();
      audio.onended = () => setAudioPlayer(null);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          placeholder={t.placeholder}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows={4}
          disabled={isLoading}
        />
        <Button onClick={handleGetGuidance} disabled={isLoading || !symptoms.trim()} className='w-full'>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {t.getGuidance}
        </Button>
        
        {isLoading && (
            <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-xs text-muted-foreground">{t.generating}</p>
                </div>
            </div>
        )}

        {guidance && (
          <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-2'>
                        <Bot className="h-5 w-5" />
                        <CardTitle className="text-lg">{t.aiGuidance}</CardTitle>
                    </div>
                     <Button onClick={handleListen} size="sm" variant="outline" disabled={!guidance.audio || !!audioPlayer}>
                        <Volume2 className="mr-2 h-4 w-4" />
                        {t.listen}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{guidance.guidance}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
