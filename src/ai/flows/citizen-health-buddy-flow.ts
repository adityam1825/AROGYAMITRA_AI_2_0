'use server';
/**
 * @fileOverview A comprehensive citizen health buddy AI flow.
 *
 * - citizenHealthBuddy - A function that provides guidance based on a user's query.
 * - CitizenHealthBuddyInput - The input type for the function.
 * - CitizenHealthBuddyOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {
  CitizenHealthBuddyInputSchema,
  CitizenHealthBuddyOutputSchema,
  type CitizenHealthBuddyInput,
  type CitizenHealthBuddyOutput,
} from '@/ai/schemas';

export async function citizenHealthBuddy(
  input: CitizenHealthBuddyInput
): Promise<CitizenHealthBuddyOutput> {
  return citizenHealthBuddyFlow(input);
}

const buddyPrompt = ai.definePrompt({
  name: 'citizenHealthBuddyPrompt',
  input: { schema: CitizenHealthBuddyInputSchema },
  output: { schema: CitizenHealthBuddyOutputSchema },
  prompt: `You are "ArogyaMitra AI", a comprehensive and friendly AI health assistant. Your goal is to provide helpful, safe, and context-aware health guidance. The user is in {{{city}}}. Respond in the language specified by the language code: {{{language}}}.

  Analyze the user's query: "{{{query}}}"

  First, determine the user's primary intent. It can be one of three things:
  1. 'symptom_check': If the query describes specific health symptoms (e.g., "I have a headache," "fever and cough").
  2. 'health_advisory': If the query is about general health, risks, or conditions in their city (e.g., "how is the air quality?", "any health alerts for Mumbai?").
  3. 'general_query': For any other health-related question.

  Based on the intent, generate a response following these rules:

  IF INTENT IS 'symptom_check':
  1.  Provide a short, one or two-sentence piece of general guidance.
  2.  Suggest GENERAL CATEGORIES of over-the-counter (OTC) medications that might help. DO NOT suggest brand names, dosages, or frequencies. For example, suggest "pain relievers" instead of "Paracetamol".
  3.  Create a 'medicationSearchQuery' with URL-encoded key medical terms (e.g., "pain%20relievers%20decongestants").
  4.  Provide a mandatory 'disclaimer': "This is not medical advice. Always consult a doctor or pharmacist before taking any medication." or its equivalent in the target language.
  5.  Combine all of this into a single, conversational 'responseText'.

  IF INTENT IS 'health_advisory':
  1.  Generate a health advisory based on the user's city, {{{city}}}.
  2.  Assume a moderate hospital patient surge is expected.
  3.  Assume the Air Quality Index (AQI) is "Unhealthy" at 158.
  4.  Assume a major public festival (like Diwali) is approaching.
  5.  Combine these points into a helpful, conversational 'responseText'. Do not provide a disclaimer or medication search query.

  IF INTENT IS 'general_query':
  1.  Provide a helpful, safe, and general answer to the user's question.
  2.  Do not provide a disclaimer or medication search query.

  Always be empathetic and clear. Generate only the structured output.
  `,
});

const citizenHealthBuddyFlow = ai.defineFlow(
  {
    name: 'citizenHealthBuddyFlow',
    inputSchema: CitizenHealthBuddyInputSchema,
    outputSchema: CitizenHealthBuddyOutputSchema,
  },
  async (input) => {
    const { output } = await buddyPrompt(input);
    if (!output) {
      throw new Error('Failed to generate a response.');
    }
    return output;
  }
);
