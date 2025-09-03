'use server';

/**
 * @fileOverview Predicts patient surges based on a given city.
 *
 * - generateSurgePredictions - A function that generates patient surge predictions.
 * - GenerateSurgePredictionsInput - The input type for the generateSurgePredictions function.
 * - GenerateSurgePredictionsOutput - The return type for the generateSurgePredictions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LanguageEnum = z.enum(['en', 'hi', 'mr', 'kn', 'te', 'ta', 'san']);

const GenerateSurgePredictionsInputSchema = z.object({
  city: z.string().describe('The city for which to generate the prediction.'),
  language: LanguageEnum.describe('The language for the prediction.'),
});

export type GenerateSurgePredictionsInput = z.infer<
  typeof GenerateSurgePredictionsInputSchema
>;

const GenerateSurgePredictionsOutputSchema = z.object({
  predictedSurge: z
    .string()
    .describe(
      'Predicted patient surge levels with start date, end date, and expected number of patients.'
    ),
  confidenceLevel: z
    .string()
    .describe('Confidence level of the prediction (Low, Medium, High).'),
  recommendations: z
    .string()
    .describe(
      'Recommendations for resource allocation and staffing based on the predicted surge.'
    ),
  audio: z.string().optional().describe('The base64 encoded WAV audio data URI for the prediction summary.'),
});

export type GenerateSurgePredictionsOutput = z.infer<
  typeof GenerateSurgePredictionsOutputSchema
>;

export async function generateSurgePredictions(
  input: GenerateSurgePredictionsInput
): Promise<GenerateSurgePredictionsOutput> {
  return generateSurgePredictionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSurgePredictionsPrompt',
  input: {schema: z.object({ city: z.string(), language: LanguageEnum })},
  output: {schema: z.object({
    predictedSurge: z.string(),
    confidenceLevel: z.string(),
    recommendations: z.string(),
  })},
  prompt: `You are an expert in predicting patient surges in hospitals for a given city.

  Based on your general knowledge of weather patterns, pollution levels, and major public events for {{{city}}}, predict the patient surge levels for the next 7 days.

  Provide the predicted surge, confidence level, and recommendations in a clear and concise manner.
  The response should be in the language specified by the language code: {{{language}}}.
  The confidence level should be one of "Low", "Medium", or "High".
  The recommendations should be a few bullet points.
`,
});


const generateSurgePredictionsFlow = ai.defineFlow(
  {
    name: 'generateSurgePredictionsFlow',
    inputSchema: GenerateSurgePredictionsInputSchema,
    outputSchema: GenerateSurgePredictionsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("Failed to generate text prediction.");
    }
    return output;
  }
);
