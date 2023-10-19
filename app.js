require("dotenv").config();
const { addVideoToAstra } = require("./addVideoToAstra");
const { connectToAstraDb, initMongooseVideoModel } = require("./astradb-mongoose");
const express = require('express');

connectToAstraDb();
initMongooseVideoModel();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/', async (req, res) => {
	const urlAddress = req.body.urlAddress;
	let messages = req.body.messages || [];
	console.log(`urlAddress: ${urlAddress}`)
	let video = await addVideoToAstra(urlAddress);
	messages = await addChatGPTresponse(video, messages)
	
	// res.send({
	// 	video,
	// 	messages: [{"role": "system", "content": "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions."},
    //     {"role": "user", "content": `The following youtube video transcript:\n\n${transcript}\n\nAnswer the following question or questions based on the transcript.`},
	// 	{"role": "user", "content": `What might have been missing from this video?`}],
	// });
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
  