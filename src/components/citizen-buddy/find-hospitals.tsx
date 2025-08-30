
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, LocateFixed, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const content = {
  en: {
    title: "Find Nearby Hospitals",
    description: "Locate clinics and hospitals near you.",
    findHospitals: "Find Hospitals Near Me",
    finding: "Finding your location...",
    hospitalsIn: "Hospitals in",
    locationError: "Location Error",
    couldNotAccess: "Could not access your location. Please enable location services.",
    geolocationUnsupported: "Geolocation is not supported by your browser.",
    noHospitals: "Could not find hospital data for this city.",
  },
  hi: {
    title: "आस-पास के अस्पताल खोजें",
    description: "अपने आस-पास के क्लिनिक और अस्पताल खोजें।",
    findHospitals: "मेरे आस-पास अस्पताल खोजें",
    finding: "आपका स्थान खोजा जा रहा है...",
    hospitalsIn: "में अस्पताल",
    locationError: "स्थान त्रुटि",
    couldNotAccess: "आपके स्थान तक नहीं पहुंच सका। कृपया स्थान सेवाएं सक्षम करें।",
    geolocationUnsupported: "आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।",
    noHospitals: "इस शहर के लिए अस्पताल का डेटा नहीं मिला।",
  },
  mr: {
    title: "जवळची रुग्णालये शोधा",
    description: "तुमच्या जवळची क्लिनिक आणि रुग्णालये शोधा.",
    findHospitals: "माझ्या जवळची रुग्णालये शोधा",
    finding: "तुमचे स्थान शोधत आहे...",
    hospitalsIn: "मधील रुग्णालये",
    locationError: "स्थान त्रुटी",
    couldNotAccess: "तुमच्या स्थानावर प्रवेश करू शकलो नाही. कृपया स्थान सेवा सक्षम करा.",
    geolocationUnsupported: "तुमच्या ब्राउझरद्वारे भौगोलिक स्थान समर्थित नाही.",
    noHospitals: "या शहरासाठी रुग्णालयाचा डेटा सापडला नाही.",
  },
  kn: {
    title: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
    description: "ನಿಮ್ಮ ಹತ್ತಿರದ ಕ್ಲಿನಿಕ್‌ಗಳು ಮತ್ತು ಆಸ್ಪತ್ರೆಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ.",
    findHospitals: "ನನ್ನ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
    finding: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    hospitalsIn: "ನಲ್ಲಿರುವ ಆಸ್ಪತ್ರೆಗಳು",
    locationError: "ಸ್ಥಳ ದೋಷ",
    couldNotAccess: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಥಳ ಸೇವೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.",
    geolocationUnsupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಿಂದ ಜಿಯೋಲೊಕೇಶನ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
    noHospitals: "ಈ ನಗರಕ್ಕೆ ಆಸ್ಪತ್ರೆ ಡೇಟಾವನ್ನು ಕಂಡುಹಿಡಿಯಲಾಗಲಿಲ್ಲ.",
  },
  te: {
    title: " సమీపంలోని ఆసుపత్రులను కనుగొనండి",
    description: "మీకు సమీపంలోని క్లినిక్‌లు మరియు ఆసుపత్రులను గుర్తించండి.",
    findHospitals: "నాకు సమీపంలో ఉన్న ఆసుపత్రులను కనుగొనండి",
    finding: "మీ స్థానాన్ని కనుగొంటోంది...",
    hospitalsIn: "లోని ఆసుపత్రులు",
    locationError: "స్థాన దోషం",
    couldNotAccess: "మీ స్థానాన్ని యాక్సెస్ చేయలేకపోయింది. దయచేసి స్థాన సేవలను ప్రారంభించండి.",
    geolocationUnsupported: "మీ బ్రౌజర్ ద్వారా జియోలోకేషన్ మద్దతు లేదు.",
    noHospitals: "ఈ నగరానికి సంబంధించిన ఆసుపత్రి డేటా కనుగొనబడలేదు.",
  },
  ta: {
    title: "அருகிலுள்ள மருத்துவமனைகளைக் கண்டறியவும்",
    description: "உங்களுக்கு அருகிலுள்ள கிளினிக்குகள் மற்றும் மருத்துவமனைகளைக் கண்டறியவும்.",
    findHospitals: "எனக்கு அருகிலுள்ள மருத்துவமனைகளைக் கண்டறியவும்",
    finding: "உங்கள் இருப்பிடத்தைக் கண்டறிகிறது...",
    hospitalsIn: " மருத்துவமனைகள்",
    locationError: "இருப்பிடப் பிழை",
    couldNotAccess: "உங்கள் இருப்பிடத்தை அணுக முடியவில்லை. இருப்பிடச் சேவைகளை இயக்கவும்.",
    geolocationUnsupported: "உங்கள் உலாவியால் புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை.",
    noHospitals: "இந்த நகரத்திற்கான மருத்துவமனை தரவைக் கண்டுபிடிக்க முடியவில்லை.",
  },
  sa: {
    title: "समीपस्थानि चिकित्सालयान् अन्विष्यन्तु",
    description: "भवतः समीपे चिकित्सालयान् अन्विष्यन्तु।",
    findHospitals: "मम समीपे चिकित्सालयान् अन्विष्यन्तु",
    finding: "भवतः स्थानं अन्विष्यति...",
    hospitalsIn: " मध्ये चिकित्सालयाः",
    locationError: "स्थानत्रुटिः",
    couldNotAccess: "भवतः स्थानं प्राप्तुं न शक्तम्। कृपया स्थानसेवां चालयन्तु।",
    geolocationUnsupported: "भवतः ब्राउजरेण भौगोलिकस्थानं न समर्थितम्।",
    noHospitals: "अस्य नगरस्य कृते चिकित्सालयस्य दत्तांशः न प्राप्तः।",
  },
};

