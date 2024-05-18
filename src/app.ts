import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import morgan from 'morgan';

import { chat } from './agents/chat-agent';

const app = express();

// parse application/json
app.use(json({ limit: '10mb' }));

// request logging
app.use(morgan('combined'));

import { ChatOpenAI } from '@langchain/openai';
app.get('/', (req: Request, res: Response) => {
  const chatModel = new ChatOpenAI({});
  chatModel
    .invoke('what is LangSmith?')
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  res.send('Hello, Express with TypeScript!');
});

app.post('/reverse', (req: Request, res: Response) => {
  const input = req.body.input;

  const prompt = 'reverse this string: ' + input;
  // 'what is the value of foo?'

  chat(prompt)
    .then((output) => res.send(output))
    .catch((error) => res.status(500).send(error));
});

export default app;
