const mongoose = require("mongoose");

const { getYoutubeTranscript } = require('./getYoutubeTranscript')
const { generateEmbedding } = require("./generateEmbedding");
const { getYoutubeVideoInfo } = require("./getYoutubeVideoInfo");

const addVideoToAstra = async (url) => {
	try {
		
		const Video = mongoose.model("Video");
  
		const videoUrl = url
		const existingVideo = await Video.findOne({ url: videoUrl });
  
		if (existingVideo) {
		  console.log("Video already exists in the database");
		  
		  return {
			addedToAstra: false,
			...existingVideo.toJSON()
		}
		} else {
		  let transcript = await getYoutubeTranscript(videoUrl)
		  let vector = await generateEmbedding(transcript)
		  let videoInfo = await getYoutubeVideoInfo(videoUrl)
		  let addedVideo = await Video.create({
			  ...videoInfo,
			  transcript,
			  $vector: vector
		  })
		  console.log("Video inserted into the database");
		  return {
				addedToAstra: true,
				...addedVideo.toJSON()
			}
		}
		
	  } catch (e) {
		console.error(e);
	  }
};

module.exports = { addVideoToAstra } 