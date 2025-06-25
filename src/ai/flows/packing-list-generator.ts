'use server';

/**
 * @fileOverview A packing list generator AI agent.
 *
 * - generatePackingList - A function that handles the packing list generation process.
 * - GeneratePackingListInput - The input type for the generatePackingList function.
 * - GeneratePackingListOutput - The return type for the generatePackingList function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePackingListInputSchema = z.object({
  destination: z.string().describe('The destination for the trip.'),
  startDate: z.string().describe('The start date of the trip (YYYY-MM-DD).'),
  endDate: z.string().describe('The end date of the trip (YYYY-MM-DD).'),
  preferences: z
    .string()
    .optional()
    .describe('Any specific preferences or activities planned for the trip.'),
});
export type GeneratePackingListInput = z.infer<typeof GeneratePackingListInputSchema>;

const GeneratePackingListOutputSchema = z.object({
  packingList: z.array(z.string()).describe('A list of items to pack for the trip.'),
});
export type GeneratePackingListOutput = z.infer<typeof GeneratePackingListOutputSchema>;

export async function generatePackingList(
  input: GeneratePackingListInput
): Promise<GeneratePackingListOutput> {
  return generatePackingListFlow(input);
}

const prompt = ai.definePrompt({
  name: 'packingListPrompt',
  input: {schema: GeneratePackingListInputSchema},
  output: {schema: GeneratePackingListOutputSchema},
  prompt: `You are a helpful travel assistant. Your task is to generate a packing list based on the provided trip details. The output must be a JSON object with a single key "packingList" which is an array of strings.

Trip Details:
- Destination: {{{destination}}}
- Start Date: {{{startDate}}}
- End Date: {{{endDate}}}
- Preferences/Activities: {{{preferences}}}
`,
});

const generatePackingListFlow = ai.defineFlow(
  {
    name: 'generatePackingListFlow',
    inputSchema: GeneratePackingListInputSchema,
    outputSchema: GeneratePackingListOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to return a valid packing list. This may be due to safety filters or an internal error.');
    }
    return output;
  }
);
