'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Send, Loader2, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useCity } from '@/context/city-context';
import { useToast } from "@/hooks/use-toast";
import { getHealthBuddyResponse } from '@/app/actions';
import type { CitizenHealthBuddyOutput } from '@/ai/schemas';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const content = {
  en: {
    title: "ArogyaMitra AI Assistant",
    description: "Your personal health buddy. Ask me anything about your health or conditions in your city.",
    placeholder: "Ask about symptoms, health alerts, etc.",
    send: "Send",
    responseFailed: "Response Failed",
    shopOnline: "Shop for Medicines Online",
  },
  hi: {
    title: "आरोग्यमित्र एआई सहायक",
    description: "आपका व्यक्तिगत स्वास्थ्य साथी। मुझसे अपने स्वास्थ्य या अपने शहर की स्थितियों के बारे में कुछ भी पूछें।",
    placeholder: "लक्षणों, स्वास्थ्य अलर्ट आदि के बारे में पूछें।",
    send: "भेजें",
    responseFailed: "प्रतिक्रिया विफल",
    shopOnline: "दवाएं ऑनलाइन खरीदें",
  },
  mr: {
    title: "आरोग्यमित्र एआय सहाय्यक",
    description: "तुमचा वैयक्तिक आरोग्य मित्र। मला तुमच्या आरोग्याबद्दल किंवा तुमच्या शहरातील परिस्थितीबद्दल काहीही विचारा.",
    placeholder: "लक्षणे, आरोग्य सूचना इत्यादींबद्दल विचारा.",
    send: "पाठवा",
    responseFailed: "प्रतिसाद अयशस्वी",
    shopOnline: "औषधे ऑनलाइन खरेदी करा",
  },
  kn: {
    title: "ಆರೋಗ್ಯಮಿತ್ರ AI ಸಹಾಯಕ",
    description: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಸ್ನೇಹಿತ. ನಿಮ್ಮ ಆರೋಗ್ಯ ಅಥವಾ ನಿಮ್ಮ ನಗರದ ಪರಿಸ್ಥಿತಿಗಳ ಬಗ್ಗೆ ನನ್ನನ್ನು ಏನು ಬೇಕಾದರೂ ಕೇಳಿ.",
    placeholder: "ರೋಗಲಕ್ಷಣಗಳು, ಆರೋಗ್ಯ ಎಚ್ಚರಿಕೆಗಳು, ಇತ್ಯಾದಿಗಳ ಬಗ್ಗೆ ಕೇಳಿ.",
    send: "ಕಳುಹಿಸು",
    responseFailed: "ಪ್ರತಿಕ್ರಿಯೆ ವಿಫಲವಾಗಿದೆ",
    shopOnline: "ಔಷಧಿಗಳನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಖರೀದಿಸಿ",
  },
  te: {
    title: "ఆరోగ్యమిత్ర AI అసిస్టెంట్",
    description: "మీ వ్యక్తిగత ఆరోగ్య స్నేహితుడు. మీ ఆరోగ్యం లేదా మీ నగరంలోని పరిస్థితుల గురించి నన్ను ఏదైనా అడగండి.",
    placeholder: "లక్షణాలు, ఆరోగ్య హెచ్చరికలు మొదలైన వాటి గురించి అడగండి.",
    send: "పంపు",
    responseFailed: "ప్రతిస్పందన విఫలమైంది",
    shopOnline: "మందులను ఆన్‌లైన్‌లో కొనండి",
  },
  ta: {
    title: "ஆரோக்கியமித்ரா AI உதவியாளர்",
    description: "உங்கள் தனிப்பட்ட சுகாதார நண்பர். உங்கள் உடல்நலம் அல்லது உங்கள் நகரத்தில் உள்ள நிலைமைகள் பற்றி என்னிடம் எதையும் கேளுங்கள்.",
    placeholder: "அறிகுறிகள், சுகாதார எச்சரிக்கைகள் போன்றவற்றைப் பற்றிக் கேளுங்கள்.",
    send: "அனுப்பு",
    responseFailed: "பதில் தோல்வியுற்றது",
    shopOnline: "ஆன்லைனில் மருந்துகளை வாங்கவும்",
  },
  san: {
    title: "आरोग्यमित्र-AI-सहायकः",
    description: "भवतः व्यक्तिगतः स्वास्थ्यबन्धुः। मम स्वास्थ्यं वा भवतः नगरे स्थितयः विषये किमपि पृच्छन्तु।",
    placeholder: "लक्षणानि, स्वास्थ्यसूचनाः इत्यादीन् विषये पृच्छन्तु।",
    send: "प्रेषय",
    responseFailed: "प्रतिભાવઃ विफलः",
    shopOnline: "औषधानि जालतः क्रीणन्तु",
  },
};

interface Message {
    sender: 'user' | 'ai';
    text: string;
    metadata?: CitizenHealthBuddyOutput;
}

export function CitizenHealthBuddy() {
  const { language } = useLanguage();
  const { city } = useCity();
  const t = content[language];
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await getHealthBuddyResponse({ query: input, city, language });

    if (result.success && result.data) {
        const aiMessage: Message = { sender: 'ai', text: result.data.responseText, metadata: result.data };
        setMessages((prev) => [...prev, aiMessage]);
    } else {
        toast({
            variant: "destructive",
            title: t.responseFailed,
            description: result.error || "An unknown error occurred.",
        });
        const errorMessage: Message = { sender: 'ai', text: `Sorry, I encountered an error. ${result.error}` };
        setMessages((prev) => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <ScrollArea className="flex-1 w-full p-4 border rounded-lg" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'ai' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        {msg.metadata?.intent === 'symptom_check' && (
                            <div className="mt-3 space-y-3">
                                {msg.metadata.medicationSearchQuery && (
                                    <Button asChild size="sm">
                                        <Link href={`https://www.1mg.com/search/all?name=${msg.metadata.medicationSearchQuery}`} target="_blank" rel="noopener noreferrer">
                                            <LinkIcon className="mr-2 h-4 w-4" />
                                            {t.shopOnline}
                                        </Link>
                                    </Button>
                                )}
                                {msg.metadata.disclaimer && (
                                     <Alert variant="destructive" className="bg-background/80">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Disclaimer</AlertTitle>
                                        <AlertDescription>
                                            {msg.metadata.disclaimer}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        )}
                    </div>
                     {msg.sender === 'user' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">{t.send}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
