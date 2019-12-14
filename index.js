'use strict';

require('dotenv').config();

const BOT_START = Date.now() / 1000;

let COUNT = 1;

const Snoowrap = require('snoowrap');

const { CommentStream } = require('snoostorm');

const reply = (comment) => {
  const lowCom =  comment.toLowerCase();
  if(lowCom.includes('prison mike')) {
    COUNT += 1;
    return true;
  };
  return false;
};

const client = new Snoowrap({
  userAgent: 'testBot: v1.0.0 (by /u/Dry_Relation)',
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

const comments = new CommentStream(client, {
  subreddit:'all',
  pollTime: 1000,
  limit: 1000,
});

comments.on('error', (e) => {
  console.log('Something went wrong');
  console.log(e);
});
let n = 0;
comments.on('item', (item) => {
  const text = `https://giphy.com/gifs/aZeFIjI9hNcJ2/html5 I am a bot BleepBoop ${COUNT} `;
  // console.log(item.body)
  if(item.created_utc < Math.floor(BOT_START)) return; 
  n += 1
  console.log('listening for comments ' + n);
  if(reply(item.body)){
    console.log("count " + COUNT)
    item.reply(text);
  };
});