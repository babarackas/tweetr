$(document).ready(function() {

  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  // Test / driver code (temporary). Eventually will get this from the server.
  var tweetData = {
    "user": {
      "name": "George",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }


  function createTweetElement(tweetData) {

    var $tweet = $('<article>').addClass('tweet')
      .append($('<header>')
        .append($('<img>').addClass('avatars').attr('src', tweetData.user.avatars.regular))
        .append($('<h2>').addClass('name').text(tweetData.user.name))
        .append($('<h4>').addClass('handle').text(tweetData.user.handle))
      )
      .append($('<content>')
        .append($('<p>').addClass('text').text(tweetData.content.text))
      )
      .append($('<footer>')
        .append($('<p>').addClass('created_at').text(tweetData.created_at))
      );
    return $tweet;
  }

  // loops through tweets
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      let tweetNode = createTweetElement(tweet)[0];

      $('#tweets-container').prepend(tweetNode);
    });
  }

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done(function(tweets) {
      renderTweets(tweets);
    });
  }

  function showError() {
    $('#errorSpot').show();
  }

  function hideError() {
    $('#errorSpot').hide();
  }

  loadTweets();

  $('#textarea').on("focus", hideError);

  ///Question for Dave how to get slide down to work

$('.compose').on("click", function(event) {
    event.preventDefault()
    if ( $( ".new-tweet" ).is( ":hidden" ) ) {
    $( ".new-tweet" ).slideDown( "slow" );
    //focus on that text area
    $('#textarea').focus();
    } else {
    $( ".new-tweet" ).hide();
  }
});


  $('#button').on("click", function(event) {
    event.preventDefault()
    var textVal = $("#textarea").val()
    let errorMessage;

    if (!textVal) {
      errorMessage = 'Please enter text';
    }
    if(textVal.length > 140){
      errorMessage = 'You have used too many characters';
      }
    if(errorMessage){
      $('#errorSpot').text(errorMessage);
      showError();
      return false;
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: {
        text: textVal
      }
    }).done(function(tweet) {
      let newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);

    });
  })
});
