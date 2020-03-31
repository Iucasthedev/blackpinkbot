let TwitterPackage = require('twitter');

let secret = {
  consumer_key: 'ENTER YOURS HERE',
  consumer_secret: 'ENTER YOURS HERE',
  access_token_key: 'ENTER YOURS HERE',
  access_token_secret: 'ENTER YOURS HERE'
}
let Twitter = new TwitterPackage(secret);

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#WhateverYouWantYourHashtagToBe'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //build our reply object
    var statusObj = {status: "Hi @" + tweet.user.screen_name + ", Whatever your reply is"}

    //call the post function to tweet something
    Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});
