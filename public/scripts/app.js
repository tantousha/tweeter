/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <p>${dateCalculator(tweet.created_at)} days ago.</p>
      <i class="far fa-flag"></i>
      <i class="far fa-heart"></i>
      <i class="fas fa-retweet"></i>
    </footer>`)
      .appendTo($tweet);
    return $tweet;
  }

  function dateCalculator(daysSinceinMs) {
    let todayInMs = new Date().getTime();
    let msPerDay = 24 * 60 * 60 * 1000
    let daysSince = Math.round((todayInMs - daysSinceinMs) / msPerDay);
    return daysSince;
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

// Code for creating the Compose button and revealing the new tweet box
  $( "#compose_button").click(function() {
    if ( $( ".new_tweet").is( ":hidden") ) {
      $( ".new_tweet").slideToggle( "400", function() {
        $( "#tweetbox").focus();
      });
    } else {
      $( ".new_tweet" ).slideUp( "400" );
    }
  });

//Ajax override for the submit button.
  $( 'form#new_tweet').on('submit', function(e) {
    e.preventDefault();
    let characterCount = $('textarea#tweetbox').val().length;
    console.log(characterCount);
    if (characterCount <= 0) {
      $( "#max_error" ).slideUp();
      $( "#zero_error" ).delay(300).slideDown(300);
      $( ".counter" ).css( "left", "128px");
      return;
    } else if (characterCount > 140) {
      $( "#zero_error" ).slideUp();
      $( "#max_error" ).delay(300).slideDown(300);
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
        $(".error").slideUp(100);
      },
      error: function(err){
        console.log("Error ",error);
      }
    });
  });

});
