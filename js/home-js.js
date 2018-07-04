startFunction.HOME = function (flag) {
    setTimeout(function () {
        navigationFlag = true;
        if (flag == undefined) {
            window.location.hash = "Home";
        }
        
    }, 5000);
    createRandomLines();
    faceAnimation();
    animateNameSpan();
    animateNav();

};



function faceAnimation() {
    setTimeout(function () {
        $(".face").removeClass("hide");
        $(".la-link").removeClass("hide");
    }, 2000);

    setTimeout(function () {
        $(".face").css("transition-duration", "0s");
    }, 14000);
}




function createRandomLines() {
    for (i = 0 ; i < 6 ; i++) {



        var randopacity = Math.random();
        var randx = Math.floor(Math.random() * 99) + 1;
        var randy = Math.floor(Math.random() * 99) + 1;
        var randblur = Math.floor(Math.random() * 3) + 1;
        var rands = Math.floor(Math.random() * 16) + 18;
        var randanim = Math.floor(Math.random() * 5) + 1;

        var randomDelay = (Math.random() * 1000) + 1000;

        span = $("<span />").css({


            'top': randy + '%',
            'left': randx + '%',
            'filter': 'blur(' + randblur + 'px)',
            'opacity': 0,
            'animation': 'spAnim2' + ' ' + rands + 's alternate infinite'
            //+ randanim
        }).delay(1000).animate({ "opacity": randopacity }, randomDelay);;


        $(".body-span").append(span);
    }
}

function animateNameSpan() {

    setTimeout(function () {

        var sp = $(".home .name span");
        for (var i = 0, len = sp.length ; i < len ; i++) {
            sp.eq(i).css("transition-delay", (i * 200) + "ms").removeClass("hide");
        }
        $(".home .name").removeClass("hide");
    }, 4000);
}

function animateNav() {
    a = $("nav div");
    a.addClass("hide");
    setTimeout(function () {
        $(".section-nav").removeClass("hide");
    }, 6500);

    for (var i = 0; i < a.length; i++) {
        a.eq(i).removeClass("hide")
    };

}

