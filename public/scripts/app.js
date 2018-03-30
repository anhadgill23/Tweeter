/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$('#document').ready(function(e){
    const $newTweet = $('.new-tweet');

    function createTweetElement (tweetObject){
        var timeConversion = moment(tweetObject.created_at).fromNow();

        var $tweet = $("<article>").addClass("tweet");
        var $header = $("<header>");
        var $divLeft = $("<div>").addClass("left");
        var $img = $("<img>").addClass("profilePicture").attr('src',tweetObject.user.avatars.small);
        var $name = $("<h2>").text(tweetObject.user.name);
        var $divRight = $("<div>").addClass("right");
        var $handle = $("<p>").addClass("handle").text(tweetObject.user.handle);
        var $content = $("<p>").addClass("content").text(tweetObject.content.text);
        var $footer = $("<footer>");
        var $icons = $("<div>").addClass("icons");
        var $time = $("<p>").addClass("time").text(timeConversion);
        var $imgIcon1 = $("<i>").addClass('fas fa-flag').attr("src", "https://use.fontawesome.com/releases/v5.0.9/js/all.js");
        var $imgIcon2 = $("<i>").addClass('fas fa-retweet').attr("src", "https://use.fontawesome.com/releases/v5.0.9/js/all.js");
        var $imgIcon3 = $("<i>").addClass('fas fa-heart').attr("src", "https://use.fontawesome.com/releases/v5.0.9/js/all.js");

        ($header).appendTo($tweet);
        ($divLeft).appendTo($header);
        ($img).appendTo($divLeft);
        ($name).appendTo($divLeft);
        ($divRight).appendTo($header);
        ($handle).appendTo($divRight);
        ($content).appendTo($tweet);
        ($footer).appendTo($tweet);
        ($time).appendTo($footer);
        ($icons).appendTo($footer);
        ($imgIcon1).appendTo($icons);
        ($imgIcon2).appendTo($icons);
        ($imgIcon3).appendTo($icons);

        return $tweet
    }

    $('form#composeTweet').on('submit', function(e) {
        e.preventDefault();
        if ($('.text').val().length === 0) {
            alert("I am unable to post an empty tweet. Please write something!");
        } else if ($('.text').val().length > 140) {
            alert("Words limit exceeded. Keep it within the 140 character limit!");
        } else {
            var data = $('form#composeTweet').serialize()
            $.post('/tweets/', data).done(loadTweets)
            $('textarea').val('');
            updateCounter();
        }
    });

    //responsible for fetching tweets
    function loadTweets() {
        $.get('/tweets/').done(renderTweets)
    }

    function renderTweets (arrOfTweets) {
        arrOfTweets.forEach(function(item) {
            var $tweet = createTweetElement(item)
            $('.tweets-container').prepend($tweet)
        });
    }

    $('#composeButton').on('click', function() {
        $newTweet.slideToggle().find('.text').focus();
    });

    loadTweets();
});