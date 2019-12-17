/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const BOT_START = Date.now() / 1000;

const Snoowrap =  require('snoowrap');

const { CommentStream } = require('snoostorm');

const reply = (comment) => {
	const lowCom =  comment.toLowerCase();
	if(lowCom.includes('prison mike')) {
		return true;
	}
	return false;
};

const client = new Snoowrap({
	userAgent: 'testBot: v1.0.0 (by /u/Dry_Relation)',
	clientId: process.env.CLIENTID,
	clientSecret: process.env.CLIENTSECRET,
	refreshToken: process.env.REFRESH_TOKEN,
});

const user = client.getUser(process.env.USERNAME);

client.config({ continueAfterRatelimitError: true });

const comments = new CommentStream(client, {
	subreddit:'all',
	pollTime: 2000,
	limit: 1000,
});

comments.on('error', (e) => {
	console.log('Something went wrong');
	console.log(e);
});

let n = 0;
comments.on('item', async (item) => {
	if(item.created_utc < Math.floor(BOT_START)) return;
	n += 1;
	console.log(`listening for comments ${n}`);
	if(reply(item.body)){
		const comments = await user.getComments();
		// updateCount();
		let text = `https://media.giphy.com/media/aZeFIjI9hNcJ2/giphy.gif  I am a bot BleepBoop this bot has been summoned ${comments.length} times`;
		// console.log(`here is the count: ${COUNT}`);
		item.reply(text);
	}
});