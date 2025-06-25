'use server';
/**
 * @fileOverview A country guide generator AI agent.
 *
 * - generateCountryGuides - A function that handles the country guide generation process for multiple countries.
 * - GenerateCountryGuidesInput - The input type for the generateCountryGuides function.
 * - GenerateCountryGuidesOutput - The return type for the generateCountryGuides function.
 * - CountryGuide - The type for a single country guide object.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCountryGuidesInputSchema = z.object({
  countries: z.array(z.string()).describe('The names of the countries to generate guides for.'),
});
export type GenerateCountryGuidesInput = z.infer<typeof GenerateCountryGuidesInputSchema>;

const DetailedAttractionSchema = z.object({
  name: z.string().describe("The name of the landmark or attraction."),
  description: z.string().describe("A detailed and engaging paragraph about this attraction, its history, and why a tourist should visit."),
  imageHint: z.string().describe("Two keywords for a representative image of this specific attraction (e.g., 'Louvre Museum').")
});

const CountryGuideSchema = z.object({
  country: z.string().describe("The name of the country for this guide."),
  description: z.string().describe("A brief, engaging description of the country, suitable for a travel website. Highlight its main appeal for tourists."),
  attractions: z.array(DetailedAttractionSchema).describe("A list of 3 must-see attractions or famous landmarks in the country, with detailed descriptions and image hints."),
  whatToDo: z.array(z.string()).describe("A list of 3-4 other fun activities or experiences for tourists (e.g., 'Take a cooking class', 'Explore the local markets')."),
  imageHint: z.string().describe("Two keywords for a stunning, representative image of the country (e.g., 'Eiffel Tower')."),
});
export type CountryGuide = z.infer<typeof CountryGuideSchema>;

const GenerateCountryGuidesOutputSchema = z.object({
    guides: z.array(CountryGuideSchema).describe("An array of generated country guides.")
});
export type GenerateCountryGuidesOutput = z.infer<typeof GenerateCountryGuidesOutputSchema>;

export async function generateCountryGuides(
  input: GenerateCountryGuidesInput
): Promise<GenerateCountryGuidesOutput> {
  return generateCountryGuidesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'countryGuidesPrompt',
  input: {schema: GenerateCountryGuidesInputSchema},
  output: {schema: GenerateCountryGuidesOutputSchema},
  prompt: `You are a travel expert creating content for a travel planning app. For each country in the following list, generate a concise and exciting travel guide: {{{json countries}}}.

For each country, provide:
1. The country name, exactly as provided in the input.
2. A short, engaging description.
3. A list of exactly 3 top attractions, each with a detailed description and a two-word image hint.
4. A list of 3-4 other fun activities or things to do.
5. A two-word hint for a representative photo of the whole country.

Return the result as a JSON object with a single key "guides", which is an array of guide objects. Each object in the array must conform to the output schema.`,
});

const generateCountryGuidesFlow = ai.defineFlow(
  {
    name: 'generateCountryGuidesFlow',
    inputSchema: GenerateCountryGuidesInputSchema,
    outputSchema: GenerateCountryGuidesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output || !output.guides) {
      throw new Error('The AI failed to return a valid list of country guides.');
    }
    return output;
  }
);
