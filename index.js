/* eslint-disable no-undef */
'use strict';
const BOT_START = Date.now() / 1000;

const listenReplies = {
	"prisonmike" : `https://media.giphy.com/media/aZeFIjI9hNcJ2/giphy.gif &nbsp;
    
    I am a bot BleepBoop This bot has been summoned count times 

   [link to GitHub](https://github.com/ryanlsmith4/testRedBot)`,

   "fortytwo": `https://media3.giphy.com/media/jGWvmi09QLJM4/giphy.gif &nbsp;
    
   I am a bot BleepBoop This bot has been summoned count times 

  [link to GitHub](https://github.com/ryanlsmith4/testRedBot)`,

  "sorry":`https://giphy.com/gifs/year-getting-laESBDZWUubAc &nbsp;
    
  I am a bot BleepBoop This bot has been summoned count times 

 [link to GitHub](https://github.com/ryanlsmith4/testRedBot)`,

 "doggedabulletonthatone": `https://giphy.com/gifs/1yvoDVJQsTfHi &nbsp;
    
 I am a bot BleepBoop This bot has been summoned count times 

[link to GitHub](https://github.com/ryanlsmith4/testRedBot)`

}
const RedBot = require('./redditBot');
const reddit = new RedBot(listenReplies);
reddit.client.config({  continueAfterRatelimitError: true });

reddit.comments.on('error', (e) => {
	console.log('Something went wrong');
	console.log(e);
});

reddit.comments.on('item', async (item) => {
	if(item.created_utc < BOT_START) return;
	// evaluates to true || false
	reddit.reply(item)
});