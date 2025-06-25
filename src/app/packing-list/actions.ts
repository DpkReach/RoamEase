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
    throw new Error('Failed to communicate with the AI service.');
  }
}
