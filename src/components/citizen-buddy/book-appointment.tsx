
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarPlus, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const content = {
  en: {
    title: "Book Appointment",
    description: "Schedule a visit with a doctor at a nearby hospital.",
    hospital: "Hospital",
    selectHospital: "Select a hospital",
    date: "Appointment Date",
    selectDate: "Pick a date",
    reason: "Reason for Visit",
    reasonPlaceholder: "e.g., General check-up, fever...",
    book: "Book Appointment",
    booking: "Booking...",
    successTitle: "Appointment Booked!",
    successDesc: (hospital: string, date: string) => `Your appointment at ${hospital} on ${date} has been confirmed.`,
    error: "Please fill all fields.",
  },
  hi: {
    title: "अपॉइंटमेंट बुक करें",
    description: "नजदीकी अस्पताल में डॉक्टर से मिलने का समय निर्धारित करें।",
    hospital: "अस्पताल",
    selectHospital: "एक अस्पताल चुनें",
    date: "अपॉइंटमेंट की तारीख",
    selectDate: "एक तारीख चुनें",
    reason: "मिलने का कारण",
    reasonPlaceholder: "जैसे, सामान्य जांच, बुखार...",
    book: "अपॉइंटमेंट बुक करें",
    booking: "बुक हो रहा है...",
    successTitle: "अपॉइंटमेंट बुक हो गया!",
    successDesc: (hospital: string, date: string) => `${hospital} में ${date} को आपका अपॉइंटमेंट पक्का हो गया है।`,
    error: "कृपया सभी फ़ील्ड भरें।",
  },
  mr: {
    title: "अपॉइंटमेंट बुक करा",
    description: "जवळच्या रुग्णालयात डॉक्टरांसोबत भेटीची वेळ निश्चित करा.",
    hospital: "रुग्णालय",
    selectHospital: "एक रुग्णालय निवडा",
    date: "अपॉइंटमेंटची तारीख",
    selectDate: "एक तारीख निवडा",
    reason: "भेटीचे कारण",
    reasonPlaceholder: "उदा., सामान्य तपासणी, ताप...",
    book: "अपॉइंटमेंट बुक करा",
    booking: "बुक करत आहे...",
    successTitle: "अपॉइंटमेंट बुक झाली!",
    successDesc: (hospital: string, date: string) => `${hospital} येथे ${date} रोजी तुमची अपॉइंटमेंट निश्चित झाली आहे.`,
    error: "कृपया सर्व फील्ड भरा.",
  },
    kn: {
    title: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಿ",
    description: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಯಲ್ಲಿ ವೈದ್ಯರೊಂದಿಗೆ ಭೇಟಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ.",
    hospital: "ಆಸ್ಪತ್ರೆ",
    selectHospital: "ಒಂದು ಆಸ್ಪತ್ರೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    date: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ದಿನಾಂಕ",
    selectDate: "ದಿನಾಂಕವನ್ನು ಆರಿಸಿ",
    reason: "ಭೇಟಿಯ ಕಾರಣ",
    reasonPlaceholder: "ಉದಾ., ಸಾಮಾನ್ಯ ತಪಾಸಣೆ, ಜ್ವರ...",
    book: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಿ",
    booking: "ಕಾಯ್ದಿರಿಸಲಾಗುತ್ತಿದೆ...",
    successTitle: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ!",
    successDesc: (hospital: string, date: string) => `${hospital} ನಲ್ಲಿ ${date} ರಂದು ನಿಮ್ಮ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಖಚಿತಗೊಂಡಿದೆ.`,
    error: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
  },
  te: {
    title: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    description: "సమీప ఆసుపత్రిలో డాక్టర్‌తో సందర్శనను షెడ్యూల్ చేయండి.",
    hospital: "ఆసుపత్రి",
    selectHospital: "ఒక ఆసుపత్రిని ఎంచుకోండి",
    date: "అపాయింట్‌మెంట్ తేదీ",
    selectDate: "ఒక తేదీని ఎంచుకోండి",
    reason: "సందర్శన కారణం",
    reasonPlaceholder: "ఉదా., సాధారణ తనిఖీ, జ్వరం...",
    book: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    booking: "బుక్ చేస్తోంది...",
    successTitle: "అపాయింట్‌మెంట్ బుక్ చేయబడింది!",
    successDesc: (hospital: string, date: string) => `${hospital} లో ${date} న మీ అపాయింట్‌మెంట్ నిర్ధారించబడింది.`,
    error: "దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి.",
  },
  ta: {
    title: "சந்திப்பை பதிவு செய்யவும்",
    description: "அருகிலுள்ள மருத்துவமனையில் மருத்துவருடன் சந்திப்பைத் திட்டமிடுங்கள்.",
    hospital: "மருத்துவமனை",
    selectHospital: "ஒரு மருத்துவமனையைத் தேர்ந்தெடுக்கவும்",
    date: "சந்திப்பு தேதி",
    selectDate: "ஒரு தேதியைத் தேர்ந்தெடுக்கவும்",
    reason: "வருகைக்கான காரணம்",
    reasonPlaceholder: "எ.கா., பொதுவான பரிசோதனை, காய்ச்சல்...",
    book: "சந்திப்பை பதிவு செய்யவும்",
    booking: "பதிவு செய்கிறது...",
    successTitle: "சந்திப்பு பதிவு செய்யப்பட்டது!",
    successDesc: (hospital: string, date: string) => `${hospital} இல் ${date} அன்று உங்கள் சந்திப்பு உறுதிசெய்யப்பட்டது.`,
    error: "தயவுசெய்து எல்லா புலங்களையும் நிரப்பவும்.",
  },
  sa: {
    title: "समयं निश्चिनोतु",
    description: "समीपस्थे चिकित्सालये वैद्येन सह मेलनस्य समयं निश्चिनोतु।",
    hospital: "चिकित्सालयः",
    selectHospital: "चिकित्सालयं चिनोतु",
    date: "मेलनस्य दिनाङ्कः",
    selectDate: "दिनाङ्कं चिनोतु",
    reason: "मेलनस्य कारणम्",
    reasonPlaceholder: "यथा, सामान्यपरीक्षा, ज्वरः...",
    book: "समयं निश्चिनोतु",
    booking: "निश्चितं कुर्वन्...",
    successTitle: "समयः निश्चितः!",
    successDesc: (hospital: string, date: string) => `${hospital} मध्ये ${date} दिनाङ्के भवतः मेलनस्य समयः निश्चितः।`,
    error: "कृपया सर्वाणि क्षेत्राणि पूरयन्तु।",
  },
};

