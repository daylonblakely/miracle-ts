import { DynamicTool } from '@langchain/core/tools';

export const foo = new DynamicTool({
  name: 'FOO',
  description:
    'call this to get the value of foo. input should be an empty string.',
  func: async () => 'baz',
});
