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
