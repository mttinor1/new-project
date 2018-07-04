/// <reference path="jquery.js" />
/// <reference path="main.js" />

var discoNavFlag = true;



$(document).ready(function () {
    var discoNavHeight = 350;
    var discoNavWidth = 740;
  

    //$(".discoNav").css({ "top": ((height / 2) - (discoNavHeight / 2)) + "px", "left": ((width / 2) - (discoNavWidth / 2)) + "px" });
    balanceDiscoNav();

    $(".discoImgHolder , .discoTitleHolder ").click(function () {
        if (discoNavFlag) {
            discoNavFlag = false;

            setTimeout(function () {
                $(".discography header.main-header").removeClass("show");
                $(".back-to-disco").addClass("show");
            }, 700);

            $(".discoNav").addClass("top");
            if ($(this).parent().hasClass("discoSingles")) {
                $(".discoSingles").addClass("active");
                loadSinglePage();
            }
            else if ($(this).parent().hasClass("discoAlbums")) {
                $(".discoAlbums").addClass("active");
                loadAlbumPage();
            }
            else if ($(this).parent().hasClass("discoVideos")) {
                $(".discoVideos").addClass("active");
                loadVideosPage();
            }
        }
    })

    $(".back-to-disco").click(function () {
        discoNavFlag = true;
        $(".discoNav").removeClass().addClass("discoNav");
        $(".discoNavItem").removeClass("active");
        $(".discography  > section").animate({ "top": "110%", "opacity": "0" }, 1000);
        $(this).removeClass("show");
        //$(".discoNav").css({ "top": ((height / 2) - (discoNavHeight / 2)) + "px", "left": ((width / 2) - (discoNavWidth / 2)) + "px" });
        balanceDiscoNav();
        $(".discography header.main-header").addClass("show");
    });
    $(window).on("resize", function () {
        //if (!$(".discoNav").hasClass("top")) {
        //    discoNavHeight = $(".discoNav").height();
        //    discoNavWidth = $(".discoNav").width();
        //}
      
        balanceDiscoNav();
    });

    $(".discoNavItem > div").hover(function (e) {
        $(this).parent().addClass("hover");
        $(".discoNavItem").not($(this).parent()).addClass("effect");
    }
    , function () {
        $(this).parent().removeClass("hover");
        $(".discoNavItem").removeClass("effect");
    });


    function balanceDiscoNav() {
        var newTop = (((height / 2) - (discoNavHeight / 2))) <= 100 ? 100 : ((height / 2) - (discoNavHeight / 2));
        var newLeft = ((width / 2) - (discoNavWidth / 2));

        $(".discoNav").css({ "top": newTop + "px", "left": newLeft + "px" });
    }

});

function runDiscoAnimation(cl) {
    var al = $(cl);
    al.addClass("show");
    var he = al.find("h2 span");
    for (var i = 0, len = he.length ; i < len ; i++) {
        he.eq(i).css("transition-delay", (i * 200) + "ms");
    }
    for (var i = 0 ; i < 4 ; i++) {
        var li = al.find(".li" + (i + 1));
        if (li.hasClass("vr")) {
            li.css("height", "100%");
        }
        else {
            li.css("width", "100%");
        }
        li.css({ "transition-duration": "2000ms" });
    }
}

startFunction.leftBottom = function (del) {

    setTimeout(function () {
        if (!$(".discoNav").hasClass("top")) {
            var he = $(".pagePart.discography  header.main-header").addClass("show");
            for (var i = 0, len = he.find("span").length ; i < len ; i++) {
                he.find("span").eq(i).css("transition-delay", (i * 50) + "ms")
            }
        }
        navigationFlag = true;
        window.location.hash = "Discography";

        runDiscoAnimation($(".discoSingles"));
        setTimeout(function () {
            runDiscoAnimation($(".discoAlbums"));
        }, 500);
        setTimeout(function () {
            runDiscoAnimation($(".discoVideos"));
        }, 1000);
    }, del)
};

var discoPagesLoad = new Object();

function loadAlbumPage() {
    $(".discoNav").addClass("album");
    setTimeout(function () {
        $(".discography > .albums-page-holder").animate({ "top": "0", "opacity": "1" }, 2000);
    }, 700);
    discoPagesLoad.albums();

}
function loadSinglePage() {
    $(".discoNav").addClass("single");
    setTimeout(function () {
        $(".discography > .singles-page-holder").animate({ "top": "0", "opacity": "1" }, 2000);
    }, 700);

    discoPagesLoad.singles();
}

function loadVideosPage() {
    setTimeout(function () {
        $(".discography > .videos-page-holder").animate({ "top": "0", "opacity": "1" }, 2000);
    }, 700);

    discoPagesLoad.videos();
}
