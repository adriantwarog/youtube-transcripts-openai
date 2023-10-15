import fs from 'fs';
import comments from './comments.json' assert { type: "json" };
let mergedText = '';
for (let i = 0; i < comments.length; i++) {
	if (i > 0) {
		mergedText += ' ';
	}
	mergedText += comments[i].text;
}
fs.writeFileSync('merge.txt', mergedText);
