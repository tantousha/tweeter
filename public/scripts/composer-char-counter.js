$(document).ready(function() {
  $("#tweetbox").on('keyup', function() {
    var characterCount = $(this).val().length;
    var charactersRemaining = 140 - characterCount;
    $(this).siblings('.counter').text(charactersRemaining);
    if (charactersRemaining < 0) {
      $('.counter').css("color","red");
    }
    if (charactersRemaining >= 0) {
      $('.counter').css("color", "black");
    }
  })
});
