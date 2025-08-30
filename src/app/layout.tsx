import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/context/language-context';
import { CityProvider } from '@/context/city-context';

export const metadata: Metadata = {
  title: 'SurgeGuard Mumbai',
  description: 'AI-driven healthtech platform to predict and manage patient surges in Mumbai.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <CityProvider>
            {children}
            <Toaster />
          </CityProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
