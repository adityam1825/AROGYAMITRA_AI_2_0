'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Volume2, Loader2 } from 'lucide-react';
import { generateSpeech } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";

const advisories = {
  en: {
    title: "Health Advisory: High Pollution Levels",
    content: "Air quality is currently unhealthy. It is advised to stay indoors, use air purifiers, and wear N95 masks if you must go out. Elderly and children should take extra precautions. Stay hydrated.",
  },
  mr: {
    title: "आरोग्य सल्ला: उच्च प्रदूषण पातळी",
    content: "हवेची गुणवत्ता सध्या অস্বাস্থ্যकर आहे. घरातच राहण्याचा, एअर प्युरिफायर वापरण्याचा आणि बाहेर जाणे आवश्यक असल्यास N95 मास्क घालण्याचा सल्ला दिला जातो. वृद्ध आणि मुलांनी अतिरिक्त काळजी घ्यावी. हायड्रेटेड रहा.",
  },
  hi: {
    title: "स्वास्थ्य सलाह: उच्च प्रदूषण स्तर",
    content: "वायु की गुणवत्ता वर्तमान में अस्वस्थ है। घर के अंदर रहने, एयर प्यूरीफायर का उपयोग करने और यदि बाहर निकलना ही पड़े तो N95 मास्क पहनने की सलाह दी जाती है। बुजुर्गों और बच्चों को अतिरिक्त सावधानी बरतनी चाहिए। हाइड्रेटेड रहें।",
  },
};

type Language = 'en' | 'mr' | 'hi';

export function HealthAdvisories() {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleListen = async () => {
    setIsLoading(true);
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }
    
    const advisoryText = `${advisories[language].title}. ${advisories[language].content}`;

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
                <CardTitle>Health Advisories</CardTitle>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-secondary p-1">
                <Button variant={language === 'en' ? 'default' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setLanguage('en')}>EN</Button>
                <Button variant={language === 'mr' ? 'default' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setLanguage('mr')}>MR</Button>
                <Button variant={language === 'hi' ? 'default' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setLanguage('hi')}>HI</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{advisories[language].title}</h3>
        <p className="text-sm text-muted-foreground">{advisories[language].content}</p>
         <Button onClick={handleListen} disabled={isLoading} size="sm" className="mt-4">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Volume2 className="mr-2 h-4 w-4" />
          )}
          Listen
        </Button>
      </CardContent>
    </Card>
  );
}
