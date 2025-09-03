
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Volume2, Loader2, Square } from 'lucide-react';
import { generateSpeech } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    header: "Health Advisories",
    title: "High Pollution & Festival Season",
    content: "Air quality is currently unhealthy. Combined with large festival crowds, there is an increased risk of respiratory issues. Advise vulnerable patients to stay indoors and wear masks in public.",
    listen: "Listen",
    stop: "Stop",
    audioFailed: "Audio Failed",
    audioFailedDesc: "Could not generate audio for the advisory.",
  },
  hi: {
    header: "स्वास्थ्य सलाह",
    title: "उच्च प्रदूषण और त्योहारों का मौसम",
    content: "वायु की गुणवत्ता वर्तमान में अस्वस्थ है। बड़े त्योहारों की भीड़ के साथ, श्वसन संबंधी समस्याओं का खतरा बढ़ जाता है। कमजोर रोगियों को घर के अंदर रहने और सार्वजनिक रूप से मास्क पहनने की सलाह दें।",
    listen: "सुनें",
    stop: "रोकें",
    audioFailed: "ऑडियो विफल",
    audioFailedDesc: "सलाह के लिए ऑडियो उत्पन्न नहीं किया जा सका।",
  },
  mr: {
    header: "आरोग्य सल्ला",
    title: "उच्च प्रदूषण आणि सणांचा हंगाम",
    content: "हवेची गुणवत्ता सध्या অস্বাস্থ্যकर आहे. मोठ्या सणांच्या गर्दीमुळे श्वसनाच्या समस्यांचा धोका वाढतो. असुरक्षित रुग्णांना घरातच राहण्याचा आणि सार्वजनिक ठिकाणी मास्क घालण्याचा सल्ला द्या.",
    listen: "ऐका",
    stop: "थांबा",
    audioFailed: "ऑडिओ अयशस्वी",
    audioFailedDesc: "सल्ला देण्यासाठी ऑडिओ तयार करता आला नाही.",
  },
  kn: {
    header: "ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
    title: "ಅಧಿಕ ಮಾಲಿನ್ಯ ಮತ್ತು ಹಬ್ಬದ ಋತು",
    content: "ಪ್ರಸ್ತುತ ಗಾಳಿಯ ಗುಣಮಟ್ಟ ಅನಾರೋಗ್ಯಕರವಾಗಿದೆ. ದೊಡ್ಡ ಹಬ್ಬದ ಜನಸಂದಣಿಯೊಂದಿಗೆ, ಉಸಿರಾಟದ ಸಮಸ್ಯೆಗಳ ಅಪಾಯ ಹೆಚ್ಚಾಗುತ್ತದೆ. ದುರ್ಬಲ ರೋಗಿಗಳಿಗೆ ಮನೆಯೊಳಗೆ ಉಳಿಯಲು ಮತ್ತು ಸಾರ್ವಜನಿಕವಾಗಿ ಮಾಸ್ಕ್ ಧರಿಸಲು ಸಲಹೆ ನೀಡಿ.",
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    audioFailed: "ಆಡಿಯೋ ವಿಫಲವಾಗಿದೆ",
    audioFailedDesc: "ಸಲಹೆಗಾಗಿ ಆಡಿಯೊವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
  },
  te: {
    header: "ఆరోగ్య సలహాలు",
    title: "అధిక కాలుష్యం & పండుగ కాలం",
    content: "ప్రస్తుతం గాలి నాణ్యత అనారోగ్యకరంగా ఉంది. పెద్ద పండుగ జనసమూహాలతో కలిపి, శ్వాసకోశ సమస్యల ప్రమాదం పెరుగుతుంది. బలహీనమైన రోగులకు ఇంట్లోనే ఉండాలని మరియు బహిరంగ ప్రదేశాల్లో మాస్క్‌లు ధరించాలని సలహా ఇవ్వండి.",
    listen: "వినండి",
    stop: "ఆపు",
    audioFailed: "ఆడియో విఫలమైంది",
    audioFailedDesc: "సలహా కోసం ఆడియోను రూపొందించలేకపోయింది.",
  },
  ta: {
    header: "சுகாதார ஆலோசனைகள்",
    title: "உயர் மாசுபாடு மற்றும் பண்டிகை காலம்",
    content: "தற்போது காற்றின் தரம் ஆரோக்கியமற்றதாக உள்ளது. பெரிய பண்டிகை கூட்டங்களுடன் சேர்ந்து, சுவாச பிரச்சனைகளின் ஆபத்து அதிகரிக்கிறது. பாதிக்கப்படக்கூடிய நோயாளிகளுக்கு வீட்டிற்குள் இருக்கவும், பொது இடங்களில் முகக்கவசம் அணியவும் அறிவுரை வழங்கவும்.",
    listen: "கேளுங்கள்",
    stop: "நிறுத்து",
    audioFailed: "ஆடியோ தோல்வியுற்றது",
    audioFailedDesc: "ஆலோசனைக்கு ஆடியோவை உருவாக்க முடியவில்லை.",
  },
  san: {
    header: "स्वास्थ्य परामर्शाः",
    title: "उच्चप्रदूषणं उत्सवकालं च",
    content: "वायुगुणवत्ता वर्तमानकाले अस्वस्था वर्तते। बृहत् उत्सवजनसमूहैः सह श्वसनसमस्यानां आपत् वर्धते। दुर्बलेभ्यः रोगिभ्यः अन्तः स्थातुं, सार्वजनिकस्थानेषु च मुखावरणं धारयितुं उपदिशन्तु।",
    listen: "शृणोतु",
    stop: "विरामः",
    audioFailed: "श्रव्यं विफलम्",
    audioFailedDesc: "परामर्शार्थं श्रव्यं निर्मातुं न शक्तम्।",
  },
};


export function HealthAdvisories() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const { toast } = useToast();
  
  const t = content[language];

  useEffect(() => {
    // Stop audio and clear cache when language changes
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }
    setAudioDataUri(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);


  const handleListen = async () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
      return;
    }

    if (audioDataUri) {
        const audio = new Audio(audioDataUri);
        setAudioPlayer(audio);
        audio.play();
        audio.onended = () => setAudioPlayer(null);
        return;
    }
    
    setIsLoading(true);
    
    const advisoryText = `${t.title}. ${t.content}`;

    const result = await generateSpeech({ text: advisoryText, language: language });

    if (result.success && result.data) {
      setAudioDataUri(result.data.audio);
      const audio = new Audio(result.data.audio);
      setAudioPlayer(audio);
      audio.play();
      audio.onended = () => setAudioPlayer(null);
    } else {
      toast({
        variant: "destructive",
        title: t.audioFailed,
        description: result.error || t.audioFailedDesc,
      });
    }
    setIsLoading(false);
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <CardTitle>{t.header}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{t.title}</h3>
        <p className="text-sm text-muted-foreground">{t.content}</p>
         <Button onClick={handleListen} disabled={isLoading} size="sm" className="mt-4">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : audioPlayer ? (
            <Square className="mr-2 h-4 w-4" />
          ) : (
            <Volume2 className="mr-2 h-4 w-4" />
          )}
          {audioPlayer ? t.stop : t.listen}
        </Button>
      </CardContent>
    </Card>
  );
}
