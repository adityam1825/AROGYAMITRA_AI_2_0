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
  age: z.number().optional().describe('The age of the user.'),
  language: LanguageEnum.describe('The language for the guidance.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  guidance: z
    .string()
    .describe('Basic, non-diagnostic guidance based on the symptoms.'),
  medicationSuggestions: z
    .string()
    .describe(
      'General, non-prescriptive suggestions for over-the-counter medication categories.'
    ),
  disclaimer: z
    .string()
    .describe('A mandatory disclaimer that this is not medical advice.'),
  audio: z
    .string()
    .describe('The base64 encoded WAV audio data URI for the guidance.'),
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
  output: {
    schema: z.object({
      guidance: z.string(),
      medicationSuggestions: z.string(),
      disclaimer: z.string(),
    }),
  },
  prompt: `You are a helpful AI assistant providing basic health guidance. A user has described their symptoms and provided their age.
  
  IMPORTANT: You must NOT provide a medical diagnosis or a prescription. Your primary goal is to offer safe, general advice and suggest when it is appropriate to see a doctor.

  User Age: {{{age}}}
  User Symptoms: "{{{symptoms}}}"

  Based on these symptoms, generate the following in the language specified by the language code: {{{language}}}:
  
  1.  **Guidance**: A short, one or two-sentence piece of general guidance.
  2.  **Medication Suggestions**: Suggest GENERAL CATEGORIES of over-the-counter (OTC) medications that may help relieve the symptoms. DO NOT suggest specific brand names, dosages, or frequencies. For example, suggest "pain relievers (analgesics)" instead of "Take 500mg Paracetamol every 6 hours". Mention that dosage should be as per the instructions on the package or by a doctor.
  3.  **Disclaimer**: A clear, mandatory disclaimer stating "This is not medical advice. Always consult a doctor or pharmacist before taking any medication." or its equivalent in the target language.

  Generate only the structured output.
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

    const combinedText = `
      Guidance: ${textOutput.guidance}.
      Suggested Medications: ${textOutput.medicationSuggestions}.
      Important Disclaimer: ${textOutput.disclaimer}.
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
