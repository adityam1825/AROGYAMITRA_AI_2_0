'use server';

import {
  generateSurgePredictions,
  type GenerateSurgePredictionsInput,
  type GenerateSurgePredictionsOutput,
} from "@/ai/flows/generate-surge-predictions";
import {
  textToSpeech,
  type TextToSpeechInput,
  type TextToSpeechOutput,
} from '@/ai/flows/text-to-speech';
import {
  generatePersonalizedAdvisory,
  type GeneratePersonalizedAdvisoryInput,
  type GeneratePersonalizedAdvisoryOutput,
} from '@/ai/flows/generate-personalized-advisory';
import {
  symptomChecker,
  type SymptomCheckerInput,
  type SymptomCheckerOutput,
} from '@/ai/flows/symptom-checker-flow';
import {
  citizenHealthBuddy
} from '@/ai/flows/citizen-health-buddy-flow';
import type { CitizenHealthBuddyInput, CitizenHealthBuddyOutput } from '@/ai/schemas';


export async function getSurgePredictions(input: GenerateSurgePredictionsInput): Promise<{
    success: boolean;
    data?: GenerateSurgePredictionsOutput;
    error?: string;
}> {
    try {
        const result = await generateSurgePredictions(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating surge predictions:", error);
        
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { success: false, error: `Failed to generate surge predictions: ${errorMessage}` };
    }
}

export async function generateSpeech(
  input: TextToSpeechInput
): Promise<{ success: boolean; data?: TextToSpeechOutput; error?: string }> {
  try {
    const result = await textToSpeech(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating speech:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: `Failed to generate speech: ${errorMessage}` };
  }
}

export async function getPersonalizedAdvisory(input: GeneratePersonalizedAdvisoryInput): Promise<{
    success: boolean;
    data?: GeneratePersonalizedAdvisoryOutput;
    error?: string;
}> {
    try {
        const result = await generatePersonalizedAdvisory(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating personalized advisory:", error);
        
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { success: false, error: `Failed to generate advisory: ${errorMessage}` };
    }
}

export async function getSymptomGuidance(input: SymptomCheckerInput): Promise<{
    success: boolean;
    data?: SymptomCheckerOutput;
    error?: string;
}> {
    try {
        const result = await symptomChecker(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating symptom guidance:", error);
        
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { success: false, error: `Failed to generate guidance: ${errorMessage}` };
    }
}

export async function getHealthBuddyResponse(input: CitizenHealthBuddyInput): Promise<{
    success: boolean;
    data?: CitizenHealthBuddyOutput;
    error?: string;
}> {
    try {
        const result = await citizenHealthBuddy(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating health buddy response:", error);
        
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { success: false, error: `Failed to generate response: ${errorMessage}` };
    }
}
