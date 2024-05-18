import { DynamicTool } from '@langchain/core/tools';

export const reverseString = new DynamicTool({
  name: 'reverse-string',
  description:
    'call this to get the reverse of a string. input should be a string.',
  func: async (input: string) => input.split('').reverse().join(''),
});
