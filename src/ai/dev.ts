import { config } from 'dotenv';
config();

import '@/ai/flows/generate-surge-predictions.ts';
import '@/ai/flows/text-to-speech';
import '@/ai/flows/generate-personalized-advisory';
import '@/ai/flows/symptom-checker-flow';
import '@/ai/flows/citizen-health-buddy-flow';
import '@/ai/flows/find-nearby-hospitals';
