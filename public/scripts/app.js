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
      tweets.forEach(function(tweet) {
        $tweets.prepend(createTweetElement(tweet));
      });
    });
  }

  loadTweets();
  // loadTweet function built with Joel's assistance

  function createTweetElement(tweet) {
    console.log(tweet.content.text);
    console.log(escape(tweet.content.text));
    var $tweet = $('<article class="tweet">');
    var $header = $(`<header>
      <img class="profile_pic" src=${tweet.user.avatars.small}>
      <h2 class="name">${tweet.user.name}</h1>
      <span class="nickname">${tweet.user.handle}<span>
    </header>`)
      .appendTo($tweet);
    var $body = $(`<p>${escape(tweet.content.text)}</p>`)
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

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    console.log(div);
    return div.innerHTML;
  }

  $( "#compose_button").click(function() {
    if ( $( ".new_tweet").is( ":hidden") ) {
      $( ".new_tweet").slideToggle( "400", function() {
        $( "#tweetbox").focus();
      });
    } else {
      $( ".new_tweet" ).slideUp( "400" );
    }
  });

  $( 'form#new_tweet').on('submit', function(e) {
    e.preventDefault();
    let characterCount = $('textarea#tweetbox').val().length;
    console.log(characterCount);
    if (characterCount <= 0) {
      $( "#zero_error" ).slideDown( "slow" );
      $( ".counter" ).css( "left", "128px");
      return;
    } else if (characterCount > 140) {
      $( "#max_error" ).slideDown( "slow" );
      $( ".counter" ).css( "left", "128px" );
      return;
    }
    let data = $(this).serialize();
    $.ajax({
      url: "/tweets",
      method:'POST',
      data: escape(data),
      success: function(result){
        console.log("Result ",result);
        $('#old_tweets').empty();
        loadTweets();
        $('textarea#tweetbox').val('');
        $('.counter').html(140).css( "left", "0px" );
        $(".error").slideUp();
      },
      error: function(err){
        console.log("Error ",error);
      }
    });
  });

});


//   var button = $(event.target);
//   var input = button.siblings('input');
//   console.log(input);
// }
