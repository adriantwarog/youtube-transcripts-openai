const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// TODO: change to use summary
const addChatGPTresponse = async (video, messages) => {
  if (messages.length == 0) {
    messages = [
      {
        role: "system",
        content:
          "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions.",
      },
      {
        role: "user",
        content: `The following youtube video transcript:\n\n${video.summary}\n\nAnswer the following question or questions based on the transcript.`,
      },
      {
        role: "user",
        content: `Summarise what this video is about, and point on three key learnings.`,
      },
    ];
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  messages = [...messages, response.choices[0].message];

  console.log(`response.choices[0].message`, response.choices[0].message);

  return messages;
};

const addGPTSummary = async (transcript) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions.",
      },
      {
        role: "user",
        content: `The following youtube video transcript:\n\n${transcript}\n\nPlease summarize the video. Provide at least 3 key points about the shoe in the video, and the reviewer's opinions.`,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = { addChatGPTresponse, addGPTSummary };
