import { OpenAI } from "openai";
const openai = new OpenAI({apiKey: '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'});
const response = await openai.listEngines();