
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Loader2, Volume2, HeartPulse, Wind, Calendar, Square } from 'lucide-react';
import { getPersonalizedAdvisory, generateSpeech } from '@/app/actions';
import type { GeneratePersonalizedAdvisoryOutput } from '@/ai/flows/generate-personalized-advisory';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';

const content = {
  en: {
    title: "Personalized Health Advisories",
    description: "AI-powered health tips based on real-time conditions in your city.",
    generateAdvisory: "Get My Health Advisory for",
    generating: "AI is generating your advisory... Please wait.",
    advisoryGenerated: "Advisory Generated",
    analysisComplete: "AI analysis complete. See results below.",
    advisoryFailed: "Advisory Failed",
    surgeAdvisory: "Hospital Surge Advisory",
    aqiAdvisory: "Air Quality Advisory",
    eventAdvisory: "Public Event Advisory",
    listen: "Listen to Advisory",
    stop: "Stop",
    audioGenerationFailed: "Audio Generation Failed",
  },
  hi: {
    title: "व्यक्तिगत स्वास्थ्य सलाह",
    description: "आपके शहर की वास्तविक समय की स्थितियों के आधार पर एआई-संचालित स्वास्थ्य युक्तियाँ।",
    generateAdvisory: "के लिए मेरी स्वास्थ्य सलाह प्राप्त करें",
    generating: "एआई आपकी सलाह तैयार कर रहा है... कृपया प्रतीक्षा करें।",
    advisoryGenerated: "सलाह उत्पन्न हुई",
    analysisComplete: "एआई विश्लेषण पूरा हुआ। नीचे परिणाम देखें।",
    advisoryFailed: "सलाह विफल",
    surgeAdvisory: "अस्पताल वृद्धि सलाह",
    aqiAdvisory: "वायु गुणवत्ता सलाह",
    eventAdvisory: "सार्वजनिक कार्यक्रम सलाह",
    listen: "सलाह सुनें",
    stop: "रोकें",
    audioGenerationFailed: "ऑडियो जनरेशन विफल",
  },
  mr: {
    title: "वैयक्तिकृत आरोग्य सल्ला",
    description: "तुमच्या शहरातील वास्तविक परिस्थितीवर आधारित AI-शक्तीवर चालणाऱ्या आरोग्य टिप्स.",
    generateAdvisory: "साठी माझा आरोग्य सल्ला मिळवा",
    generating: "AI तुमचा सल्ला तयार करत आहे... कृपया प्रतीक्षा करा.",
    advisoryGenerated: "सल्ला तयार झाला",
    analysisComplete: "AI विश्लेषण पूर्ण झाले. खाली निकाल पहा.",
    advisoryFailed: "सल्ला अयशस्वी",
    surgeAdvisory: "रुग्णालय वाढीचा सल्ला",
    aqiAdvisory: "वायू गुणवत्ता सल्ला",
    eventAdvisory: "सार्वजनिक कार्यक्रम सल्ला",
    listen: "सल्ला ऐका",
    stop: "थांबा",
    audioGenerationFailed: "ऑडिओ निर्मिती अयशस्वी",
  },
  kn: {
    title: "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
    description: "ನಿಮ್ಮ ನಗರದ ನೈಜ-ಸಮಯದ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ AI-ಚಾಲಿತ ಆರೋಗ್ಯ ಸಲಹೆಗಳು.",
    generateAdvisory: "ಗಾಗಿ ನನ್ನ ಆರೋಗ್ಯ ಸಲಹೆಯನ್ನು ಪಡೆಯಿರಿ",
    generating: "AI ನಿಮ್ಮ ಸಲಹೆಯನ್ನು ರಚಿಸುತ್ತಿದೆ... ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ.",
    advisoryGenerated: "ಸಲಹೆ ರಚಿಸಲಾಗಿದೆ",
    analysisComplete: "AI ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ಕೆಳಗೆ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ.",
    advisoryFailed: "ಸಲಹೆ ವಿಫಲವಾಗಿದೆ",
    surgeAdvisory: "ಆಸ್ಪತ್ರೆ ಸರ್ಜ್ ಸಲಹೆ",
    aqiAdvisory: "ವಾಯು ಗುಣಮಟ್ಟ ಸಲಹೆ",
    eventAdvisory: "ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮ ಸಲಹೆ",
    listen: "ಸಲಹೆಯನ್ನು ಆಲಿಸಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    audioGenerationFailed: "ಆಡಿಯೋ ಉತ್ಪಾದನೆ ವಿಫಲವಾಗಿದೆ",
    },
  te: {
    title: "వ్యక్తిగతీకరించిన ఆరోగ్య సలహాలు",
    description: "మీ నగరంలోని వాస్తవ-సమయ పరిస్థితుల ఆధారంగా AI-ఆధారిత ఆరోగ్య చిట్కాలు.",
    generateAdvisory: "కోసం నా ఆరోగ్య సలహాను పొందండి",
    generating: "AI మీ సలహాను రూపొందిస్తోంది... దయచేసి వేచి ఉండండి.",
    advisoryGenerated: "సలహా రూపొందించబడింది",
    analysisComplete: "AI విశ్లేషణ పూర్తయింది. క్రింద ఫలితాలను చూడండి.",
    advisoryFailed: "సలహా విఫలమైంది",
    surgeAdvisory: "హాస్పిటల్ సర్జ్ అడ్వైజరీ",
    aqiAdvisory: "గాలి నాణ్యత సలహా",
    eventAdvisory: "ప్రజా కార్యక్రమ సలహా",
    listen: "సలహాను వినండి",
    stop: "ఆపు",
    audioGenerationFailed: "ఆడియో జనరేషన్ విఫలమైంది",
  },
  ta: {
    title: "தனிப்பயனாக்கப்பட்ட சுகாதார ஆலோசனைகள்",
    description: "உங்கள் நகரத்தில் நிகழ்நேர நிலைமைகளின் அடிப்படையில் AI-இயங்கும் சுகாதார குறிப்புகள்.",
    generateAdvisory: "க்கான எனது சுகாதார ஆலோசனையைப் பெறுங்கள்",
    generating: "AI உங்கள் ஆலோசனையை உருவாக்குகிறது... ദയവായി കാത്തിരിക്കുക.",
    advisoryGenerated: "ஆலோசனை உருவாக்கப்பட்டது",
    analysisComplete: "AI பகுப்பாய்வு முடிந்தது. கீழே உள்ள முடிவுகளைக் காண்க.",
    advisoryFailed: "ஆலோசனை தோல்வியுற்றது",
    surgeAdvisory: "மருத்துவமனை எழுச்சி ஆலோசனை",
    aqiAdvisory: "காற்றின் தர ஆலோசனை",
    eventAdvisory: "பொது நிகழ்வு ஆலோசனை",
    listen: "ஆலோசனையைக் கேளுங்கள்",
    stop: "நிறுத்து",
    audioGenerationFailed: "ஆடியோ உருவாக்கம் தோல்வியுற்றது",
  },
  sa: {
    title: "वैयक्तिकीकृताः स्वास्थ्यपरामर्शाः",
    description: "भवतः नगरे वास्तविकसमयस्थितीनां आधारेण AI-चालिताः स्वास्थ्यसूचनाः।",
    generateAdvisory: "कृते मम स्वास्थ्यपरामर्शं प्राप्नुवन्तु",
    generating: "AI भवतां परामर्शं जनयति... कृपया प्रतीक्षां कुर्वन्तु।",
    advisoryGenerated: "परामर्शं जनितम्",
    analysisComplete: "AI विश्लेषणं सम्पन्नम्। अधः परिणामान् पश्यन्तु।",
    advisoryFailed: "परामर्शं विफलम्",
    surgeAdvisory: "चिकित्सालय-वृद्धि-परामर्शः",
    aqiAdvisory: "वायु-गुणवत्ता-परामर्शः",
    eventAdvisory: "सार्वजनिक-कार्यक्रम-परामर्शः",
    listen: "परामर्शं शृणोतु",
    stop: "विरामः",
    audioGenerationFailed: "श्रव्यनिर्माणं विफलम्",
  },
};

