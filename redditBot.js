const Snoowrap =  require('snoowrap');
const { CommentStream } = require('snoostorm');
const fs = require('fs');
require('dotenv').config();

const fileRead = fs.readFileSync('count.txt', 'utf8')

class RedBot {
	constructor(listenReplies, values, subredditString){
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
	 reply = (item, comment) => {
         let removeWhiteSpace = item.body.replace(/\s/g, '');
         let lowerItem = removeWhiteSpace.toLowerCase();
         let toString = new String(lowerItem);
         let string = toString.toString()
        //  console.log(string)
         for(let key in this.listenReplies){
             if(string.includes(key)){
                 console.log('gottem')
                 this.count++;
                 let countText = this.listenReplies[key].replace('count', this.count);
                 console.log(string)
                 console.log(countText)
                 item.reply(countText);
                 this.save();
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
