'use strict';

require('dotenv').config();

const BOT_START = Date.now() / 1000;

const Snoowrap = require('snoowrap');

const { CommentStream } = require('snoostorm');
// let COUNT = 0;
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
  pollTime: 3000,
  limit: 1000,
});

comments.on('error', (e) => {
  console.log('Something went wrong');
  console.log(e);
});

let n = 0;
comments.on('item', async (item) => {
  const user = client.getUser(process.env.USERNAME);
  let dryComments =  await user.getComments();

  let COUNT = dryComments.length

  console.log(COUNT);
  // https://giphy.com/gifs/aZeFIjI9hNcJ2/html5
  const text = `https://media.giphy.com/media/aZeFIjI9hNcJ2/giphy.gif  <br /> I am a bot BleepBoop this bot has been summoned ${COUNT} times`;
  if(item.created_utc < Math.floor(BOT_START)) return; 
  n += 1
  console.log('listening for comments ' + n);
  if(reply(item.body)){
    console.log("count " + COUNT);
    item.reply(text);
  };
});
