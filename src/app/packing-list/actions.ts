'use server';

import {
  generatePackingList as generatePackingListFlow,
  type GeneratePackingListInput,
  type GeneratePackingListOutput,
} from '@/ai/flows/packing-list-generator';

export async function generatePackingList(
  input: GeneratePackingListInput
): Promise<GeneratePackingListOutput> {
  try {
    const output = await generatePackingListFlow(input);
    return output;
  } catch (error) {
    console.error('Error generating packing list:', error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred while communicating with the AI service.');
  }
}
