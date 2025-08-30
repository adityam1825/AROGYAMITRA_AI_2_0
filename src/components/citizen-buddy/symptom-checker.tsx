'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, MessageSquare, Loader2, Volume2, Sparkles, AlertTriangle, Pill, Link as LinkIcon } from 'lucide-react';
import { getSymptomGuidance } from '@/app/actions';
import type { SymptomCheckerOutput } from '@/ai/flows/symptom-checker-flow';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';


const content = {
  en: {
    title: "Symptom Checker",
    description: "Describe your symptoms to get basic AI-powered guidance. This is not a medical diagnosis.",
    symptomsPlaceholder: "e.g., I have a headache and a slight cough...",
    ageLabel: "Your Age (Optional)",
    agePlaceholder: "e.g., 34",
    getGuidance: "Get AI Guidance",
    generating: "AI is analyzing your symptoms...",
    guidanceFailed: "Guidance Failed",
    aiGuidance: "AI Guidance",
    medicationSuggestions: "Medication Suggestions",
    shopOnline: "Shop for Medicines Online",
    listen: "Listen",
  },
  hi: {
    title: "लक्षण परीक्षक",
    description: "बुनियादी एआई-संचालित मार्गदर्शन प्राप्त करने के लिए अपने लक्षणों का वर्णन करें। यह एक चिकित्सा निदान नहीं है।",
    symptomsPlaceholder: "जैसे, मुझे सिरदर्द और हल्की खांसी है...",
    ageLabel: "आपकी उम्र (वैकल्पिक)",
    agePlaceholder: "जैसे, 34",
    getGuidance: "एआई मार्गदर्शन प्राप्त करें",
    generating: "एआई आपके लक्षणों का विश्लेषण कर रहा है...",
    guidanceFailed: "मार्गदर्शन विफल",
    aiGuidance: "एआई मार्गदर्शन",
    medicationSuggestions: "दवा सुझाव",
    shopOnline: "दवाएं ऑनलाइन खरीदें",
    listen: "सुनें",
  },
  mr: {
    title: "लक्षण तपासक",
    description: "मूलभूत AI-शक्तीवर चालणारे मार्गदर्शन मिळवण्यासाठी तुमच्या लक्षणांचे वर्णन करा. हे वैद्यकीय निदान नाही.",
    symptomsPlaceholder: "उदा., मला डोकेदुखी आणि थोडा खोकला आहे...",
    ageLabel: "तुमचे वय (पर्यायी)",
    agePlaceholder: "उदा., 34",
    getGuidance: "एआय मार्गदर्शन मिळवा",
    generating: "एआय तुमच्या लक्षणांचे विश्लेषण करत आहे...",
    guidanceFailed: "मार्गदर्शन अयशस्वी",
    aiGuidance: "एआय मार्गदर्शन",
    medicationSuggestions: "औषध सूचना",
    shopOnline: "औषधे ऑनलाइन खरेदी करा",
    listen: "ऐका",
  },
  kn: {
    title: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷಕ",
    description: "ಮೂಲಭೂತ AI-ಚಾಲಿತ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ.",
    symptomsPlaceholder: "ಉದಾ., ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಸ್ವಲ್ಪ ಕೆಮ್ಮು ಇದೆ...",
    ageLabel: "ನಿಮ್ಮ ವಯಸ್ಸು (ಐಚ್ಛಿಕ)",
    agePlaceholder: "ಉದಾ., 34",
    getGuidance: "ಎಐ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ",
    generating: "ಎಐ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
    guidanceFailed: "ಮಾರ್ಗದರ್ಶನ ವಿಫಲವಾಗಿದೆ",
    aiGuidance: "ಎಐ ಮಾರ್ಗದರ್ಶನ",
    medicationSuggestions: "ಔಷಧಿ ಸಲಹೆಗಳು",
    shopOnline: "ಔಷಧಿಗಳನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಖರೀದಿಸಿ",
    listen: "ಆಲಿಸಿ",
  },
  te: {
    title: "లక్షణాల తనిఖీ",
    description: "ప్రాథమిక AI-ఆధారిత మార్గదర్శకత్వం పొందడానికి మీ లక్షణాలను వివరించండి. ఇది వైద్య నిర్ధారణ కాదు.",
    symptomsPlaceholder: "ఉదా., నాకు తలనొప్పి మరియు తేలికపాటి దగ్గు ఉంది...",
    ageLabel: "మీ వయస్సు (ఐచ్ఛికం)",
    agePlaceholder: "ఉదా., 34",
    getGuidance: "AI మార్గదర్శకత్వం పొందండి",
    generating: "AI మీ లక్షణాలను విశ్లేషిస్తోంది...",
    guidanceFailed: "మార్గదర్శకత్వం విఫలమైంది",
    aiGuidance: "AI మార్గదర్శకత్వం",
    medicationSuggestions: "మందుల సూచనలు",
    shopOnline: "మందులను ఆన్‌లైన్‌లో కొనండి",
    listen: "వినండి",
  },
  ta: {
    title: "அறிகுறி சரிபார்ப்பு",
    description: "அடிப்படை AI-இயங்கும் வழிகாட்டுதலைப் பெற உங்கள் அறிகுறிகளை விவரிக்கவும். இது மருத்துவ निदानம் அல்ல.",
    symptomsPlaceholder: "எ.கா., எனக்கு தலைவலி மற்றும் லேசான இருமல் உள்ளது...",
    ageLabel: "உங்கள் வயது (விருப்ப)",
    agePlaceholder: "எ.கா., 34",
    getGuidance: "AI வழிகாட்டுதலைப் பெறுங்கள்",
    generating: "AI உங்கள் அறிகுறிகளை பகுப்பாய்வு செய்கிறது...",
    guidanceFailed: "வழிகாட்டுதல் தோல்வியுற்றது",
    aiGuidance: "AI வழிகாட்டுதல்",
    medicationSuggestions: "மருந்து பரிந்துரைகள்",
    shopOnline: "ஆன்லைனில் மருந்துகளை வாங்கவும்",
    listen: "கேளுங்கள்",
  },
  sa: {
    title: "लक्षणपरीक्षकः",
    description: "आधारभूतं AI-चालितं मार्गदर्शनं प्राप्तुं स्वस्य लक्षणानि वर्णयन्तु। एषः वैद्यकीयः निदानः नास्ति।",
    symptomsPlaceholder: "यथा, मम शिरोवेदना, अल्पः कासः च अस्ति...",
    ageLabel: "भवतः वयः (वैकल्पिकम्)",
    agePlaceholder: "यथा, ३४",
    getGuidance: "एआई मार्गदर्शनं प्राप्नुवन्तु",
    generating: "एआई भवतः लक्षणानि विश्लेषयति...",
    guidanceFailed: "मार्गदर्शनं विफलम्",
    aiGuidance: "एआई मार्गदर्शनम्",
    medicationSuggestions: "औषध-सूचनाः",
    shopOnline: "औषधानि जालतः क्रीणन्तु",
    listen: "शृणोतु",
  },
};

