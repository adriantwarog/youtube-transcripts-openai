const ytdl = require('ytdl-core');
const fs = require('fs');

const getYoutubeVideoInfo = async (url) => {
	try {
		let info = await ytdl.getInfo(url);
		const videoDetails = info.videoDetails;
		const author = videoDetails.author;
		const videoInfo = {
			url: videoDetails.video_url,
			title: videoDetails.title,
			description: videoDetails.description,
			author: author.name,
			author_thumbnail: author.thumbnails[author.thumbnails.length - 1].url,
			thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url
		};

		return videoInfo;
	} catch (e) {
		console.error(e);
	}
};

module.exports = { getYoutubeVideoInfo } 