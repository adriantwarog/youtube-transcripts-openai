import { OpenAI } from "openai";
import fs  from 'fs'

const transcript = fs.readFileSync('merge.txt', 'utf-8');
const openai = new OpenAI({apiKey: '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'});

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions."},
        {"role": "user", "content": `The following youtube video transcript:

${transcript}

Answer the following question or questions based on the transcript.

What might have been missing from this video?`}],
});

console.log(response.choices[0].message.content);