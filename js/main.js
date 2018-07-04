/// <reference path="jquery.js" />
var navigationFlag = false;
var width;
var height;
var startFunction = new Object();

function siteFirstLoad() {
    startFunction.HOME(false);
    setTimeout(CheckHashUrl, 5001);
   
}


function CheckHashUrl() {

    if (window.location.hash) {

        var btn = new Object();
        btn.HOME = ".home-nav";
        btn.RT = ".right-top-nav";
        btn.RB = ".right-bottom-nav";
        btn.LT = ".left-top-nav";
        btn.LB = ".left-bottom-nav";

        var url = window.location.hash.substring(1).toLowerCase();

        switch (url) {

            case "biography":
                $(btn.LT).click();
            case "discography":
                $(btn.LB).click();
            case "contact":
                $(btn.RB).click();
            case "colleague":
                $(btn.RT).click();

        }
    }

}

var ajaxLoadFlag = {
    biography: false,
    albums: false,
    single: false,
    colleague: false,
    videos : false
}



function removeFirstLoading() {


    if (ajaxLoadFlag.albums && ajaxLoadFlag.biography && ajaxLoadFlag.single && ajaxLoadFlag.colleague && ajaxLoadFlag.videos) {
        $(".loadDiv").fadeOut(500);
        siteFirstLoad();
    }
}

