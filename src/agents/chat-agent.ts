import { ChatOpenAI } from '@langchain/openai';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
// import { convertToOpenAIFunction } from '@langchain/core/utils/function_calling';

// import { RunnableSequence } from '@langchain/core/runnables';
// import { AgentExecutor, type AgentStep } from 'langchain/agents';
import {
  AgentExecutor,
  createOpenAIFunctionsAgent,
  //   type AgentStep,
} from 'langchain/agents';

// import { formatToOpenAIFunctionMessages } from 'langchain/agents/format_scratchpad';
// import { OpenAIFunctionsAgentOutputParser } from 'langchain/agents/openai/output_parser';

import { reverseString } from '../tools/reverse-string';
import { foo } from '../tools/foo';

const tools = [reverseString, foo];

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are very powerful assistant, but you don't know how to reverse a string.
     When you (the assistant) need to reverse a string you should always refer to the tool 'reverse-string' and trust what the tool returns.`,
  ],
  ['human', '{input}'],
  new MessagesPlaceholder('agent_scratchpad'),
]);

const model = new ChatOpenAI({
  // model: 'gpt-3.5-turbo',
  temperature: 0,
});

// const modelWithFunctions = model.bind({
//   functions: tools.map((tool) => convertToOpenAIFunction(tool)),
// });

// const runnableAgent = RunnableSequence.from([
//   {
//     input: (i: { input: string; steps: AgentStep[] }) => i.input,
//     agent_scratchpad: (i: { input: string; steps: AgentStep[] }) =>
//       formatToOpenAIFunctionMessages(i.steps),
//   },
//   prompt,
//   modelWithFunctions,
//   new OpenAIFunctionsAgentOutputParser(),
// ]);

// export const chatAgent = AgentExecutor.fromAgentAndTools({
//   agent: runnableAgent,
//   tools,
// });

export const chat = async (input: string) => {
  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    tools,
    prompt,
  });

  //   const runnableAgent = RunnableSequence.from([
  //     {
  //       input: (i: { input: string; steps: AgentStep[] }) => i.input,
  //       agent_scratchpad: (i: { input: string; steps: AgentStep[] }) =>
  //         formatToOpenAIFunctionMessages(i.steps),
  //     },
  //     prompt,
  //     agent,
  //     new OpenAIFunctionsAgentOutputParser(),
  //   ]);

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
    maxIterations: 3,
    returnIntermediateSteps: true,
  });

  const result = await agentExecutor.invoke({
    input,
  });

  return result;
};
