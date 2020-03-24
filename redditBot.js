const Snoowrap =  require('snoowrap');
const { CommentStream } = require('snoostorm');
const fs = require('fs');
require('dotenv').config();
// add npm logger to track files 

const fileRead = fs.readFileSync('count.txt', 'utf8')

class RedBot {
	constructor(listenReplies, subredditString){
        this.listenReplies = listenReplies;
        this.subredditString = subredditString;
        this.count = fileRead;
    }
    client = new Snoowrap({
        userAgent: 'testBot: v2.0.0 (by /u/Dry_Relation)',
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    });
    comments = new CommentStream(this.client, {
        subreddit:
        //  this.subredditString,
        'testingground4bots',
        pollTime: 1000,
        limit: 100,
    },  console.log('Here-- ', this.subredditString));
	 reply = (item) => {
         let removeWhiteSpace = item.body.replace(/\s/g, '');
         let lowerItem = removeWhiteSpace.toLowerCase();
         let string = new String(lowerItem);
         for(let value in this.listenReplies){
             if(string.includes(value)){
                 console.log('gottem')
                 this.count++;
                 let countText = this.listenReplies[value].replace('count', this.count);
                 console.log(string)
                 console.log(countText)
                //  item.reply(countText);
                //  this.save();
             }
         return false;
        }
    };
	 save = () => {
		fs.writeFile('count.txt', this.count, (err) => {
			if(err) throw err;
			console.log('Saved Count ', this.count);
        });
	};
};
module.exports = RedBot;
