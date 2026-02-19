import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  //TODO TASK 1
  const context = `We have two main gates for CEG.
     1)Kotturpuram entry
     2)Main gate entry 
     Timing of the college
     8:30am to 4:45pm
     
     `;
  const systemPrompt = `You are a security assistant.You ask people why you are there and also helps them with details , if a person tries to enter out of this allowed time just flag  them, always be crispy only response in 2 sentences at max
  
  following is the context:
  ${context}`;
     
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
