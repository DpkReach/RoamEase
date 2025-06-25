'use server';

import {
  generateCountryGuide as generateCountryGuideFlow,
  type GenerateCountryGuideInput,
  type GenerateCountryGuideOutput,
} from '@/ai/flows/country-guide-generator';

export async function generateCountryGuide(
  input: GenerateCountryGuideInput
): Promise<GenerateCountryGuideOutput> {
  try {
    const output = await generateCountryGuideFlow(input);
    return output;
  } catch (error) {
    console.error('Error generating country guide:', error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred while communicating with the AI service.');
  }
}
