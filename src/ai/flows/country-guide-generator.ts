'use server';
/**
 * @fileOverview A country guide generator AI agent.
 *
 * - generateCountryGuide - A function that handles the country guide generation process.
 * - GenerateCountryGuideInput - The input type for the generateCountryGuide function.
 * - GenerateCountryGuideOutput - The return type for the generateCountryGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCountryGuideInputSchema = z.object({
  country: z.string().describe('The name of the country to generate a guide for.'),
});
export type GenerateCountryGuideInput = z.infer<typeof GenerateCountryGuideInputSchema>;

const GenerateCountryGuideOutputSchema = z.object({
  description: z.string().describe("A brief, engaging description of the country, suitable for a travel website. Highlight its main appeal for tourists."),
  attractions: z.array(z.string()).describe("A list of 3-4 must-see attractions or famous landmarks in the country."),
  imageHint: z.string().describe("Two keywords for a stunning, representative image of the country (e.g., 'Eiffel Tower')."),
});
export type GenerateCountryGuideOutput = z.infer<typeof GenerateCountryGuideOutputSchema>;

export async function generateCountryGuide(
  input: GenerateCountryGuideInput
): Promise<GenerateCountryGuideOutput> {
  return generateCountryGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'countryGuidePrompt',
  input: {schema: GenerateCountryGuideInputSchema},
  output: {schema: GenerateCountryGuideOutputSchema},
  prompt: `You are a travel expert creating content for a travel planning app. Generate a concise and exciting travel guide for the following country: {{{country}}}.

Focus on information that would entice a tourist to visit.

Provide a short description, 3-4 key attractions, and a two-word hint for a representative photo.
`,
});

const generateCountryGuideFlow = ai.defineFlow(
  {
    name: 'generateCountryGuideFlow',
    inputSchema: GenerateCountryGuideInputSchema,
    outputSchema: GenerateCountryGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to return a valid country guide.');
    }
    return output;
  }
);
