$(document).ready(function() {
  maxCharacters = 140;

  $('.counter').text(maxCharacters);

  $('textarea').bind('keyup keydown', function() {
    var count = $('.counter');
    var characters = $(this).val().length;

    if (characters > maxCharacters) {
      count.addClass('over');
    } else {
      count.removeClass('over');
    }

    count.text(maxCharacters - characters);


  });

});
