require('dotenv').config();

const BOT_START = Date.now() / 1000;

const Snoowrap = require('snoowrap');

const { CommentStream } = require('snoostorm');

const client = new Snoowrap({
  userAgent: 'testBot: v1.0.0 (by /u/Dry_Relation)',
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});


const comments = new CommentStream(client, {
  subreddit: 'testingground4bots',
  limit: 10,
  pollTime: 10000
});

comments.on('item', (item) => {
  if(item.created_utc < BOT_START) return;


  console.log(item);
});