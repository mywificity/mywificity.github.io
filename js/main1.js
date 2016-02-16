$(document).ready(function(){

    //clipped image - blur effect
    set_clip_property();
    $(window).on('resize', function(){
        set_clip_property();
    });

    function set_clip_property() {
        var $header_height = $('.cd-header').height(),
            $window_height = $(window).height(),
            $header_top = $window_height - $header_height,
            $window_width = $(window).width();
        $('.cd-blurred-bg').css('clip', 'rect('+$header_top+'px, '+$window_width+'px, '+$window_height+'px, 0px)');
    }


    // Codeyhouse animation for text

    //set animation timing
    var animationDelay = 2500,
    //loading bar effect
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
        lettersDelay = 50,
    //type effect
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
    //clip effect
        revealDuration = 600,
        revealAnimationDelay = 1500;

    initHeadline();


    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($('.cd-headline.letters').find('b'));
        //initialise headline animation
        animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
        $words.each(function(){
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (i in letters) {
                if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function(){
            var headline = $(this);

            if(headline.hasClass('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
            } else if (headline.hasClass('clip')){
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type') ) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find('.cd-words-wrapper b'),
                    width = 0;
                words.each(function(){
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.cd-words-wrapper').css('width', width);
            };

            //trigger animation
            setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function(){
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

        } else if($word.parents('.cd-headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

        }  else if($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.cd-headline').hasClass('loading-bar')){
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
            setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function(){ hideWord(nextWord) }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if($word.parents('.cd-headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        }  else if($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){
                setTimeout(function(){ hideWord($word) }, revealAnimationDelay);
            });
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');

        if(!$letter.is(':last-child')) {
            setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
        } else if($bool) {
            setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
        }

        if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');

        if(!$letter.is(':last-child')) {
            setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
        } else {
            if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
            if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }



    var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
        coverLayer = $('.cd-cover-layer');

    /*
     convert a cubic bezier value to a custom mina easing
     http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
     */
    var duration = 600,
        epsilon = (1000 / 60 / duration) / 4,
        firstCustomMinaAnimation = bezier(.63,.35,.48,.92, epsilon);

    modalTriggerBts.each(function(){
        initModal($(this));
    });

    function initModal(modalTrigger) {
        var modalTriggerId =  modalTrigger.attr('id'),
            modal = $('.cd-modal[data-modal="'+ modalTriggerId +'"]'),
            svgCoverLayer = modal.children('.cd-svg-bg'),
            paths = svgCoverLayer.find('path'),
            pathsArray = [];
        //store Snap objects
        pathsArray[0] = Snap('#'+paths.eq(0).attr('id')),
            pathsArray[1] = Snap('#'+paths.eq(1).attr('id')),
            pathsArray[2] = Snap('#'+paths.eq(2).attr('id'));

        //store path 'd' attribute values
        var pathSteps = [];
        pathSteps[0] = svgCoverLayer.data('step1');
        pathSteps[1] = svgCoverLayer.data('step2');
        pathSteps[2] = svgCoverLayer.data('step3');
        pathSteps[3] = svgCoverLayer.data('step4');
        pathSteps[4] = svgCoverLayer.data('step5');
        pathSteps[5] = svgCoverLayer.data('step6');

        //open modal window
        modalTrigger.on('click', function(event){
            event.preventDefault();
            modal.addClass('modal-is-visible');
            coverLayer.addClass('modal-is-visible');
            animateModal(pathsArray, pathSteps, duration, 'open');
        });

        //close modal window
        modal.on('click', '.modal-close', function(event){
            event.preventDefault();
            modal.removeClass('modal-is-visible');
            coverLayer.removeClass('modal-is-visible');
            animateModal(pathsArray, pathSteps, duration, 'close');
        });
    }

    function animateModal(paths, pathSteps, duration, animationType) {
        var path1 = ( animationType == 'open' ) ? pathSteps[1] : pathSteps[0],
            path2 = ( animationType == 'open' ) ? pathSteps[3] : pathSteps[2],
            path3 = ( animationType == 'open' ) ? pathSteps[5] : pathSteps[4];
        paths[0].animate({'d': path1}, duration, firstCustomMinaAnimation);
        paths[1].animate({'d': path2}, duration, firstCustomMinaAnimation);
        paths[2].animate({'d': path3}, duration, firstCustomMinaAnimation);
    }

    function bezier(x1, y1, x2, y2, epsilon){
        //https://github.com/arian/cubic-bezier
        var curveX = function(t){
            var v = 1 - t;
            return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
        };

        var curveY = function(t){
            var v = 1 - t;
            return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
        };

        var derivativeCurveX = function(t){
            var v = 1 - t;
            return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
        };

        return function(t){

            var x = t, t0, t1, t2, x2, d2, i;

            // First try a few iterations of Newton's method -- normally very fast.
            for (t2 = x, i = 0; i < 8; i++){
                x2 = curveX(t2) - x;
                if (Math.abs(x2) < epsilon) return curveY(t2);
                d2 = derivativeCurveX(t2);
                if (Math.abs(d2) < 1e-6) break;
                t2 = t2 - x2 / d2;
            }

            t0 = 0, t1 = 1, t2 = x;

            if (t2 < t0) return curveY(t0);
            if (t2 > t1) return curveY(t1);

            // Fallback to the bisection method for reliability.
            while (t0 < t1){
                x2 = curveX(t2);
                if (Math.abs(x2 - x) < epsilon) return curveY(t2);
                if (x > x2) t0 = t2;
                else t1 = t2;
                t2 = (t1 - t0) * .5 + t0;
            }

            // Failure
            return curveY(t2);

        };
    };



    // Codyhouse contact form
    if( $('.floating-labels').length > 0 ) floatLabels();

    function floatLabels() {
        var inputFields = $('.floating-labels .cd-label').next();
        inputFields.each(function(){
            var singleInput = $(this);
            //check if user is filling one of the form fields
            checkVal(singleInput);
            singleInput.on('change keyup', function(){
                checkVal(singleInput);
            });
        });
    }

    function checkVal(inputField) {
        ( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
    }

    //-- 5.12 validate and submit contact us form
    $('.contact-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Please insert your email address",
                email: "Your email address is not valid"
            },
            name: {
                required: "Please insert your name"
            },
            message: {
                required: "Please insert the message"
            },
        },
        submitHandler: function(form) {
            var url_dest = $(form).attr('action');
            var form_data = $(form).serialize();

            //-- show loading
            $('.contact-notif').show().append('<label class="loading-contact">Please wait</label>');
            $('.loading-contact').fadeIn('fast');

            $.post(url_dest,form_data,function(data){
                var success = data;

                if(success){
                    //-- reset form
                    $(form).trigger('reset');

                    //-- hide loading
                    $('.loading-contact').fadeOut('fast',function(){
                        //-- show notif
                        $('.contact-notif').append('<label class="contact-notif-success">Thank you for contacting us. We will reply you shortly.</label>');
                        $('.contact-notif-success').fadeIn('fast').delay(5000).fadeOut('fast',function(){
                            $(this).remove();
                            $('.loading-contact').remove();
                        });
                    });
                }
                else{
                    //-- reset form
                    $(form).trigger('reset');

                    //-- hide loading
                    $('.loading-contact').fadeOut('fast',function(){
                        //-- show notif
                        $('.contact-notif').append('<label class="contact-notif-error">Error.</label>');
                        $('.contact-notif-error').fadeIn('fast').delay(5000).fadeOut('fast',function(){
                            $(this).remove();
                            $('.loading-contact').remove();
                        });
                    });
                }
            });

            return false;
        }
    });
    //-- end validate and submit contact us form



	
});



