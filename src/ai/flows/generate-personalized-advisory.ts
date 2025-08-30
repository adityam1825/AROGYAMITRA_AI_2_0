'use server';

/**
 * @fileOverview Generates personalized health advisories for citizens.
 *
 * - generatePersonalizedAdvisory - Generates health tips based on city conditions.
 * - GeneratePersonalizedAdvisoryInput - Input type for the function.
 * - GeneratePersonalizedAdvisoryOutput - Return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const LanguageEnum = z.enum(['en', 'hi', 'mr', 'kn', 'te', 'ta', 'sa']);

const GeneratePersonalizedAdvisoryInputSchema = z.object({
  city: z.string().describe('The city for which to generate the advisory.'),
  language: LanguageEnum.describe('The language for the advisory.'),
});

export type GeneratePersonalizedAdvisoryInput = z.infer<
  typeof GeneratePersonalizedAdvisoryInputSchema
>;

const GeneratePersonalizedAdvisoryOutputSchema = z.object({
  surgeAdvisory: z.string().describe('Health advisory related to hospital patient surges.'),
  aqiAdvisory: z.string().describe('Health advisory related to air quality index (AQI).'),
  eventAdvisory: z.string().describe('Health advisory related to upcoming major public events.'),
  audio: z.string().optional().describe('The base64 encoded WAV audio data URI for the combined advisory.'),
});

export type GeneratePersonalizedAdvisoryOutput = z.infer<
  typeof GeneratePersonalizedAdvisoryOutputSchema
>;

export async function generatePersonalizedAdvisory(
  input: GeneratePersonalizedAdvisoryInput
): Promise<GeneratePersonalizedAdvisoryOutput> {
  return generatePersonalizedAdvisoryFlow(input);
}

const advisoryPrompt = ai.definePrompt({
  name: 'generatePersonalizedAdvisoryPrompt',
  input: {schema: z.object({ city: z.string(), language: LanguageEnum })},
  output: {schema: z.object({
    surgeAdvisory: z.string(),
    aqiAdvisory: z.string(),
    eventAdvisory: z.string(),
  })},
  prompt: `You are a public health expert providing personalized advisories.
  
  Generate three separate, concise, one-sentence health advisories for a citizen in {{{city}}}.
  The response should be in the language specified by the language code: {{{language}}}.

  1.  **Hospital Surge Advisory**: Create a tip based on a potential increase in patient admissions. Assume a moderate surge is expected.
  2.  **Air Quality Advisory**: Create a tip based on the Air Quality Index. Assume the AQI is "Unhealthy" at 158.
  3.  **Public Event Advisory**: Create a tip based on an upcoming major festival or event in the city. For Indian cities, assume a major festival like Ganesh Chaturthi or Diwali is approaching.

  Provide only the advisory sentences.
`,
});

const generatePersonalizedAdvisoryFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedAdvisoryFlow',
    inputSchema: GeneratePersonalizedAdvisoryInputSchema,
    outputSchema: GeneratePersonalizedAdvisoryOutputSchema,
  },
  async (input) => {
    const {output} = await advisoryPrompt(input);
    if (!output) {
        throw new Error("Failed to generate text advisory.");
    }
    return output;
  }
);
