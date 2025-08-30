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
  audio: z.string().describe('The base64 encoded WAV audio data URI for the combined advisory.'),
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

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generatePersonalizedAdvisoryFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedAdvisoryFlow',
    inputSchema: GeneratePersonalizedAdvisoryInputSchema,
    outputSchema: GeneratePersonalizedAdvisoryOutputSchema,
  },
  async (input) => {
    const {output: textOutput} = await advisoryPrompt(input);
    if (!textOutput) {
        throw new Error("Failed to generate text advisory.");
    }
    
    const combinedText = `
        Hospital Surge Advisory: ${textOutput.surgeAdvisory}.
        Air Quality Advisory: ${textOutput.aqiAdvisory}.
        Public Event Advisory: ${textOutput.eventAdvisory}.
    `;

    // Sanskrit 'sa' is not supported by the TTS model, fallback to Hindi 'hi'.
    const speechLanguage = input.language === 'sa' ? 'hi' : input.language;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
      },
      prompt: combinedText,
    });

    if (!media || !media.url) {
      throw new Error('No audio media returned from the model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavData = await toWav(audioBuffer);

    return {
        ...textOutput,
        audio: 'data:audio/wav;base64,' + wavData,
    };
  }
);