export function PersonalizedAdvisories() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];
  const [advisory, setAdvisory] = useState<GeneratePersonalizedAdvisoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleGenerateAdvisory = async () => {
    setIsLoading(true);
    setAdvisory(null);
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }

    const result = await getPersonalizedAdvisory({ city, language });
    setIsLoading(false);

    if (result.success && result.data) {
      setAdvisory(result.data);
      toast({
        title: t.advisoryGenerated,
        description: t.analysisComplete,
      })
    } else {
      console.error(result.error);
       toast({
        variant: "destructive",
        title: t.advisoryFailed,
        description: result.error || "An unknown error occurred.",
      })
    }
  };
  
  const handleListen = async () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
      return;
    }

    if (!advisory) return;

    setIsGeneratingAudio(true);
    const textToSpeak = `
      ${t.surgeAdvisory}: ${advisory.surgeAdvisory}.
      ${t.aqiAdvisory}: ${advisory.aqiAdvisory}.
      ${t.eventAdvisory}: ${advisory.eventAdvisory}.
    `;

    const result = await generateSpeech({ text: textToSpeak, language });
    setIsGeneratingAudio(false);

    if (result.success && result.data) {
      const audio = new Audio(result.data.audio);
      setAudioPlayer(audio);
      audio.play();
      audio.onended = () => setAudioPlayer(null);
    } else {
      toast({
        variant: "destructive",
        title: t.audioGenerationFailed,
        description: result.error,
      });
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
            <Button onClick={handleGenerateAdvisory} disabled={isLoading} size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
            {t.generateAdvisory} {city}
            </Button>
        </div>
        
        {isLoading && (
            <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">{t.generating}</p>
                </div>
            </div>
        )}

        {advisory && (
          <div className="space-y-4">
            <div className='flex items-center justify-end'>
                <Button onClick={handleListen} size="sm" variant="outline" disabled={isGeneratingAudio}>
                    {isGeneratingAudio ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : audioPlayer ? <Square className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                    {audioPlayer ? t.stop : t.listen}
                </Button>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                  <HeartPulse className="w-5 h-5 text-destructive"/>
                  <CardTitle className="text-md font-medium">{t.surgeAdvisory}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{advisory.surgeAdvisory}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                  <Wind className="w-5 h-5 text-blue-500"/>
                  <CardTitle className="text-md font-medium">{t.aqiAdvisory}</CardTitle>
                </CardHeader>
                <CardContent>
                 <p className="text-sm text-foreground">{advisory.aqiAdvisory}</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                  <Calendar className="w-5 h-5 text-green-500"/>
                  <CardTitle className="text-md font-medium">{t.eventAdvisory}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{advisory.eventAdvisory}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
