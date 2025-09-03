
'use client';

import { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useLanguage, type Language } from '@/context/language-context';
import { useCity, type City } from '@/context/city-context';
import { Globe, MapPin, LocateFixed, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const content = {
  en: {
    selectCity: "Select City",
    useMyLocation: "Use My Location",
    locationSet: "Location Set",
    cityUpdated: (city: string) => `Your city has been updated to ${city}.`,
    locationError: "Location Error",
    couldNotAccess: "Could not access your location. Please enable location services in your browser.",
    unsupported: "Unsupported",
    geolocationUnsupported: "Geolocation is not supported by your browser.",
    selectLanguage: "Select Language",
    myAccount: "My Account",
    settings: "Settings",
    support: "Support",
    logout: "Logout",
  },
  hi: {
    selectCity: "शहर चुनें",
    useMyLocation: "मेरे स्थान का उपयोग करें",
    locationSet: "स्थान निर्धारित",
    cityUpdated: (city: string) => `आपका शहर ${city} में अपडेट कर दिया गया है।`,
    locationError: "स्थान त्रुटि",
    couldNotAccess: "आपके स्थान तक नहीं पहुंच सका। कृपया अपने ब्राउज़र में स्थान सेवाएं सक्षम करें।",
    unsupported: "असमर्थित",
    geolocationUnsupported: "आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।",
    selectLanguage: "भाषा चुनें",
    myAccount: "मेरा खाता",
    settings: "समायोजन",
    support: "सहायता",
    logout: "लॉग आउट",
  },
  mr: {
    selectCity: "शहर निवडा",
    useMyLocation: "माझे स्थान वापरा",
    locationSet: "स्थान निश्चित केले",
    cityUpdated: (city: string) => `तुमचे शहर ${city} मध्ये अद्यतनित केले आहे.`,
    locationError: "स्थान त्रुटी",
    couldNotAccess: "तुमच्या स्थानावर प्रवेश करू शकलो नाही। कृपया तुमच्या ब्राउझरमध्ये स्थान सेवा सक्षम करा.",
    unsupported: "असमर्थित",
    geolocationUnsupported: "तुमच्या ब्राउझरद्वारे भौगोलिक स्थान समर्थित नाही.",
    selectLanguage: "भाषा निवडा",
    myAccount: "माझे खाते",
    settings: "सेटिंग्ज",
    support: "समर्थन",
    logout: "लॉग आउट",
  },
  kn: {
    selectCity: "ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    useMyLocation: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    locationSet: "ಸ್ಥಳವನ್ನು ಹೊಂದಿಸಲಾಗಿದೆ",
    cityUpdated: (city: string) => `ನಿಮ್ಮ ನಗರವನ್ನು ${city} ಗೆ ನವೀಕರಿಸಲಾಗಿದೆ.`,
    locationError: "ಸ್ಥಳ ದೋಷ",
    couldNotAccess: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ। ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳ ಸೇವೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.",
    unsupported: "ಬೆಂಬಲವಿಲ್ಲ",
    geolocationUnsupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಿಂದ ಜಿಯೋಲೋಕೇಶನ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    myAccount: "ನನ್ನ ಖಾತೆ",
    settings: "ಸಂಯೋಜನೆಗಳು",
    support: "ಬೆಂಬಲ",
    logout: "ಲಾಗ್ ಔಟ್",
  },
  te: {
    selectCity: "నగరాన్ని ఎంచుకోండి",
    useMyLocation: "నా స్థానాన్ని ఉపయోగించండి",
    locationSet: "స్థానం సెట్ చేయబడింది",
    cityUpdated: (city: string) => `మీ నగరం ${city} కి నవీకరించబడింది.`,
    locationError: "స్థాన దోషం",
    couldNotAccess: "మీ స్థానాన్ని యాక్సెస్ చేయలేకపోయింది। దయచేసి మీ బ్రౌజర్‌లో స్థాన సేవలను ప్రారంభించండి.",
    unsupported: "మద్దతు లేదు",
    geolocationUnsupported: "మీ బ్రౌజర్ ద్వారా జియోలోకేషన్ మద్దతు లేదు.",
    selectLanguage: "భాషను ఎంచుకోండి",
    myAccount: "నా ఖాతా",
    settings: "సెట్టింగ్‌లు",
    support: "మద్దతు",
    logout: "లాగ్ అవుట్",
  },
  ta: {
    selectCity: "நகரத்தைத் தேர்ந்தெடுக்கவும்",
    useMyLocation: "எனது இருப்பிடத்தைப் பயன்படுத்து",
    locationSet: "இருப்பிடம் அமைக்கப்பட்டது",
    cityUpdated: (city: string) => `உங்கள் நகரம் ${city} க்கு புதுப்பிக்கப்பட்டுள்ளது.`,
    locationError: "இருப்பிடப் பிழை",
    couldNotAccess: "உங்கள் இருப்பிடத்தை அணுக முடியவில்லை। உங்கள் உலாவியில் இருப்பிடச் சேவைகளை இயக்கவும்.",
    unsupported: "ஆதரிக்கப்படவில்லை",
    geolocationUnsupported: "உங்கள் உலாவியால் புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை.",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    myAccount: "என் கணக்கு",
    settings: "அமைப்புகள்",
    support: "ஆதரவு",
    logout: "வெளியேறு",
  },
  san: {
    selectCity: "नगरं चिनोतु",
    useMyLocation: "मम स्थानं प्रयुज्यताम्",
    locationSet: "स्थानं निर्धारितम्",
    cityUpdated: (city: string) => `भवतः नगरं ${city} रूपेण अद्यतनं कृतम्।`,
    locationError: "स्थानत्रुटिः",
    couldNotAccess: "भवतः स्थानं प्राप्तुं न शक्तम्। कृपया स्वस्य ब्राउजरे स्थानसेवां चालयन्तु।",
    unsupported: "असमर्थितम्",
    geolocationUnsupported: "भवतः ब्राउजरेण भौगोलिकस्थानं न समर्थितम्।",
    selectLanguage: "भाषां चिनोतु",
    myAccount: "मम கணக்கு",
    settings: "विन्यासः",
    support: "सहायता",
    logout: "निर्गमनम्",
  },
};

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { city, setCity } = useCity();
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();
  const t = content[language];

  const languageLabels: Record<Language, string> = {
    en: 'English',
    hi: 'हिन्दी',
    mr: 'मराठी',
    kn: 'ಕನ್ನಡ',
    te: 'తెలుగు',
    ta: 'தமிழ்',
    san: 'संस्कृतम्',
  };

  const cities: City[] = ['Mumbai', 'Thane', 'Navi Mumbai', 'Kalyan', 'Vasai-Virar', 'Panvel', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Pune', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Surat'];

  const handleLocationClick = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            
            // OSM data can be complex, try to find city, town, or suburb
            const detectedCity = data.address.city || data.address.town || data.address.suburb || data.address.village;
            
            if (detectedCity) {
                // Check if the detected city is in our list of supported cities
                const supportedCity = cities.find(c => c.toLowerCase() === detectedCity.toLowerCase());
                if (supportedCity) {
                    setCity(supportedCity);
                    toast({
                        title: t.locationSet,
                        description: t.cityUpdated(supportedCity),
                    });
                } else {
                    // Fallback to the first city if not supported, but still show what was found
                     setCity(cities[0]);
                     toast({
                        title: t.locationSet,
                        description: `${detectedCity} is not a supported city yet. Defaulting to ${cities[0]}.`,
                    });
                }
            } else {
                throw new Error("Could not determine city from location.");
            }
          } catch (error) {
             toast({
                variant: "destructive",
                title: t.locationError,
                description: "Could not fetch city name from your location.",
            });
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          toast({
            variant: "destructive",
            title: t.locationError,
            description: t.couldNotAccess,
          });
          setIsLocating(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: t.unsupported,
        description: t.geolocationUnsupported,
      });
      setIsLocating(false);
    }
  };


  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger />
      <div className="w-full flex-1">
        {/* Can add a search bar here if needed */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
             <MapPin className="h-4 w-4" />
             <span>{city}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t.selectCity}</DropdownMenuLabel>
          <DropdownMenuSeparator />
           <DropdownMenuItem onSelect={handleLocationClick} disabled={isLocating}>
            {isLocating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LocateFixed className="mr-2 h-4 w-4" />
            )}
            <span>{t.useMyLocation}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={city} onValueChange={(value) => setCity(value as City)}>
            {cities.map((cityName) => (
              <DropdownMenuRadioItem key={cityName} value={cityName}>{cityName}</DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
             <Globe className="h-4 w-4" />
             <span>{languageLabels[language]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t.selectLanguage}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hi">हिन्दी</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mr">मराठी</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="kn">ಕನ್ನಡ</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="te">తెలుగు</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ta">தமிழ்</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="san">संस्कृतम्</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://picsum.photos/32/32" data-ai-hint="person" alt="User avatar" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t.settings}</DropdownMenuItem>
          <DropdownMenuItem>{t.support}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t.logout}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
