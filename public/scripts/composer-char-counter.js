
function updateCounter() {
    var max = 140;
    var $textarea = $('textarea');
    var $input= max - $textarea.val().length;
    var $charCount = $textarea.siblings('.counter');
    $charCount.text($input);

    if ($input < 0) {
        $charCount.css('color', 'red');
    }
}


$(document).ready(function () {
    // console.log('this inside document.ready:', this);
    $('textarea').on('keyup',  updateCounter);
});

/*
Tip: You could re-target the textarea using the same selector you've used in this file to
 establish the event listener, but you already have a handle on the textarea thanks to this. 
 But this points to a plain DOM node meaning it doesn't have any of the nice jQuery 
 functions like .val() to get the value of an textarea. How can you leverage this while 
 also having access to these jQuery niceties ?

By the end of this task you should be console logging the number of characters left. And 
if the textarea has more than 140 characters it should be logging negative values.*/