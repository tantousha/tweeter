/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetsDatabase = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(function() {
  var $tweets = $('#old_tweets');

  function loadTweets() {
    $.getJSON('/tweets', function ( tweets ) {
    $tweets.append(tweets.map(createTweetElement));
    });
  }
  loadTweets();

    function createTweetElement(tweet) {
      var $tweet = $('<article class="tweet">');
      var $header = $(`<header>
        <img class="profile_pic" src=${tweetsDatabase.user.avatars.small}>
        <h2 class="name">${tweetsDatabase.user.name}</h1>
        <span class="nickname">${tweetsDatabase.user.handle}<span>
      </header>`)
        .appendTo($tweet);
      var $body = $(`<p>${tweetsDatabase.content.text}</p>`)
        .appendTo($tweet);
      var $footer = $(`<footer>
        <p>${tweetsDatabase.created_at}</p>
        <i class="far fa-flag"></i>
        <i class="far fa-heart"></i>
        <i class="fas fa-retweet"></i>
      </footer>`)
        .appendTo($tweet);
      return $tweet;
    }
  //var $tweet = createTweetElement(tweetsDatabase);


// $.getJSON('/tweets', function ( tweets ) {
// $tweets.append(tweets.map(createTweetElement));
// });

  console.log($tweets);
  //$('#old_tweets').append($tweet);
});
