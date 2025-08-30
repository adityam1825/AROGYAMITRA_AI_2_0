'use server';

/**
 * @fileOverview Predicts patient surges based on historical data, real-time pollution levels, and event calendars.
 *
 * - generateSurgePredictions - A function that generates patient surge predictions.
 * - GenerateSurgePredictionsInput - The input type for the generateSurgePredictions function.
 * - GenerateSurgePredictionsOutput - The return type for the generateSurgePredictions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSurgePredictionsInputSchema = z.object({
  historicalData: z
    .string()
    .describe('Historical patient admission data as a JSON string.'),
  realtimePollutionLevels: z
    .string()
    .describe('Real-time pollution levels data as a JSON string.'),
  eventCalendar: z
    .string()
    .describe('Event calendar data including festivals as a JSON string.'),
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
  input: {schema: GenerateSurgePredictionsInputSchema},
  output: {schema: GenerateSurgePredictionsOutputSchema},
  prompt: `You are an expert in predicting patient surges in hospitals.

  Based on the historical data, real-time pollution levels, and event calendar data provided, predict the patient surge levels, confidence level, and recommendations for resource allocation and staffing.

  Historical Data: {{{historicalData}}}
  Real-time Pollution Levels: {{{realtimePollutionLevels}}}
  Event Calendar: {{{eventCalendar}}}

  Provide the predicted surge, confidence level, and recommendations in a clear and concise manner.
  Remember that the predicted surge, confidenceLevel, and recommendations are strings, and should be set appropriately.
`,
});

const generateSurgePredictionsFlow = ai.defineFlow(
  {
    name: 'generateSurgePredictionsFlow',
    inputSchema: GenerateSurgePredictionsInputSchema,
    outputSchema: GenerateSurgePredictionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
