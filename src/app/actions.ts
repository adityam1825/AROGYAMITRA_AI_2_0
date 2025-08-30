'use server';

import {
  generateSurgePredictions,
  type GenerateSurgePredictionsInput,
  type GenerateSurgePredictionsOutput,
} from "@/ai/flows/generate-surge-predictions";

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
