
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Siren, Loader2, HeartPulse, Shield, Flame } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

type EmergencyService = 'Ambulance' | 'Police' | 'Fire';

const content = {
  en: {
    title: "Emergency Services",
    description: "Alert authorities in an emergency. Your location will be shared automatically.",
    ambulance: "Ambulance",
    police: "Police",
    fire: "Fire Dept.",
    confirmTitle: (service: string) => `Confirm Call for ${service}`,
    confirmDescription: (service: string) => `This will immediately alert the ${service} with your location. Are you sure?`,
    cancel: "Cancel",
    confirm: "Yes, I Need Help",
    sending: (service: string) => `Contacting ${service}...`,
    sosSent: (service: string) => `${service} Notified`,
    sosSentDesc: (service: string) => `The ${service} has been notified of your location. Help is on the way.`,
    locationError: "Location Error",
    couldNotAccess: "Could not access your location. Please enable location services.",
    geolocationUnsupported: "Geolocation is not supported by your browser.",
  },
  hi: {
    title: "आपातकालीन सेवाएं",
    description: "आपात स्थिति में अधिकारियों को सचेत करें। आपका स्थान स्वचालित रूप से साझा किया जाएगा।",
    ambulance: "एम्बुलेंस",
    police: "पुलिस",
    fire: "अग्निशमन विभाग",
    confirmTitle: (service: string) => `${service} के लिए कॉल की पुष्टि करें`,
    confirmDescription: (service: string) => `यह तुरंत आपके स्थान के साथ ${service} को सचेत करेगा। क्या आप निश्चित हैं?`,
    cancel: "रद्द करें",
    confirm: "हाँ, मुझे मदद चाहिए",
    sending: (service: string) => `${service} से संपर्क किया जा रहा है...`,
    sosSent: (service: string) => `${service} को सूचित किया गया`,
    sosSentDesc: (service: string) => `${service} को आपके स्थान की सूचना दे दी गई है। मदद रास्ते में है।`,
    locationError: "स्थान त्रुटि",
    couldNotAccess: "आपके स्थान तक नहीं पहुंच सका। कृपया स्थान सेवाएं सक्षम करें।",
    geolocationUnsupported: "आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।",
  },
  mr: {
    title: "आपत्कालीन सेवा",
    description: "आणीबाणीच्या परिस्थितीत अधिकाऱ्यांना सतर्क करा. तुमचे स्थान आपोआप शेअर केले जाईल.",
    ambulance: "रुग्णवाहिका",
    police: "पोलीस",
    fire: "अग्निशमन दल",
    confirmTitle: (service: string) => `${service} साठी कॉलची पुष्टी करा`,
    confirmDescription: (service: string) => `हे तुमच्या स्थानासह ${service} ला त्वरित सतर्क करेल. तुम्हाला खात्री आहे का?`,
    cancel: "रद्द करा",
    confirm: "होय, मला मदतीची गरज आहे",
    sending: (service: string) => `${service} शी संपर्क साधत आहे...`,
    sosSent: (service: string) => `${service} ला सूचित केले`,
    sosSentDesc: (service: string) => `${service} ला तुमच्या स्थानाची सूचना देण्यात आली आहे. मदत मार्गावर आहे.`,
    locationError: "स्थान त्रुटी",
    couldNotAccess: "तुमच्या स्थानावर प्रवेश करू शकलो नाही. कृपया स्थान सेवा सक्षम करा.",
    geolocationUnsupported: "तुमच्या ब्राउझरद्वारे भौगोलिक स्थान समर्थित नाही.",
  },
  kn: {
    title: "ತುರ್ತು ಸೇವೆಗಳು",
    description: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಅಧಿಕಾರಿಗಳನ್ನು ಎಚ್ಚರಿಸಿ. ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
    ambulance: "ಆಂಬ್ಯುಲೆನ್ಸ್",
    police: "ಪೋಲೀಸ್",
    fire: "ಅಗ್ನಿಶಾಮಕ ಇಲಾಖೆ",
    confirmTitle: (service: string) => `${service} ಗೆ ಕರೆ ದೃಢೀಕರಿಸಿ`,
    confirmDescription: (service: string) => `ಇದು ತಕ್ಷಣವೇ ನಿಮ್ಮ ಸ್ಥಳದೊಂದಿಗೆ ${service} ಅನ್ನು ಎಚ್ಚರಿಸುತ್ತದೆ. ನಿಮಗೆ ಖಚಿತವೇ?`,
    cancel: "ರದ್ದುಮಾಡಿ",
    confirm: "ಹೌದು, ನನಗೆ ಸಹಾಯ ಬೇಕು",
    sending: (service: string) => `${service} ಅನ್ನು ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...`,
    sosSent: (service: string) => `${service} ಗೆ ಸೂಚಿಸಲಾಗಿದೆ`,
    sosSentDesc: (service: string) => `ನಿಮ್ಮ ಸ್ಥಳದ ಬಗ್ಗೆ ${service} ಗೆ ತಿಳಿಸಲಾಗಿದೆ. ಸಹಾಯ ದಾರಿಯಲ್ಲಿದೆ.`,
    locationError: "ಸ್ಥಳ ದೋಷ",
    couldNotAccess: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಥಳ ಸೇವೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.",
    geolocationUnsupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಿಂದ ಜಿಯೋಲೊಕೇಶನ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
  },
  te: {
    title: "అత్యవసర సేవలు",
    description: "అత్యవసర పరిస్థితిలో అధికారులను అప్రమత్తం చేయండి. మీ స్థానం స్వయంచాలకంగా భాగస్వామ్యం చేయబడుతుంది.",
    ambulance: "అంబులెన్స్",
    police: "పోలీస్",
    fire: "అగ్నిమాపక విభాగం",
    confirmTitle: (service: string) => `${service} కోసం కాల్‌ని నిర్ధారించండి`,
    confirmDescription: (service: string) => `ఇది తక్షణమే మీ స్థానంతో ${service} ను అప్రమత్తం చేస్తుంది. మీకు ఖచ్చితంగా తెలియజేయండి?`,
    cancel: "రద్దు చేయండి",
    confirm: "అవును, నాకు సహాయం కావాలి",
    sending: (service: string) => `${service} ని సంప్రదిస్తోంది...`,
    sosSent: (service: string) => `${service} కి తెలియజేయబడింది`,
    sosSentDesc: (service: string) => `మీ స్థానం గురించి ${service} కి తెలియజేయబడింది. సహాయం దారిలో ఉంది.`,
    locationError: "స్థాన దోషం",
    couldNotAccess: "మీ స్థానాన్ని యాక్సెస్ చేయలేకపోయింది. దయచేసి స్థాన సేవలను ప్రారంభించండి.",
    geolocationUnsupported: "మీ బ్రౌజర్ ద్వారా జియోలోకేషన్ మద్దతు లేదు.",
  },
  ta: {
    title: "அவசர சேவைகள்",
    description: "அவசரகாலத்தில் அதிகாரிகளை எச்சரிக்கவும். உங்கள் இருப்பிடம் தானாகப் பகிரப்படும்.",
    ambulance: "ஆம்புலன்ஸ்",
    police: "காவல்துறை",
    fire: "தீயணைப்புத் துறை",
    confirmTitle: (service: string) => `${service} க்கான அழைப்பை உறுதிப்படுத்தவும்`,
    confirmDescription: (service: string) => `இது உடனடியாக உங்கள் இருப்பிடத்துடன் ${service} ஐ எச்சரிக்கும். உங்களுக்கு உறுதியாக தெரியுமா?`,
    cancel: "ரத்துசெய்",
    confirm: "ஆம், எனக்கு உதவி தேவை",
    sending: (service: string) => `${service} ஐத் தொடர்புகொள்கிறது...`,
    sosSent: (service: string) => `${service} க்கு அறிவிக்கப்பட்டது`,
    sosSentDesc: (service: string) => `உங்கள் இருப்பிடம் குறித்து ${service} க்கு அறிவிக்கப்பட்டுள்ளது. உதவி வழியில் உள்ளது.`,
    locationError: "இருப்பிடப் பிழை",
    couldNotAccess: "உங்கள் இருப்பிடத்தை அணுக முடியவில்லை. இருப்பிடச் சேவைகளை இயக்கவும்.",
    geolocationUnsupported: "உங்கள் உலாவியால் புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை.",
  },
  san: {
    title: "आपत्कालीनसेवाः",
    description: "आपत्काले अधिकारिणः सूचयन्तु। भवतः स्थानं स्वचालितरूपेण साझा भविष्यति।",
    ambulance: "रुग्णयानम्",
    police: "आरक्षकः",
    fire: "अग्निशमनविभागः",
    confirmTitle: (service: string) => `${service} कृते आह्वानं पुष्णातु`,
    confirmDescription: (service: string) => `एतत् शीघ्रमेव भवतः स्थानेन सह ${service} सूचयिष्यति। किं भवान् निश्चितः?`,
    cancel: "रद्दं करोतु",
    confirm: "आम्, मम साहाय्यम् आवश्यकम्",
    sending: (service: string) => `${service} सम्पर्कः क्रियते...`,
    sosSent: (service: string) => `${service} सूचितः`,
    sosSentDesc: (service: string) => `भवतः स्थानस्य सूचना ${service} दत्ता अस्ति। साहाय्यं मार्गे अस्ति।`,
    locationError: "स्थानत्रुटिः",
    couldNotAccess: "भवतः स्थानं प्राप्तुं न शक्तम्। कृपया स्थानसेवां चालयन्तु।",
    geolocationUnsupported: "भवतः ब्राउजरेण भौगोलिकस्थानं न समर्थितम्।",
  },
};

