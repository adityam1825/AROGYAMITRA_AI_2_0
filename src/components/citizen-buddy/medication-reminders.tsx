
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, PlusCircle, Trash2, Clock, Pill } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const content = {
  en: {
    title: "Medication Reminders",
    description: "Set reminders for your medicines. You'll receive a notification.",
    medicineName: "Medicine Name",
    medicinePlaceholder: "e.g., Paracetamol",
    dosage: "Dosage",
    dosagePlaceholder: "e.g., 1 tablet",
    time: "Time",
    addReminder: "Add Reminder",
    noReminders: "No reminders set yet.",
    reminders: "Your Reminders",
    reminderAlertTitle: "Medication Reminder",
    reminderAlertDesc: (medicine: string, dosage: string) => `Time to take your ${medicine}${dosage ? ` (${dosage})` : ''}.`,
  },
  hi: {
    title: "दवा अनुस्मारक",
    description: "अपनी दवाओं के लिए अनुस्मारक सेट करें। आपको एक सूचना प्राप्त होगी।",
    medicineName: "दवा का नाम",
    medicinePlaceholder: "जैसे, पैरासिटामोल",
    dosage: "खुराक",
    dosagePlaceholder: "जैसे, 1 टैबलेट",
    time: "समय",
    addReminder: "अनुस्मारक जोड़ें",
    noReminders: "अभी तक कोई अनुस्मारक सेट नहीं है।",
    reminders: "आपके अनुस्मारक",
    reminderAlertTitle: "दवा अनुस्मारक",
    reminderAlertDesc: (medicine: string, dosage: string) => `अपनी ${medicine}${dosage ? ` (${dosage})` : ''} लेने का समय।`,
  },
  mr: {
    title: "औषध स्मरणपत्रे",
    description: "तुमच्या औषधांसाठी स्मरणपत्रे सेट करा. तुम्हाला एक सूचना मिळेल.",
    medicineName: "औषधाचे नाव",
    medicinePlaceholder: "उदा., पॅरासिटामॉल",
    dosage: "डोस",
    dosagePlaceholder: "उदा., १ टॅबलेट",
    time: "वेळ",
    addReminder: "स्मरणपत्र जोडा",
    noReminders: "अद्याप कोणतीही स्मरणपत्रे सेट केलेली नाहीत.",
    reminders: "तुमची स्मरणपत्रे",
    reminderAlertTitle: "औषध स्मरणपत्र",
    reminderAlertDesc: (medicine: string, dosage: string) => `तुमचे ${medicine}${dosage ? ` (${dosage})` : ''} घेण्याची वेळ झाली आहे.`,
  },
  kn: {
    title: "ಔಷಧಿ ಜ್ಞಾಪನೆಗಳು",
    description: "ನಿಮ್ಮ ಔಷಧಿಗಳಿಗಾಗಿ ಜ್ಞಾಪನೆಗಳನ್ನು ಹೊಂದಿಸಿ. ನೀವು ಅಧಿಸೂಚನೆಯನ್ನು ಸ್ವೀಕರಿಸುವಿರಿ.",
    medicineName: "ಔಷಧದ ಹೆಸರು",
    medicinePlaceholder: "ಉದಾ., ಪ್ಯಾರಾಸಿಟಮಾಲ್",
    dosage: "ಡೋಸೇಜ್",
    dosagePlaceholder: "ಉದಾ., 1 ಮಾತ್ರೆ",
    time: "ಸಮಯ",
    addReminder: "ಜ್ಞಾಪನೆಯನ್ನು ಸೇರಿಸಿ",
    noReminders: "ಯಾವುದೇ ಜ್ಞಾಪನೆಗಳನ್ನು ಹೊಂದಿಸಲಾಗಿಲ್ಲ.",
    reminders: "ನಿಮ್ಮ ಜ್ಞಾಪನೆಗಳು",
    reminderAlertTitle: "ಔಷಧಿ ಜ್ಞಾಪನೆ",
    reminderAlertDesc: (medicine: string, dosage: string) => `ನಿಮ್ಮ ${medicine}${dosage ? ` (${dosage})` : ''} ತೆಗೆದುಕೊಳ್ಳುವ ಸಮಯ.`,
  },
  te: {
    title: "మందుల రిమైండర్లు",
    description: "మీ మందుల కోసం రిమైండర్లను సెట్ చేయండి. మీరు ఒక నోటిఫికేషన్ అందుకుంటారు.",
    medicineName: "మందు పేరు",
    medicinePlaceholder: "ఉదా., పారాసెటమాల్",
    dosage: "మోతాదు",
    dosagePlaceholder: "ఉదా., 1 టాబ్లెట్",
    time: "సమయం",
    addReminder: "రిమైండర్ను జోడించు",
    noReminders: "ఇంకా రిమైండర్లు సెట్ చేయబడలేదు.",
    reminders: "మీ రిమైండర్లు",
    reminderAlertTitle: "మందుల రిమైండర్",
    reminderAlertDesc: (medicine: string, dosage: string) => `మీ ${medicine}${dosage ? ` (${dosage})` : ''} తీసుకునే సమయం.`,
  },
  ta: {
    title: "மருந்து நினைவூட்டல்கள்",
    description: "உங்கள் மருந்துகளுக்கான நினைவூட்டல்களை அமைக்கவும். நீங்கள் ஒரு அறிவிப்பைப் பெறுவீர்கள்.",
    medicineName: "மருந்து பெயர்",
    medicinePlaceholder: "எ.கா., பாராசிட்டமால்",
    dosage: "மருந்தளவு",
    dosagePlaceholder: "எ.கா., 1 மாத்திரை",
    time: "நேரம்",
    addReminder: "நினைவூட்டலைச் சேர்",
    noReminders: "நினைவூட்டல்கள் எதுவும் அமைக்கப்படவில்லை.",
    reminders: "உங்கள் நினைவூட்டல்கள்",
    reminderAlertTitle: "மருந்து நினைவூட்டல்",
    reminderAlertDesc: (medicine: string, dosage: string) => `உங்கள் ${medicine}${dosage ? ` (${dosage})` : ''} எடுத்துக்கொள்ள வேண்டிய நேரம்.`,
  },
  sa: {
    title: "औषधस्मारकाणि",
    description: "स्वस्य औषधानां कृते स्मारकाणि स्थापयन्तु। भवन्तः सूचनां प्राప్स्यन्ति।",
    medicineName: "औषधस्य नाम",
    medicinePlaceholder: "यथा, Paracetamol",
    dosage: "मात्रा",
    dosagePlaceholder: "यथा, एका गुटिका",
    time: "समयः",
    addReminder: "स्मारकं योजयन्तु",
    noReminders: "अद्यावधि किमपि स्मारकं न स्थापितम्।",
    reminders: "भवतां स्मारकाणि",
    reminderAlertTitle: "औषधस्मारकम्",
    reminderAlertDesc: (medicine: string, dosage: string) => `भवतः ${medicine}${dosage ? ` (${dosage})` : ''} स्वीकर्तुं समयः।`,
  },
};

