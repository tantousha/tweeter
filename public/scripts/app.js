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
  // loadTweet function built with Joel's assistance

    function createTweetElement(tweet) {
      var $tweet = $('<article class="tweet">');
      var $header = $(`<header>
        <img class="profile_pic" src=${tweet.user.avatars.small}>
        <h2 class="name">${tweet.user.name}</h1>
        <span class="nickname">${tweet.user.handle}<span>
      </header>`)
        .appendTo($tweet);
      var $body = $(`<p>${tweet.content.text}</p>`)
        .appendTo($tweet);
      var $footer = $(`<footer>
        <p>${tweet.created_at}</p>
        <i class="far fa-flag"></i>
        <i class="far fa-heart"></i>
        <i class="fas fa-retweet"></i>
      </footer>`)
        .appendTo($tweet);
      return $tweet;
    }

  console.log($tweets);

  $( 'form#new_tweet').on('submit', function(e) {
    e.preventDefault();
    let characterCount = $('textarea#tweetbox').val().length;
    console.log(characterCount);
    if (characterCount <= 0) {
      alert("You have to write something! Please try again.");
      return;
    } else if (characterCount > 140) {
      alert("Please keep your message to 140 character or less!");
      return;
    }
    let data = $.post("/tweets", $(this).serialize() );
    $('textarea#tweetbox').val('');
    loadTweets();
    // console.log(data);
  });

});


//   var button = $(event.target);
//   var input = button.siblings('input');
//   console.log(input);
// }
