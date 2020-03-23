const Snoowrap =  require('snoowrap');
const { CommentStream } = require('snoostorm');



class RedBot {
	constructor(listenReplies, subreddit){
        this.listenReplies = listenReplies;
        this.subreddit = subreddit;
    }

    client = new Snoowrap({
        userAgent: 'testBot: v1.0.0 (by /u/Dry_Relation)',
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    });
    
    comments = new CommentStream(client, {
        subreddit: this.subreddit,
        pollTime: 1000,
        limit: 100,
    });

	 reply = (comment) => {
		const lowCom =  comment.toLowerCase();
		if(lowCom.includes('prison mike')) {
			console.log('Bot summoned...');
			return true;
		}
		return false;
	};

	 save = async(count, fs) => {
		await fs.writeFile('count.txt', count, (err) => {
			if(err) throw err;
			console.log('Saved Count ', count);
		});
	};
}

module.exports = RedBot;