$(document).ready(function () {

    var homeSection = $(".pagePart.home");

    // Define Navigation Variables
    var btn = new Object();
    btn.HOME = ".home-nav";
    btn.RT = ".right-top-nav";
    btn.RB = ".right-bottom-nav";
    btn.LT = ".left-top-nav";
    btn.LB = ".left-bottom-nav";

    // Define Button Click Functions
    var btnClick = new Object();

    //Define Duration Variables
    var dur = new Object();
    dur.short = 1000;
    dur.middle = 2000;
    dur.long = 4000;

    // Difine Page Variables

    var pages = new Object();

    pages.C = ".pagePart.home";
    pages.RT = ".pagePart.colleague";
    pages.RB = ".pagePart.contact";
    pages.LT = ".pagePart.biography";
    pages.LB = ".pagePart.discography";


    var frames = new Object();
    var st = true;
    holder = $(".pageHolder");
    width = $(window).width();
    height = $(window).height();
    $("main.main").css({ "width": width + "px", "height": height + "px" });
    holder.css({ "margin-left": (-width) + "px", "margin-top": (-height / 2) + "px" });
    $("section.pagePart").css({ "width": width + "px", "height": height + "px" });


    // HOME BUTTON
    btnClick.HOME = function () {
        var loc = holder.attr("data-loc")[0];

        if (st == true) {
            setTimeout(function () {
                navigationFlag = true;
                window.location.hash = "#Home";
            }, dur.middle + dur.short);

            getOpacity(pages.C, dur.middle + dur.short);
            $(".home .name").addClass("hide");
            setTimeout(function () { $(".home .name").removeClass("hide"); }, dur.middle + dur.short + 1000);

            st = false;
            frames.VM();
            frames.HM();
            holder.attr("data-loc", "C");
            $.when(holder).done(function () {
                st = true;
            })
        }

    }

    // LEFT BOTTOM
    btnClick.LB = function () {
        var loc = holder.attr("data-loc")[0];
        if (st == true) {
            st = false;
            if (loc == "C") {
                frames.L();
                frames.B();
                startFunction.leftBottom(dur.long + dur.short);
                getOpacity(pages.LB, dur.long + dur.short);

            }
            else if (loc == "L") {
                frames.B();
                startFunction.leftBottom(dur.short);
                getOpacity(pages.LB, dur.short);
            }
            else {
                frames.VM();
                frames.L();
                frames.B();
                startFunction.leftBottom(dur.long + dur.short + dur.short);
                getOpacity(pages.LB, dur.long + dur.short + dur.short);
            }
            $.when(holder).done(function () {
                st = true;
            })

            holder.attr("data-loc", "LB");
        }
    }

    // LEFT TOP
    btnClick.LT = function () {
        var loc = holder.attr("data-loc")[0];
        if (st == true) {
            st = false;
            if (loc == "C") {
                frames.L();
                frames.T();
                startFunction.leftTop(dur.long + dur.short);
                getOpacity(pages.LT, dur.long + dur.short);

            }
            else if (loc == "L") {
                frames.T();
                startFunction.leftTop(dur.short);
                getOpacity(pages.LT, dur.short);
            }
            else {
                frames.VM();
                frames.L();
                frames.T();
                startFunction.leftTop(dur.long + dur.short + dur.short);
                getOpacity(pages.LT, dur.long + dur.short + dur.short);

            }
            $.when(holder).done(function () {
                st = true;
            })
            holder.attr("data-loc", "LT");
        }
    }

    // RIGHT TOP
    btnClick.RT = function () {
        var loc = holder.attr("data-loc")[0];
        if (st == true) {
            st = false;
            if (loc == "C") {
                frames.R();
                frames.T();
                startFunction.rightTop(dur.long + dur.short);
                getOpacity(pages.RT, dur.long + dur.short);
            }
            else if (loc == "R") {
                frames.T();
                startFunction.rightTop(dur.short);
                getOpacity(pages.RT, dur.short);
            }
            else {
                frames.VM();
                frames.R();
                frames.T();
                startFunction.rightTop(dur.long + dur.short + dur.short);
                getOpacity(pages.RT, dur.long + dur.short + dur.short);
            }
            $.when(holder).done(function () {
                st = true;
            })
            holder.attr("data-loc", "RT");
        }
    }

    // RIGHT BOTTOM
    btnClick.RB = function () {
        var loc = holder.attr("data-loc")[0];
        if (st == true) {
            st = false;
            if (loc == "C") {
                frames.R();
                frames.B();
                startFunction.rightBottom(dur.long + dur.short);
                getOpacity(pages.RB, dur.long + dur.short);
            }
            else if (loc == "R") {
                frames.B();
                startFunction.rightBottom(dur.short);
                getOpacity(pages.RB, dur.short);
            }
            else {
                frames.VM();
                frames.R();
                frames.B();
                startFunction.rightBottom(dur.long + dur.short + dur.short);
                getOpacity(pages.RB, dur.long + dur.short + dur.short);


            }
            $.when(holder).done(function () {
                st = true;
            })
            holder.attr("data-loc", "RB");


        }
    }

    frames.VM = function () {
        holder.animate({ "top": "0" }, dur.short);
    }

    frames.HM = function () {
        holder.animate({ "left": "0" }, dur.middle);
    }

    frames.B = function () {
        holder.animate({ "top": "-50%" }, dur.short);
    }

    frames.T = function () {
        holder.animate({ "top": "50%" }, dur.short);
    }

    frames.L = function () {
        holder.animate({ "left": "100%" }, dur.long);
    }

    frames.R = function () {
        holder.animate({ "left": "-100%" }, dur.long);
    }


    $(window).on("resize", function () {
        width = $(window).width();
        height = $(window).height();
        $("main.main").css({ "width": width + "px", "height": height + "px" });
        holder.css({ "margin-left": (-width) + "px", "margin-top": (-height / 2) + "px" });
        $("section.pagePart").css({ "width": width + "px", "height": height + "px" });
    })


    $(".section-nav nav div").click(function () {
        if (navigationFlag) {
            navigationFlag = false;
            var item = $(this);
            if ($(this).attr("class") == "home-nav") {
                btnClick.HOME();

                setTimeout(function () {
                    item.removeClass().addClass(item.attr("data-class")).find("a").text(item.attr("data-text")).attr("href" ,"#" + item.attr("data-href"));
                }, 1000);
                $(this).find("a").animate({ "opacity": "0" }, 1000).delay(400).animate({ "opacity": "1" }, 1000);


            }
            else {
                setTimeout(function () {
                    item.removeClass().addClass("home-nav").find("a").text('Home').attr("href" , "#Home");
                }, 1000);
                btnClick[$(this).attr("data-loc")]();
                $(this).find("a").animate({ "opacity": "0" }, 1000).delay(400).animate({ "opacity": "1" }, 1000);


            }
            var nv = $(".section-nav nav div").not($(this));
            var nvItem;
            for (var i = 0, len = nv.length ; i < len ; i++) {
                if (nv.eq(i).hasClass("home-nav")) {
                    nvItem = nv.eq(i);
                    setTimeout(function () {
                        nvItem.removeClass().addClass(nvItem.attr("data-class")).find("a").text(nvItem.attr("data-text")).attr("href","#" + item.attr("data-href"));
                    }, 500);
                    btnClick[nvItem.attr("data-loc")]();
                    nvItem.find("a").animate({ "opacity": "0" }, 500).delay(200).animate({ "opacity": "1" }, 500);
                }
            }
        }
    });


    function getOpacity(el, del) {
        if (typeof el == "string") {
            el = $(el);
        }
        $(".pageHolder > section").addClass("scale");
        holder.find("section.pagePart").not(el).animate({ "opacity": "0.2", "transform": "translateX(1000px)" }, 1000);
        setTimeout(function () {
            el.animate({ "opacity": "1" }, 1000);
            $(".pageHolder > section").removeClass("scale");
        }, del - 1000);
    }
    (function () {
        var loc = 0;
        var locPages = ["HOME", "LT", "LB", "RT", "RB"];
        $(window).on("wheel", function (e) {
            if (e.originalEvent.deltaY > 0) {
                if (loc == 0) {
                    loc++;
                    showPage(1);
                }
            }
        })
        function showPage(loc) {
            if ($(".pageHolder").attr("data-loc") == "C") {
                $(btn[locPages[loc]]).click();
            }
        }
    }())
});







$(document).ready(function () {
    var hamburgerMenuKey = 0;
    $(".hamburgerMenuKey").click(function (e) {
        if (hamburgerMenuKey == 0) {
            $(".section-nav").addClass("show");

            $(".close_btn").removeClass("normal").addClass("active");
            $(".right_menu").removeClass("close");


            setTimeout(function () { hamburgerMenuKey = 1; }, 300);
        }
        else if (hamburgerMenuKey == 1) {
            $(".section-nav").removeClass("show");


            $(".close_btn").removeClass("active").addClass("normal");
            $(".right_menu").addClass("close");


            setTimeout(function () { hamburgerMenuKey = 0; }, 300);

        }
    });

    $(".section-nav a").click(function () {
        if (width < 480) {
            $(".section-nav").removeClass("show");
            $(".close_btn").removeClass("active").addClass("normal");
            $(".right_menu").addClass("close");

            setTimeout(function () { hamburgerMenuKey = 0; }, 300);
        }
    });

})