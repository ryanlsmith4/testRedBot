/* eslint-disable no-undef */
'use strict';
const BOT_START = Date.now() / 1000;

// const Snoowrap =  require('snoowrap');

// const { CommentStream } = require('snoostorm');
const listenReplies = {
	"prisonmike" : `https://media.giphy.com/media/aZeFIjI9hNcJ2/giphy.gif &nbsp;
    
    I am a bot BleepBoop This bot has been summoned count times 

   [link to GitHub](https://github.com/ryanlsmith4/testRedBot)`,
   "Something else": "something else"
}

const RedBot = require('./redditBot');
// constructor(listenReplies, subreddit, count, fs){
const reddit = new RedBot(listenReplies, 'testingground4bots');
reddit.client.config({  continueAfterRatelimitError: true })

reddit.comments.on('error', (e) => {
	console.log('Something went wrong');
	console.log(e);
});

console.log('Listening for comments');
reddit.comments.on('item', async (item) => {
	if(item.created_utc < BOT_START) return;
	// evaluates to true || false
	reddit.reply(item)
});