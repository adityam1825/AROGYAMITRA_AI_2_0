import { z } from 'genkit';

const LanguageEnum = z.enum(['en', 'hi', 'mr', 'kn', 'te', 'ta', 'san']);

export const CitizenHealthBuddyInputSchema = z.object({
  query: z.string().describe("The user's health-related query."),
  city: z.string().describe("The user's city for localized advisories."),
  language: LanguageEnum.describe('The language for the response.'),
});
export type CitizenHealthBuddyInput = z.infer<
  typeof CitizenHealthBuddyInputSchema
>;

export const CitizenHealthBuddyOutputSchema = z.object({
  responseText: z
    .string()
    .describe('A conversational, helpful response to the user\'s query.'),
  intent: z
    .enum(['symptom_check', 'health_advisory', 'general_query'])
    .describe("The AI's classification of the user's intent."),
  medicationSearchQuery: z
    .string()
    .optional()
    .describe(
      'A URL-encoded search query if medication suggestions are relevant.'
    ),
  disclaimer: z
    .string()
    .optional()
    .describe(
      'A medical disclaimer if symptom-related advice is given.'
    ),
});
export type CitizenHealthBuddyOutput = z.infer<
  typeof CitizenHealthBuddyOutputSchema
>;

export const FindNearbyHospitalsInputSchema = z.object({
  city: z.string().describe('The city where the user is located.'),
});
export type FindNearbyHospitalsInput = z.infer<typeof FindNearbyHospitalsInputSchema>;

const HospitalSchema = z.object({
    name: z.string().describe('The name of the hospital.'),
    address: z.string().describe('The address or locality of the hospital.'),
    distance: z.string().optional().describe('The approximate distance from the user.'),
});

export const FindNearbyHospitalsOutputSchema = z.object({
  hospitals: z.array(HospitalSchema).describe('A list of nearby hospitals.'),
});
export type FindNearbyHospitalsOutput = z.infer<typeof FindNearbyHospitalsOutputSchema>;
