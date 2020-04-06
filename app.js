let TwitterPackage = require('twitter');
let credentials = require('./credentials.json');

let secret = {
  consumer_key: credentials.apiConsumerKey,
  consumer_secret: credentials.apiConsumerSecret,
  access_token_key: credentials.accessToken,
  access_token_secret: credentials.accessSecret
}

let toogleTweet = true;
let canTweet = true;

let Twitter = new TwitterPackage(secret);


  Twitter.stream('statuses/filter', {track: '#ForaMarcela'}, function(stream) {
    stream.on('data', function(tweet) {
      let text = tweet.text.toString().toLowerCase();
      if (text.indexOf('#foraflay') === -1 
      && text.indexOf('#foraflayslane') === -1
      && text.indexOf('#forababu') === -1
      ) {
        let id = tweet.id_str;
          if (toogleTweet && canTweet) {
            canTweet = false;
            Twitter.post('statuses/retweet', {id: id},  function(error, tweetReply, response){
              console.log('retweetou')
            });
          } else if (canTweet) {
            canTweet = false;
            let tweet = randomString(0) + ' ' + '#ForaMarcela';
            Twitter.post('statuses/update', {status: tweet},  function(error, tweetReply, response){
              console.log('tweetou')
            });
          }
      }
    });
    setInterval(() => {
      canTweet = true;
      toogleTweet = !toogleTweet;
    }, 5000);

  });

clearInterval();

function randomString() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 5; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}