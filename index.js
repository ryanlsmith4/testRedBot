/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const BOT_START = Date.now() / 1000;

const fs = require('fs');

const Snoowrap =  require('snoowrap');

const { CommentStream } = require('snoostorm');

const reply = (comment) => {
	const lowCom =  comment.toLowerCase();
	if(lowCom.includes('prison mike')) {
		console.log('Bot summoned...');
		return true;
	}
	return false;
};

const save = async(count, fs) => {
	await fs.writeFile('count.txt', count, (err) => {
		if(err) throw err;
		console.log('Saved Count ', count);
	});
};

const client = new Snoowrap({
	userAgent: 'testBot: v1.0.0 (by /u/Dry_Relation)',
	clientId: process.env.CLIENTID,
	clientSecret: process.env.CLIENTSECRET,
	refreshToken: process.env.REFRESH_TOKEN,
});

client.config({ continueAfterRatelimitError: true });

const comments = new CommentStream(client, {
	subreddit:'all',
	pollTime: 1000,
	limit: 100,
});

comments.on('error', (e) => {
	console.log('Something went wrong');
	console.log(e);
});

const fileCount = fs.readFileSync('count.txt', 'utf8');

let count = Number(fileCount);
console.log('Listening for comments');
comments.on('item', async (item) => {
	// Avoid hitting rate limit by setting timeout.
	await new Promise(r => {
		setTimeout(r, 1000);
	});
  
	if(item.created_utc < BOT_START) return;
  
	if(reply(item.body)){
		count += 1;
		await save(count, fs);
		let text = `https://media.giphy.com/media/aZeFIjI9hNcJ2/giphy.gif &nbsp;
    
    I am a bot BleepBoop This bot has been summoned ${count} times 

   [link to GitHub](https://github.com/ryanlsmith4/testRedBot)`;
		await item.reply(text);
	}
});