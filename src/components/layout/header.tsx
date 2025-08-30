'use client';

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
import { Globe } from 'lucide-react';

export function Header() {
  const { language, setLanguage } = useLanguage();

  const languageLabels: Record<Language, string> = {
    en: 'English',
    hi: 'हिन्दी',
    mr: 'मराठी',
    kn: 'ಕನ್ನಡ',
    te: 'తెలుగు',
    ta: 'தமிழ்',
    sa: 'संस्कृतम्',
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1">
        {/* Can add a search bar here if needed */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
             <Globe className="h-4 w-4" />
             <span>{languageLabels[language]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hi">हिन्दी</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mr">मराठी</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="kn">ಕನ್ನಡ</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="te">తెలుగు</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ta">தமிழ்</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="sa">संस्कृतम्</DropdownMenuRadioItem>
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
