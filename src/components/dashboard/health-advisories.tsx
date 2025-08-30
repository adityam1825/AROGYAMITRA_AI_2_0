'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Volume2, Loader2, Square } from 'lucide-react';
import { generateSpeech } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';
import { isSameDay, format } from 'date-fns';

const getAdvisories = (language: keyof typeof content, date: Date) => {
    const t = content[language];
    const festivals = [
      { date: new Date(2024, 8, 7), name: 'Ganesh Chaturthi' },
      { date: new Date(2024, 10, 1), name: 'Diwali' },
    ];
    const festival = festivals.find(f => isSameDay(f.date, date));
    if (festival) {
        return {
            title: t.festivalTitle,
            content: t.festivalContent,
        }
    }

    if (date.getMonth() >= 5 && date.getMonth() <= 8) { // Monsoon season
        return {
            title: t.monsoonTitle,
            content: t.monsoonContent,
        }
    }
    
    return {
        title: t.pollutionTitle,
        content: t.pollutionContent,
    }
}

const content = {
  en: {
    header: "Health Advisories",
    pollutionTitle: "High Pollution Levels",
    pollutionContent: "Air quality is currently unhealthy. It is advised to stay indoors, use air purifiers, and wear N95 masks if you must go out. Stay hydrated.",
    monsoonTitle: "Monsoon Health Advisory",
    monsoonContent: "Increased risk of water-borne diseases. Drink boiled water and avoid street food. Keep your surroundings clean to prevent mosquito breeding.",
    festivalTitle: "Festival Health Advisory",
    festivalContent: "Large crowds can increase the risk of infections. Wear a mask in crowded places, wash hands frequently, and stay home if you feel unwell.",
    listen: "Listen",
    stop: "Stop",
  },
  hi: {
    header: "स्वास्थ्य सलाह",
    pollutionTitle: "उच्च प्रदूषण स्तर",
    pollutionContent: "वायु की गुणवत्ता वर्तमान में अस्वस्थ है। घर के अंदर रहने, एयर प्यूरीफायर का उपयोग करने और N95 मास्क पहनने की सलाह दी जाती है।",
    monsoonTitle: "मानसून स्वास्थ्य सलाह",
    monsoonContent: "जल जनित रोगों का खतरा बढ़ गया है। उबला हुआ पानी पिएं और स्ट्रीट फूड से बचें। मच्छरों के प्रजनन को रोकने के लिए अपने आस-पास सफाई रखें।",
    festivalTitle: "त्योहार स्वास्थ्य सलाह",
    festivalContent: "बड़ी भीड़ से संक्रमण का खतरा बढ़ सकता है। भीड़-भाड़ वाली जगहों पर मास्क पहनें, बार-बार हाथ धोएं और अस्वस्थ महसूस होने पर घर पर रहें।",
    listen: "सुनें",
    stop: "रोकें",
  },
  mr: {
    header: "आरोग्य सल्ला",
    pollutionTitle: "उच्च प्रदूषण पातळी",
    pollutionContent: "हवेची गुणवत्ता सध्या অস্বাস্থ্যकर आहे. घरातच राहण्याचा, एअर प्युरिफायर वापरण्याचा आणि N95 मास्क घालण्याचा सल्ला दिला जातो.",
    monsoonTitle: "मान्सून आरोग्य सल्ला",
    monsoonContent: "पाण्यामुळे होणाऱ्या आजारांचा धोका वाढला आहे. उकळलेले पाणी प्या आणि रस्त्यावरील खाद्यपदार्थ टाळा. डासांची पैदास रोखण्यासाठी आपला परिसर स्वच्छ ठेवा.",
    festivalTitle: "सणासुदीचा आरोग्य सल्ला",
    festivalContent: "गर्दीमुळे संसर्गाचा धोका वाढू शकतो. गर्दीच्या ठिकाणी मास्क घाला, वारंवार हात धुवा आणि बरे वाटत नसल्यास घरीच थांबा.",
    listen: "ऐका",
    stop: "थांबा",
  },
  kn: {
    header: "ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
    pollutionTitle: "ಅಧಿಕ ಮಾಲಿನ್ಯ ಮಟ್ಟಗಳು",
    pollutionContent: "ಪ್ರಸ್ತುತ ಗಾಳಿಯ ಗುಣಮಟ್ಟ ಅನಾರೋಗ್ಯಕರವಾಗಿದೆ. ಒಳಾಂಗಣದಲ್ಲಿ ಉಳಿಯಲು, ವಾಯು ಶುದ್ಧಿಕಾರಕಗಳನ್ನು ಬಳಸಲು ಮತ್ತು N95 ಮುಖವಾಡಗಳನ್ನು ಧರಿಸಲು ಸಲಹೆ ನೀಡಲಾಗುತ್ತದೆ.",
    monsoonTitle: "ಮಾನ್ಸೂನ್ ಆರೋಗ್ಯ ಸಲಹೆ",
    monsoonContent: "ನೀರಿನಿಂದ ಹರಡುವ ರೋಗಗಳ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ. ಕುದಿಸಿದ ನೀರನ್ನು ಕುಡಿಯಿರಿ ಮತ್ತು ಬೀದಿ ಆಹಾರವನ್ನು ತಪ್ಪಿಸಿ. ಸೊಳ್ಳೆಗಳ ಸಂತಾನೋತ್ಪತ್ತಿಯನ್ನು ತಡೆಯಲು ನಿಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ಪ್ರದೇಶವನ್ನು ಸ್ವಚ್ಛವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.",
    festivalTitle: "ಹಬ್ಬದ ಆರೋಗ್ಯ ಸಲಹೆ",
    festivalContent: "ಜನಸಂದಣಿಯು ಸೋಂಕಿನ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸಬಹುದು. ಜನನಿಬಿಡ ಸ್ಥಳಗಳಲ್ಲಿ ಮಾಸ್ಕ್ ಧರಿಸಿ, ಆಗಾಗ್ಗೆ ಕೈ ತೊಳೆಯಿರಿ ಮತ್ತು ಅಸ್ವಸ್ಥತೆ ಎನಿಸಿದರೆ ಮನೆಯಲ್ಲೇ ಇರಿ.",
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
  },
  te: {
    header: "ఆరోగ్య సలహాలు",
    pollutionTitle: "అధిక కాలుష్య స్థాయిలు",
    pollutionContent: "ప్రస్తుతం గాలి నాణ్యత అనారోగ్యకరంగా ఉంది. ఇంట్లోనే ఉండాలని, ఎయిర్ ప్యూరిఫైయర్లను ఉపయోగించాలని, మరియు N95 మాస్క్‌లు ధరించాలని సూచించబడింది.",
    monsoonTitle: "రుతుపవనాల ఆరోగ్య సలహా",
    monsoonContent: "నీటి ద్వారా సంక్రమించే వ్యాధుల ప్రమాదం పెరిగింది. కాచిన నీటిని తాగండి మరియు వీధి ఆహారాన్ని నివారించండి. దోమల ఉత్పత్తిని నివారించడానికి మీ పరిసరాలను శుభ్రంగా ఉంచుకోండి.",
    festivalTitle: "పండుగ ఆరోగ్య సలహా",
    festivalContent: "పెద్ద సమూహాలు అంటువ్యాధుల ప్రమాదాన్ని పెంచుతాయి. రద్దీగా ఉండే ప్రదేశాలలో మాస్క్ ధరించండి, తరచుగా చేతులు కడుక్కోండి మరియు అనారోగ్యంగా అనిపిస్తే ఇంట్లోనే ఉండండి.",
    listen: "వినండి",
    stop: "ఆపు",
  },
  ta: {
    header: "சுகாதார ஆலோசனைகள்",
    pollutionTitle: "உயர் மாசுபாடு அளவுகள்",
    pollutionContent: "தற்போது காற்றின் தரம் ஆரோக்கியமற்றதாக உள்ளது. வீட்டிற்குள் இருக்கவும், காற்று சுத்திகரிப்பான்களைப் பயன்படுத்தவும், N95 முகக்கவசங்களை அணியவும் அறிவுறுத்தப்படுகிறது.",
    monsoonTitle: "பருவமழை சுகாதார ஆலோசனை",
    monsoonContent: "நீரினால் பரவும் நோய்களின் ஆபத்து அதிகரித்துள்ளது. கொதிக்க வைத்த நீரைக் குடிக்கவும், தெரு உணவைத் தவிர்க்கவும். கொசுக்கள் பெருகாமல் இருக்க உங்கள் சுற்றுப்புறத்தை சுத்தமாக வைத்திருங்கள்.",
    festivalTitle: "பண்டிகை சுகாதார ஆலோசனை",
    festivalContent: "அதிக கூட்டம் நோய்த்தொற்றுகளின் அபாயத்தை அதிகரிக்கும். கூட்டமான இடங்களில் முகக்கவசம் அணியுங்கள், அடிக்கடி கைகளைக் கழுவுங்கள், உடல்நிலை சரியில்லாமல் இருந்தால் வீட்டிலேயே இருங்கள்.",
    listen: "கேளுங்கள்",
    stop: "நிறுத்து",
  },
  sa: {
    header: "स्वास्थ्य परामर्शाः",
    pollutionTitle: "उच्चप्रदूषणस्तराः",
    pollutionContent: "वायुगुणवत्ता वर्तमानकाले अस्वस्था वर्तते। अन्तः स्थातुं, वायुशोधकानां उपयोगं कर्तुं, N95 मुखावरणं धारयितुं च उपदिश्यते।",
    monsoonTitle: "वर्षाकालीनस्वास्थ्यपरामर्शः",
    monsoonContent: "जलोद्भवरोगाणां आपत् वर्धिता अस्ति। क्वथितं जलं पिबन्तु, वीथिभोजनं च त्यजन्तु। मशकानां प्रजननं निवारयितुं स्वपरिसरं स्वच्छं रक्षन्तु।",
    festivalTitle: "उत्सवस्वास्थ्यपरामर्शः",
    festivalContent: "बृहत् जनसमूहः संक्रमणस्य आपत् वर्धयितुं शक्नोति। जनसंकुलस्थानेषु मुखावरणं धारयन्तु, मुहुर्मुहुः हस्तौ प्रक्षालयन्तु, अस्वस्थतायां च गृहे एव तिष्ठन्तु।",
    listen: "शृणोतु",
    stop: "विरामः",
  },
};


export function HealthAdvisories({ selectedDate }: { selectedDate: Date }) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  const advisory = getAdvisories(language, selectedDate);
  const t = content[language];

  useEffect(() => {
    // Stop audio when language or date changes
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, selectedDate]);


  const handleListen = async () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
      return;
    }
    
    setIsLoading(true);
    
    const advisoryText = `${advisory.title}. ${advisory.content}`;

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
            <div className="text-sm text-muted-foreground">{format(selectedDate, 'MMMM d')}</div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{advisory.title}</h3>
        <p className="text-sm text-muted-foreground">{advisory.content}</p>
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