interface Reminder {
  id: number;
  medicine: string;
  dosage: string;
  time: string;
  lastTriggeredDate: string | null;
}

export function MedicationReminders() {
  const { language } = useLanguage();
  const t = content[language];
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('09:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
      const currentDate = now.toISOString().slice(0, 10); // YYYY-MM-DD format

      reminders.forEach((reminder) => {
        if (reminder.time === currentTime && reminder.lastTriggeredDate !== currentDate) {
          // Trigger the reminder
          toast({
            title: t.reminderAlertTitle,
            description: t.reminderAlertDesc(reminder.medicine, reminder.dosage),
          });

          // Mark as triggered for today
          setReminders((prevReminders) =>
            prevReminders.map((r) =>
              r.id === reminder.id ? { ...r, lastTriggeredDate: currentDate } : r
            )
          );
        }
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [reminders, t, toast]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicine.trim() || !time.trim()) return;
    
    const newReminder: Reminder = {
      id: Date.now(),
      medicine,
      dosage,
      time,
      lastTriggeredDate: null,
    };

    setReminders([...reminders, newReminder]);
    setMedicine('');
    setDosage('');
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            <CardTitle>{t.title}</CardTitle>
        </div>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAddReminder} className="space-y-4">
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className="space-y-2">
                    <Label htmlFor="medicine">{t.medicineName}</Label>
                    <Input id="medicine" placeholder={t.medicinePlaceholder} value={medicine} onChange={(e) => setMedicine(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dosage">{t.dosage}</Label>
                    <Input id="dosage" placeholder={t.dosagePlaceholder} value={dosage} onChange={(e) => setDosage(e.target.value)} />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="time">{t.time}</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t.addReminder}
            </Button>
        </form>
        
        <Separator />

        <div className='space-y-2'>
            <h3 className="text-md font-semibold">{t.reminders}</h3>
             <ScrollArea className="h-48 w-full">
                {reminders.length > 0 ? (
                <div className="space-y-2 pr-4">
                    {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                            <Pill className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold">{reminder.medicine}</p>
                                <p className="text-sm text-muted-foreground">{reminder.dosage}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                <span>{reminder.time}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteReminder(reminder.id)} className='h-8 w-8 text-destructive hover:bg-destructive/10'>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>{t.noReminders}</p>
                </div>
                )}
            </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
