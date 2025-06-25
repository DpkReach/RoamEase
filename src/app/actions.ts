'use server';

import { cache } from 'react';
import {
  generateCountryGuides as generateCountryGuidesFlow,
  type GenerateCountryGuidesInput,
  type GenerateCountryGuidesOutput,
} from '@/ai/flows/country-guide-generator';

async function _generateCountryGuides(
  input: GenerateCountryGuidesInput
): Promise<GenerateCountryGuidesOutput> {
  try {
    const output = await generateCountryGuidesFlow(input);
    return output;
  } catch (error) {
    console.error('Error generating country guides:', error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred while communicating with the AI service.');
  }
}

export const generateCountryGuides = cache(_generateCountryGuides);
