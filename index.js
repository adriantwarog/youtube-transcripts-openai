
import { YoutubeTranscript } from 'youtube-transcript';
import fs from 'fs'

async function saveCommentsToFile(comments) {
  const jsonComments = JSON.stringify(comments);
  fs.writeFileSync('./comments.json', jsonComments);
}

async function getComments(){
  let comments = await YoutubeTranscript.fetchTranscript('1q6ws2CcLHU')
  console.log(comments)
  return comments
}

let comments = await getComments()
saveCommentsToFile(comments);

