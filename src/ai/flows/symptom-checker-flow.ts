'use server';
/**
 * @fileOverview A basic symptom checker AI flow.
 *
 * - symptomChecker - A function that provides basic guidance on symptoms.
 * - SymptomCheckerInput - The input type for the function.
 * - SymptomCheckerOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const LanguageEnum = z.enum(['en', 'hi', 'mr', 'kn', 'te', 'ta', 'sa']);

const SymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('The user-described symptoms.'),
  language: LanguageEnum.describe('The language for the guidance.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  guidance: z
    .string()
    .describe('Basic, non-diagnostic guidance based on the symptoms.'),
  audio: z.string().describe('The base64 encoded WAV audio data URI for the guidance.'),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(
  input: SymptomCheckerInput
): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const guidancePrompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: { schema: SymptomCheckerInputSchema },
  output: { schema: z.object({ guidance: z.string() }) },
  prompt: `You are a helpful AI assistant providing basic health guidance. A user has described their symptoms. 
  
  IMPORTANT: You must not provide a diagnosis. Your primary goal is to offer safe, general advice and suggest when it might be appropriate to see a doctor.

  User Symptoms: "{{{symptoms}}}"

  Based on these symptoms, provide a short, one or two-sentence piece of general guidance in the language specified by the language code: {{{language}}}.

  Start your response with a clear disclaimer like "This is not a medical diagnosis." or its equivalent in the target language.
  
  Example Guidance:
  - For a headache: "This is not a medical diagnosis. For a mild headache, resting in a quiet, dark room and staying hydrated may help. If the headache is severe or persistent, it is best to consult a doctor."
  - For a cough: "This is not a medical diagnosis. A persistent cough can have many causes. Drinking warm fluids and using a humidifier may provide some relief. If your cough is severe or you have trouble breathing, please seek medical attention."

  Generate only the guidance text.
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

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async (input) => {
    const { output: textOutput } = await guidancePrompt(input);
    if (!textOutput) {
      throw new Error('Failed to generate text guidance.');
    }

    // Sanskrit 'sa' is not supported by the TTS model, fallback to Hindi 'hi'.
    const speechLanguage = input.language === 'sa' ? 'hi' : input.language;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
      },
      prompt: textOutput.guidance,
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