const hospitalData = {
    Mumbai: ["Lilavati Hospital", "Kokilaben Hospital", "Breach Candy Hospital", "Fortis Hospital", "KEM Hospital"],
    Delhi: ["AIIMS", "Max Healthcare", "Indraprastha Apollo Hospital", "Sir Ganga Ram Hospital"],
};

export function BookAppointment() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];
  const { toast } = useToast();
  
  const [hospital, setHospital] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const cityHospitals = hospitalData[city as keyof typeof hospitalData] || [];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospital || !date || !reason) {
      toast({ variant: "destructive", title: t.error });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsBooked(true);
      toast({
        title: t.successTitle,
        description: t.successDesc(hospital, format(date, "PPP")),
      });
    }, 1500);
  };
  
  if (isBooked) {
      return (
          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CalendarPlus className="h-6 w-6 text-primary" />
                    <CardTitle>{t.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold">{t.successTitle}</h3>
                    <p className="text-muted-foreground">{t.successDesc(hospital, format(date!, "PPP"))}</p>
                    <Button onClick={() => setIsBooked(false)} className="mt-4">Book Another</Button>
                </div>
            </CardContent>
          </Card>
      )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <CalendarPlus className="h-6 w-6 text-primary" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hospital">{t.hospital}</Label>
              <Select onValueChange={setHospital} value={hospital} disabled={isLoading}>
                <SelectTrigger id="hospital">
                  <SelectValue placeholder={t.selectHospital} />
                </SelectTrigger>
                <SelectContent>
                  {cityHospitals.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">{t.date}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    disabled={isLoading}
                  >
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>{t.selectDate}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">{t.reason}</Label>
            <Textarea 
              id="reason" 
              placeholder={t.reasonPlaceholder} 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="mr-2 h-4 w-4" />}
            {isLoading ? t.booking : t.book}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
