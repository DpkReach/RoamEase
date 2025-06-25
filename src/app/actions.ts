'use server';

import { cache } from 'react';
import {
  generateCountryGuide as generateCountryGuideFlow,
  type GenerateCountryGuideInput,
  type GenerateCountryGuideOutput,
} from '@/ai/flows/country-guide-generator';

async function _generateCountryGuide(
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

export const generateCountryGuide = cache(_generateCountryGuide);
