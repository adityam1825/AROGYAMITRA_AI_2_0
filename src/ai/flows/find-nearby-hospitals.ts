'use server';
/**
 * @fileOverview An AI flow to find nearby hospitals using a tool.
 *
 * - findNearbyHospitals - A function that returns a list of hospitals for a given city.
 * - FindNearbyHospitalsInput - The input type for the function.
 * - FindNearbyHospitalsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  FindNearbyHospitalsInputSchema,
  FindNearbyHospitalsOutputSchema,
  type FindNearbyHospitalsInput,
  type FindNearbyHospitalsOutput,
} from '@/ai/schemas';

// Mock database of hospitals
const hospitalData: Record<string, { name: string; address: string }[]> = {
    Mumbai: [
        { name: "Lilavati Hospital and Research Centre", address: "Bandra West" },
        { name: "Kokilaben Dhirubhai Ambani Hospital", address: "Andheri West" },
        { name: "Breach Candy Hospital", address: "Cumballa Hill" },
    ],
    Delhi: [
        { name: "AIIMS", address: "Ansari Nagar" },
        { name: "Max Healthcare", address: "Saket" },
    ],
    Bangalore: [
        { name: "Manipal Hospital", address: "Old Airport Road" },
        { name: "Fortis Hospital", address: "Bannerghatta Road" },
    ],
    Kolkata: [
        { name: "Apollo Gleneagles Hospitals", address: "Canal Circular Road" },
        { name: "Fortis Hospital", address: "Anandapur" },
    ],
    Chennai: [
        { name: "Apollo Hospital", address: "Greams Road" },
        { name: "Fortis Malar Hospital", address: "Adyar" },
    ],
    Pune: [
        { name: "Ruby Hall Clinic", address: "Sassoon Road" },
        { name: "Jehangir Hospital", address: "Sassoon Road" },
    ]
};

// Define the tool for the AI to use
const getHospitalsByCityTool = ai.defineTool(
  {
    name: 'getHospitalsByCity',
    description: 'Returns a list of hospitals for a given city.',
    inputSchema: z.object({
      city: z.string().describe('The city to search for hospitals in.'),
    }),
    outputSchema: z.array(z.object({ name: z.string(), address: z.string() })),
  },
  async (input) => {
    console.log(`Tool called: Searching for hospitals in ${input.city}`);
    const cityKey = Object.keys(hospitalData).find(key => key.toLowerCase() === input.city.toLowerCase());
    return cityKey ? hospitalData[cityKey] : [];
  }
);

export async function findNearbyHospitals(input: FindNearbyHospitalsInput): Promise<FindNearbyHospitalsOutput> {
  return findNearbyHospitalsFlow(input);
}

const findHospitalsPrompt = ai.definePrompt({
    name: 'findNearbyHospitalsPrompt',
    input: { schema: FindNearbyHospitalsInputSchema },
    output: { schema: FindNearbyHospitalsOutputSchema },
    tools: [getHospitalsByCityTool],
    prompt: `You are a helpful assistant. A user in {{{city}}} needs to find nearby hospitals.
    Use the 'getHospitalsByCity' tool to find a list of hospitals.
    If the tool returns hospitals, format them into the required output structure.
    If the tool returns an empty list, return an empty list of hospitals.
    Do not invent hospitals. Only return what the tool provides.
    `,
});

const findNearbyHospitalsFlow = ai.defineFlow(
  {
    name: 'findNearbyHospitalsFlow',
    inputSchema: FindNearbyHospitalsInputSchema,
    outputSchema: FindNearbyHospitalsOutputSchema,
  },
  async (input) => {
    const { output } = await findHospitalsPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a response or find hospitals.');
    }
    return output;
  }
);
