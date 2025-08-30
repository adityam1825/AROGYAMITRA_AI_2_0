'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Volume2, Loader2 } from 'lucide-react';
import { generateSpeech } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';

const advisories = {
  en: {
    title: "Health Advisory: High Pollution Levels",
    content: "Air quality is currently unhealthy. It is advised to stay indoors, use air purifiers, and wear N95 masks if you must go out. Elderly and children should take extra precautions. Stay hydrated.",
    listen: "Listen",
    header: "Health Advisories",
  },
  hi: {
    title: "स्वास्थ्य सलाह: उच्च प्रदूषण स्तर",
    content: "वायु की गुणवत्ता वर्तमान में अस्वस्थ है। घर के अंदर रहने, एयर प्यूरीफायर का उपयोग करने और यदि बाहर निकलना ही पड़े तो N95 मास्क पहनने की सलाह दी जाती है। बुजुर्गों और बच्चों को अतिरिक्त सावधानी बरतनी चाहिए। हाइड्रेटेड रहें।",
    listen: "सुनें",
    header: "स्वास्थ्य सलाह",
  },
  mr: {
    title: "आरोग्य सल्ला: उच्च प्रदूषण पातळी",
    content: "हवेची गुणवत्ता सध्या অস্বাস্থ্যकर आहे. घरातच राहण्याचा, एअर प्युरिफायर वापरण्याचा आणि बाहेर जाणे आवश्यक असल्यास N95 मास्क घालण्याचा सल्ला दिला जातो. वृद्ध आणि मुलांनी अतिरिक्त काळजी घ्यावी. हायड्रेटेड रहा.",
    listen: "ऐका",
    header: "आरोग्य सल्ला",
  },
  kn: {
    title: "ಆರೋಗ್ಯ ಸಲಹೆ: ಅಧಿಕ ಮಾಲಿನ್ಯ ಮಟ್ಟಗಳು",
    content: "ಪ್ರಸ್ತುತ ಗಾಳಿಯ ಗುಣಮಟ್ಟ ಅನಾರೋಗ್ಯಕರವಾಗಿದೆ. ಒಳಾಂಗಣದಲ್ಲಿ ಉಳಿಯಲು, ವಾಯು ಶುದ್ಧಿಕಾರಕಗಳನ್ನು ಬಳಸಲು ಮತ್ತು ಹೊರಗೆ ಹೋಗಬೇಕಾದರೆ N95 ಮುಖವಾಡಗಳನ್ನು ಧರಿಸಲು ಸಲಹೆ ನೀಡಲಾಗುತ್ತದೆ. ವೃದ್ಧರು ಮತ್ತು ಮಕ್ಕಳು ಹೆಚ್ಚುವರಿ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು. ಹೈಡ್ರೇಟೆಡ್ ಆಗಿರಿ.",
    listen: "ಕೇಳಿ",
    header: "ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
  },
  te: {
    title: "ఆరోగ్య సలహా: అధిక కాలుష్య స్థాయిలు",
    content: "ప్రస్తుతం గాలి నాణ్యత అనారోగ్యకరంగా ఉంది. ఇంట్లోనే ఉండాలని, ఎయిర్ ప్యూరిఫైయర్లను ఉపయోగించాలని, మరియు బయటకు వెళ్లాల్సి వస్తే N95 మాస్క్‌లు ధరించాలని సూచించబడింది. వృద్ధులు మరియు పిల్లలు అదనపు జాగ్రత్తలు తీసుకోవాలి. హైడ్రేటెడ్‌గా ఉండండి.",
    listen: "వినండి",
    header: "ఆరోగ్య సలహాలు",
  },
  ta: {
    title: "சுகாதார ஆலோசனை: உயர் மாசுபாடு அளவுகள்",
    content: "தற்போது காற்றின் தரம் ஆரோக்கியமற்றதாக உள்ளது. வீட்டிற்குள் இருக்கவும், காற்று சுத்திகரிப்பான்களைப் பயன்படுத்தவும், வெளியே செல்ல நேரிட்டால் N95 முகக்கவசங்களை அணியவும் அறிவுறுத்தப்படுகிறது. முதியவர்கள் மற்றும் குழந்தைகள் கூடுதல் முன்னெச்சரிக்கை நடவடிக்கைகளை எடுக்க வேண்டும். நீரேற்றத்துடன் இருங்கள்.",
    listen: "கேளுங்கள்",
    header: "சுகாதார ஆலோசனைகள்",
  },
  sa: {
    title: "स्वास्थ्य परामर्शः उच्चप्रदूषणस्तराः",
    content: "वायुगुणवत्ता वर्तमानकाले अस्वस्था वर्तते। अन्तः स्थातुं, वायुशोधकानां उपयोगं कर्तुं, बहिः गन्तव्यं चेत् N95 मुखावरणं धारयितुं च उपदिश्यते। वृद्धाः बालाः च अतिरिक्तां সাবধানतां गृह्णीयुः। जलयुक्ताः भवन्तु।",
    listen: "शृणोतु",
    header: "स्वास्थ्य परामर्शाः",
  },
};


export function HealthAdvisories() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const t = advisories[language];

  useEffect(() => {
    // Stop audio when language changes
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);


  const handleListen = async () => {
    setIsLoading(true);
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }
    
    const advisoryText = `${t.title}. ${t.content}`;

    const result = await generateSpeech({ text: advisoryText, language: language });
    setIsLoading(false);

    if (result.success && result.data) {
      const audio = new Audio(result.data.audio);
      setAudioPlayer(audio);
      audio.play();
      audio.onended = () => setAudioPlayer(null);
    } else {
      toast({
        variant: "destructive",
        title: "Audio Failed",
        description: result.error || "Could not generate audio for the advisory.",
      });
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-2'>
                <HeartPulse className="h-6 w-6 text-primary" />
                <CardTitle>{t.header}</CardTitle>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{t.title}</h3>
        <p className="text-sm text-muted-foreground">{t.content}</p>
         <Button onClick={handleListen} disabled={isLoading} size="sm" className="mt-4">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Volume2 className="mr-2 h-4 w-4" />
          )}
          {t.listen}
        </Button>
      </CardContent>
    </Card>
  );
}