const hospitalData = {
    Mumbai: [
        { name: "Lilavati Hospital and Research Centre", address: "Bandra West", distance: 2.5 },
        { name: "Kokilaben Dhirubhai Ambani Hospital", address: "Andheri West", distance: 5.1 },
        { name: "Breach Candy Hospital", address: "Cumballa Hill", distance: 8.3 },
        { name: "Fortis Hospital, Mulund", address: "Mulund West", distance: 12.0 },
        { name: "KEM Hospital", address: "Parel", distance: 6.7 },
    ],
    Delhi: [
        { name: "All India Institute of Medical Sciences (AIIMS)", address: "Ansari Nagar", distance: 3.2 },
        { name: "Max Healthcare Saket", address: "Saket", distance: 7.8 },
        { name: "Indraprastha Apollo Hospitals", address: "Sarita Vihar", distance: 10.5 },
        { name: "Sir Ganga Ram Hospital", address: "Rajinder Nagar", distance: 4.1 },
    ]
};

type HospitalInfo = { name: string; address: string; distance: number };

export function FindHospitals() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);

  const handleFindHospitals = () => {
    setIsLoading(true);
    setHospitals([]);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate finding hospitals based on city
          const cityHospitals = hospitalData[city as keyof typeof hospitalData] || [];
          if (cityHospitals.length > 0) {
            setHospitals(cityHospitals);
          } else {
            toast({ variant: "destructive", title: t.noHospitals });
          }
          setIsLoading(false);
        },
        (error) => {
          toast({ variant: "destructive", title: t.locationError, description: t.couldNotAccess });
          setIsLoading(false);
        }
      );
    } else {
      toast({ variant: "destructive", title: t.geolocationUnsupported });
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Hospital className="h-6 w-6 text-primary" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Button onClick={handleFindHospitals} disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LocateFixed className="mr-2 h-4 w-4" />}
          {isLoading ? t.finding : t.findHospitals}
        </Button>
        
        {hospitals.length > 0 && (
          <div className="space-y-2">
            <Separator />
            <h3 className="text-md font-semibold">{t.hospitalsIn} {city}</h3>
            <ScrollArea className="h-48 w-full">
              <div className="space-y-2 pr-4">
                {hospitals.map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-semibold">{hospital.name}</p>
                      <p className="text-sm text-muted-foreground">{hospital.address}</p>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {hospital.distance} km
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