const EmergencyButton = ({
  service,
  serviceText,
  icon: Icon,
  onActivate,
}: {
  service: EmergencyService;
  serviceText: string;
  icon: React.ElementType;
  onActivate: (service: EmergencyService, serviceText: string) => void;
}) => (
  <button
    onClick={() => onActivate(service, serviceText)}
    className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-destructive/10 p-6 text-destructive transition-all hover:border-destructive hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2",
    )}
  >
    <Icon className="h-12 w-12" />
    <span className="text-xl font-semibold">{serviceText}</span>
  </button>
);


export function EmergencySOS() {
  const { language } = useLanguage();
  const t = content[language];
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    service: EmergencyService | null;
    serviceText: string;
  }>({ isOpen: false, service: null, serviceText: '' });

  const handleActivate = (service: EmergencyService, serviceText: string) => {
    setDialogState({ isOpen: true, service, serviceText });
  };

  const handleConfirmSOS = () => {
    if (!dialogState.service) return;

    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(`${dialogState.service} SOS at: ${position.coords.latitude}, ${position.coords.longitude}`);
          toast({
            title: t.sosSent(dialogState.serviceText),
            description: t.sosSentDesc(dialogState.serviceText),
          });
          setIsLocating(false);
          setDialogState({ isOpen: false, service: null, serviceText: '' });
        },
        (error) => {
          console.error(error);
          toast({
            variant: "destructive",
            title: t.locationError,
            description: t.couldNotAccess,
          });
          setIsLocating(false);
          setDialogState({ isOpen: false, service: null, serviceText: '' });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Unsupported",
        description: t.geolocationUnsupported,
      });
      setIsLocating(false);
      setDialogState({ isOpen: false, service: null, serviceText: '' });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Siren className="h-6 w-6 text-destructive" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
            <EmergencyButton service="Ambulance" serviceText={t.ambulance} icon={HeartPulse} onActivate={handleActivate} />
            <EmergencyButton service="Police" serviceText={t.police} icon={Shield} onActivate={handleActivate} />
            <EmergencyButton service="Fire" serviceText={t.fire} icon={Flame} onActivate={handleActivate} />
        </div>
        <AlertDialog open={dialogState.isOpen} onOpenChange={(isOpen) => setDialogState(prev => ({...prev, isOpen}))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.confirmTitle(dialogState.serviceText)}</AlertDialogTitle>
              <AlertDialogDescription>
                {t.confirmDescription(dialogState.serviceText)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLocating}>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" onClick={handleConfirmSOS} disabled={isLocating}>
                    {isLocating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLocating ? t.sending(dialogState.serviceText) : t.confirm}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
