require("dotenv").config();
const mongoose = require("mongoose");
const { connectToAstraDb, initMongooseVideoModel } = require("./astradb-mongoose");

(async () => {
	try {
	  await connectToAstraDb();
	  await initMongooseVideoModel();
	  const Video = mongoose.model("Video");
	  const videos = await Video.find();
	  console.log(videos);
	  
	} catch (e) {
	  console.error(e);
	}
})();
  