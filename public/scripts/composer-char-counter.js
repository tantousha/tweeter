$(document).ready(function() {
  var textarea = document.querySelector('textarea[name=text]');
  textarea.addEventListener('keydown', function(event) {
    console.log(this);
  })
});
