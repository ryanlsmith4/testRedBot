const Snoowrap =  require('snoowrap');
const { CommentStream } = require('snoostorm');
const fs = require('fs');
require('dotenv').config();
const fileRead = fs.readFileSync('count.txt', 'utf8')

class RedBot {
	constructor(listenReplies){
        this.listenReplies = listenReplies;
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
        //  this.subreddit,
        'testingground4bots',
        pollTime: 2000,
        limit: 50,
    },  console.log('Here-- ', this.subredditString));
	 reply = async(item) => {
         let replyList = Object.keys(this.listenReplies);
         let replies = Object.values(this.listenReplies)
         let removeWhiteSpace = item.body.replace(/\s/g, '');
         let string = removeWhiteSpace.toLowerCase();
         for(let i = 0; i <= replyList.length; i++){
             if(string.includes(replyList[i])){
                 try{
                    this.count++;
                    let countText = replies[i].replace('count', this.count);
                    await item.reply(countText);
                    this.save();
                 } catch (e){
                    console.log(e)
                 }
             } 
        }
        // return false
    };
	 save = () => {
		fs.writeFile('count.txt', this.count, (err) => {
			if(err) throw err;
			console.log('Saved Count ', this.count);
        });
	};
};
module.exports = RedBot;
