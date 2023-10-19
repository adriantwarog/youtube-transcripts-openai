import { OpenAI } from "openai";
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY });

const addChatGPTresponse }  = async (video, messages) => {

	

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [{"role": "system", "content": "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions."},
			{"role": "user", "content": `The following youtube video transcript:

	${transcript}

	Answer the following question or questions based on the transcript.

	What might have been missing from this video?`}],
	});

}


module.exports = { addChatGPTresponse } 