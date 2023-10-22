require("dotenv").config();
const { addVideoToAstra } = require("./addVideoToAstra");
const { addChatGPTresponse } = require("./addChatGPTresponse");
const { connectToAstraDb, initMongooseVideoModel } = require("./astradb-mongoose");
const express = require('express');

connectToAstraDb();
initMongooseVideoModel();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
	const urlAddress = req.body.urlAddress;
	let messages = req.body.messages || [];
	console.log(`urlAddress: ${urlAddress}`)
	let video = await addVideoToAstra(urlAddress);
	messages = await addChatGPTresponse(video, messages)

	res.send({
		video,
		messages
	});

});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
  