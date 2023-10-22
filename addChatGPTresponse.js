const { OpenAI } = require("openai");
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY });

const addChatGPTresponse = async (video, messages, ) => {
	
	if(messages.length == 0) {
		messages = [
			{"role": "system", "content": "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions."},
		 	{"role": "user", "content": `The following youtube video transcript:\n\n${video.transcript}\n\nAnswer the following question or questions based on the transcript.`},
			{"role": "user", "content": `Summarise what this video is about, and point on three key learnings.`},
		];
	}

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages,
	});

	messages = [...messages, response.choices[0].message]

	console.log(`response.choices[0].message`, response.choices[0].message)

	return messages

}


module.exports = { addChatGPTresponse } 