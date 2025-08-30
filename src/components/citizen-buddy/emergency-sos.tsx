'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Siren, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: "Emergency SOS",
    description: "Alert authorities and designated contacts in an emergency. Your location will be shared.",
    activateSOS: "Activate SOS",
    confirmTitle: "Confirm Emergency SOS",
    confirmDescription: "This action will immediately alert emergency services with your current location. Are you sure you want to proceed?",
    cancel: "Cancel",
    confirm: "Yes, I need help",
    sending: "Sending SOS...",
    sosSent: "SOS Sent",
    sosSentDesc: "Emergency services have been notified of your location. Help is on the way.",
    locationError: "Location Error",
    couldNotAccess: "Could not access your location. Please enable location services.",
    geolocationUnsupported: "Geolocation is not supported by your browser.",
  },
  hi: {
    title: "आपातकालीन एसओएस",
    description: "आपात स्थिति में अधिकारियों और निर्दिष्ट संपर्कों को सचेत करें। आपका स्थान साझा किया जाएगा।",
    activateSOS: "एसओएस सक्रिय करें",
    confirmTitle: "आपातकालीन एसओएस की पुष्टि करें",
    confirmDescription: "यह कार्रवाई तुरंत आपके वर्तमान स्थान के साथ आपातकालीन सेवाओं को सचेत करेगी। क्या आप वाकई आगे बढ़ना चाहते हैं?",
    cancel: "रद्द करें",
    confirm: "हाँ, मुझे मदद चाहिए",
    sending: "एसओएस भेजा जा रहा है...",
    sosSent: "एसओएस भेजा गया",
    sosSentDesc: "आपातकालीन सेवाओं को आपके स्थान की सूचना दे दी गई है। मदद रास्ते में है।",
    locationError: "स्थान त्रुटि",
    couldNotAccess: "आपके स्थान तक नहीं पहुंच सका। कृपया स्थान सेवाएं सक्षम करें।",
    geolocationUnsupported: "आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।",
  },
  mr: {
    title: "आपत्कालीन एसओएस",
    description: "आणीबाणीच्या परिस्थितीत अधिकारी आणि नियुक्त संपर्कांना सतर्क करा. तुमचे स्थान शेअर केले जाईल.",
    activateSOS: "एसओएस सक्रिय करा",
    confirmTitle: "आपत्कालीन एसओएसची पुष्टी करा",
    confirmDescription: "ही कृती तुमच्या वर्तमान स्थानासह आपत्कालीन सेवांना त्वरित सतर्क करेल. तुम्हाला खात्री आहे की तुम्ही पुढे जाऊ इच्छिता?",
    cancel: "रद्द करा",
    confirm: "होय, मला मदतीची गरज आहे",
    sending: "एसओएस पाठवत आहे...",
    sosSent: "एसओएस पाठवले",
    sosSentDesc: "आपत्कालीन सेवांना तुमच्या स्थानाची सूचना देण्यात आली आहे. मदत मार्गावर आहे.",
    locationError: "स्थान त्रुटी",
    couldNotAccess: "तुमच्या स्थानावर प्रवेश करू शकलो नाही. कृपया स्थान सेवा सक्षम करा.",
    geolocationUnsupported: "तुमच्या ब्राउझरद्वारे भौगोलिक स्थान समर्थित नाही.",
  },
  kn: {
    title: "ತುರ್ತು ಎಸ್‌ಒಎಸ್",
    description: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ಗೊತ್ತುಪಡಿಸಿದ ಸಂಪರ್ಕಗಳನ್ನು ಎಚ್ಚರಿಸಿ. ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
    activateSOS: "ಎಸ್‌ಒಎಸ್ ಸಕ್ರಿಯಗೊಳಿಸಿ",
    confirmTitle: "ತುರ್ತು ಎಸ್‌ಒಎಸ್ ಅನ್ನು ದೃಢೀಕರಿಸಿ",
    confirmDescription: "ಈ ಕ್ರಿಯೆಯು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದೊಂದಿಗೆ ತುರ್ತು ಸೇವೆಗಳನ್ನು ತಕ್ಷಣವೇ ಎಚ್ಚರಿಸುತ್ತದೆ. ನೀವು ಮುಂದುವರಿಯಲು ಖಚಿತವಾಗಿದ್ದೀರಾ?",
    cancel: "ರದ್ದುಮಾಡಿ",
    confirm: "ಹೌದು, ನನಗೆ ಸಹಾಯ ಬೇಕು",
    sending: "ಎಸ್‌ಒಎಸ್ ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    sosSent: "ಎಸ್‌ಒಎಸ್ ಕಳುಹಿಸಲಾಗಿದೆ",
    sosSentDesc: "ನಿಮ್ಮ ಸ್ಥಳದ ಬಗ್ಗೆ ತುರ್ತು ಸೇವೆಗಳಿಗೆ ತಿಳಿಸಲಾಗಿದೆ. ಸಹಾಯ ದಾರಿಯಲ್ಲಿದೆ.",
    locationError: "ಸ್ಥಳ ದೋಷ",
    couldNotAccess: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಥಳ ಸೇವೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.",
    geolocationUnsupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಿಂದ ಜಿಯೋಲೊಕೇಶನ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
  },
  te: {
    title: "అత్యవసర SOS",
    description: "అత్యవసర పరిస్థితిలో అధికారులు మరియు నిర్దేశించిన పరిచయాలను అప్రమత్తం చేయండి. మీ స్థానం భాగస్వామ్యం చేయబడుతుంది.",
    activateSOS: "SOSను సక్రియం చేయండి",
    confirmTitle: "అత్యవసర SOSను నిర్ధారించండి",
    confirmDescription: "ఈ చర్య మీ ప్రస్తుత స్థానంతో అత్యవసర సేవలను తక్షణమే అప్రమత్తం చేస్తుంది. మీరు కొనసాగాలనుకుంటున్నారని ఖచ్చితంగా ఉన్నారా?",
    cancel: "రద్దు చేయండి",
    confirm: "అవును, నాకు సహాయం కావాలి",
    sending: "SOS పంపుతోంది...",
    sosSent: "SOS పంపబడింది",
    sosSentDesc: "మీ స్థానం గురించి అత్యవసర సేవలకు తెలియజేయబడింది. సహాయం దారిలో ఉంది.",
    locationError: "స్థాన దోషం",
    couldNotAccess: "మీ స్థానాన్ని యాక్సెస్ చేయలేకపోయింది. దయచేసి స్థాన సేవలను ప్రారంభించండి.",
    geolocationUnsupported: "మీ బ్రౌజర్ ద్వారా జియోలోకేషన్ మద్దతు లేదు.",
  },
  ta: {
    title: "அவசர எஸ்ஓஎஸ்",
    description: "அவசரகாலத்தில் அதிகாரிகள் மற்றும் நியமிக்கப்பட்ட தொடர்புகளை எச்சரிக்கவும். உங்கள் இருப்பிடம் பகிரப்படும்.",
    activateSOS: "எஸ்ஓஎஸ்ஸைச் செயல்படுத்தவும்",
    confirmTitle: "அவசர எஸ்ஓஎஸ்ஸை உறுதிப்படுத்தவும்",
    confirmDescription: "இந்த நடவடிக்கை உங்கள் தற்போதைய இருப்பிடத்துடன் அவசரகால சேவைகளை உடனடியாக எச்சரிக்கும். நீங்கள் தொடர விரும்புகிறீர்கள் என்பது உறுதியா?",
    cancel: "ரத்துசெய்",
    confirm: "ஆம், எனக்கு உதவி தேவை",
    sending: "எஸ்ஓஎஸ் அனுப்பப்படுகிறது...",
    sosSent: "எஸ்ஓஎஸ் அனுப்பப்பட்டது",
    sosSentDesc: "உங்கள் இருப்பிடம் குறித்து அவசரகால சேவைகளுக்கு அறிவிக்கப்பட்டுள்ளது. உதவி வழியில் உள்ளது.",
    locationError: "இருப்பிடப் பிழை",
    couldNotAccess: "உங்கள் இருப்பிடத்தை அணுக முடியவில்லை. இருப்பிடச் சேவைகளை இயக்கவும்.",
    geolocationUnsupported: "உங்கள் உலாவியால் புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை.",
  },
  sa: {
    title: "आपत्कालीनः एसओएस",
    description: "आपत्काले अधिकारिणः निर्दिष्टसम्पर्कांश्च सूचयन्तु। भवतः स्थानं साझा भविष्यति।",
    activateSOS: "एसओएस सक्रियं करोतु",
    confirmTitle: "आपत्कालीनं एसओएस पुष्णातु",
    confirmDescription: "एषा क्रिया भवतः वर्तमानस्थानेन सह आपत्कालीनसेवाः शीघ्रमेव सूचयिष्यति। किं भवान् अग्रे गन्तुं निश्चितः?",
    cancel: "रद्दं करोतु",
    confirm: "आम्, मम साहाय्यम् आवश्यकम्",
    sending: "एसओएस प्रेष्यते...",
    sosSent: "एसओएस प्रेषितम्",
    sosSentDesc: "भवतः स्थानस्य सूचना आपत्कालीनसेवाभ्यः दत्ता अस्ति। साहाय्यं मार्गे अस्ति।",
    locationError: "स्थानत्रुटिः",
    couldNotAccess: "भवतः स्थानं प्राप्तुं न शक्तम्। कृपया स्थानसेवां चालयन्तु।",
    geolocationUnsupported: "भवतः ब्राउजरेण भौगोलिकस्थानं न समर्थितम्।",
  },
};

export function EmergencySOS() {
  const { language } = useLanguage();
  const t = content[language];
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmSOS = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would send coordinates to a backend.
          // e.g., sendSOSToServer(position.coords.latitude, position.coords.longitude);
          console.log(`SOS at: ${position.coords.latitude}, ${position.coords.longitude}`);
          toast({
            title: t.sosSent,
            description: t.sosSentDesc,
          });
          setIsLocating(false);
          setIsOpen(false);
        },
        (error) => {
          console.error(error);
          toast({
            variant: "destructive",
            title: t.locationError,
            description: t.couldNotAccess,
          });
          setIsLocating(false);
          setIsOpen(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Unsupported",
        description: t.geolocationUnsupported,
      });
      setIsLocating(false);
      setIsOpen(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
         <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="lg" className="w-full">
              <Siren className="mr-2 h-5 w-5" />
              {t.activateSOS}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.confirmTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {t.confirmDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLocating}>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSOS} disabled={isLocating}>
                 {isLocating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 ) : null}
                {isLocating ? t.sending : t.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