export function SymptomChecker() {
  const { language } = useLanguage();
  const t = content[language];
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
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

    const result = await getSymptomGuidance({ 
        symptoms, 
        language,
        age: age ? parseInt(age, 10) : undefined,
    });
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
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className="md:col-span-3 space-y-2">
                <Label htmlFor="symptoms">{t.symptomsPlaceholder}</Label>
                <Textarea 
                id="symptoms"
                placeholder={t.symptomsPlaceholder}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                disabled={isLoading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="age">{t.ageLabel}</Label>
                <Input
                id="age"
                type="number"
                placeholder={t.agePlaceholder}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={isLoading}
                />
            </div>
        </div>
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
          <div className="space-y-4">
             <div className="flex items-center justify-end">
                <Button onClick={handleListen} size="sm" variant="outline" disabled={!guidance.audio || !!audioPlayer}>
                    <Volume2 className="mr-2 h-4 w-4" />
                    {t.listen}
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <Bot className="h-5 w-5" />
                        <CardTitle className="text-lg">{t.aiGuidance}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{guidance.guidance}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <Pill className="h-5 w-5" />
                        <CardTitle className="text-lg">{t.medicationSuggestions}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className="text-sm">{guidance.medicationSuggestions}</p>
                    <Button asChild className='w-full'>
                        <Link href={`https://www.1mg.com/search/all?name=${guidance.medicationSearchQuery}`} target="_blank" rel="noopener noreferrer">
                            <LinkIcon className="mr-2 h-4 w-4" />
                            {t.shopOnline}
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Disclaimer</AlertTitle>
              <AlertDescription>
                {guidance.disclaimer}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
