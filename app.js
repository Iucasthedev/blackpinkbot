let TwitterPackage = require('twitter');
let credentials = require('./credentials.json');

let secret = {
  consumer_key: credentials.apiConsumerKey,
  consumer_secret: credentials.apiConsumerSecret,
  access_token_key: credentials.accessToken,
  access_token_secret: credentials.accessSecret
}

var params = {
  q: '',
  count: 10
}

let Twitter = new TwitterPackage(secret);

/*Twitter.get('users/search', params, function(err, data, res) {
    let fer = data[0].id_str;
    Twitter.get('statuses/user_timeline', {id: fer}, function(err, tweets, res) {
       tweets.forEach((tweet) => {
          Twitter.post('favorites/create', {id: tweet.id_str});
       })
    });

});*/
