(function () {
    var bioData = new Array();
    var bioHolder;
    var liSize = new Object();
    $(document).ready(function () {
        var container = document.getElementById("biography");
        $.ajax({
            contentType: "application/json;",
            type: "POST",
            data: {},
            dataType: "json",
            url: "Default.aspx/getBio",
            success: function (re) {
                bioData = JSON.parse(re.d);
                ajaxLoadFlag.biography = true;
                removeFirstLoading();
                createBio();
                Ps.initialize(container, {
                    wheelSpeed: 2,
                    wheelPropagation: true,
                    minScrollbarLength: 20,
                    suppressScrollX: true
                });
            }, error: function (er) {
              
            }
        })
        bioHolder = $(".bio-holder");
        $(window).on("resize", function () {
            balanceBio();
            Ps.update(container);
        })
        bioHolder.scroll(function () {
            var art = $(".bio-holder > section > article");
            for (var i = 0, len = art.length ; i < len; i++) {
                var y = art.eq(i).offset().top;
                var he = height;
                if (y < (he / 1.5)) {
                    if (!art.eq(i).parent().hasClass("show")) {
                        runAnimate(i);
                    }
                }
            }
        })
        var sec = $(".bio-holder > section");
        for (var j = 0, len2 = sec.length ; j < len; j++) {
            var li = $(".bio-holder > section:eq(" + j + ") .lines span.vr , .bio-holder > section:eq(" + j + ") .lines span.hr  ");
            for (var i = 0, len = li.length ; i < len ; i++) {
                var del = retDelay(j, i);
                li.eq(i).css({ "transition-delay": del + "ms" });
            }
        }
    })
    function createBio() {
        bioHolder.empty();
        for (var i = 0, len = bioData.length ; i < len; i++) {
            var sec = $("<section>").appendTo(bioHolder);
            var header = $("<header>");
            for (var f = 0, len2 = (bioData[i].title).length ; f < len2 ; f++) {
                $("<span>").text((bioData[i].title)[f]).css("transition-delay", (f + 1) * 200 + "ms").appendTo(header);
            }

            var art = $("<article>").append($("<p>")
                .html(bioData[i].text.replace(/(?:\r\n|\r|\n)/g, '<br>')))
            .append($("<div class=img>").append($("<img>")
                .attr("src", "images/biography/" + bioData[i].image)));
            art.append(header);
            sec.append(art);
            if (!(i % 2) == 0) {
                sec.addClass("left");
            }
            var lines = $("<div class=lines>").appendTo(art);
            var box = $("<span class=box>").appendTo(lines);
            var imgBox = $("<span class=img-box>").appendTo(lines);
            var smBox = $("<span class=sm-box>").appendTo(box);
            for (var j = 0 ; j < 20 ; j++) {
                var sp = $("<span>").addClass("li" + (j + 1));
                if (j % 2 == 0) {
                    sp.addClass("vr");
                }
                else {
                    sp.addClass("hr");
                }
                if ((j > 0) && (j < 5)) {
                    sp.appendTo(box);
                }
                else if ((4 < j) && (j < 9)) {
                    sp.appendTo(smBox);
                }
                else if ((15 < j) && (j <= 20)) {
                    sp.appendTo(imgBox);
                }
                else {
                    sp.appendTo(lines);
                }
            }
        }
        $("<div class=padding>").css({ "height": "100px", "width": "100%", "clear": "both" }).appendTo(bioHolder);
        balanceBio();
    }
    function balanceBio() {
        var sec = $(".bio-holder > section");
        var art = $(".bio-holder > section > article");
        for (var i = 0, len = art.length ; i < len ; i++) {
            var he = +art.eq(i).height();
            var wi = art.eq(i).innerWidth();
            art.eq(i).css({ "width": (width - 420) + "px" });
            art.eq(i).find("p").css({ "width": ((width - 420) - 355) + "px" });
        }
        if ($(window).width() < 1000) {
            bioHolder.addClass("res");
        }
        else {
            bioHolder.removeClass("res");
        }
    }
    function animateLines(sec, i) {
        var li = $(".bio-holder > section:eq(" + sec + ") span.li" + (i + 1));
        var cl = li.attr("class").split(" ")[0];
        var dir = li.attr("class").split(" ")[1];
        if (dir == "hr") {
            var size = (liSize[cl] == "100%") ? li.parent().width() / 3 : liSize[cl];
            var wi = (typeof liSize[cl] == "number") ? size + "px" : liSize[cl];
            li.css({ "width": wi, "transition-duration": size * 5 + "ms" });
        }
        else if (dir == "vr") {
            var size = (liSize[cl] == "100%") ? li.parent().parent().height() / 3 : liSize[cl];

            var he = (typeof liSize[cl] == "number") ? size + "px" : liSize[cl];
            li.css({ "height": he, "transition-duration": size * 5 + "ms" });
        }
    }
    function retDelay(sec, i) {
        if (i == 15 || (i > 0 && i < 9) || i > 16) {
            return 0;
        }
        else {
            var li = $(".bio-holder > section:eq(" + sec + ") span.li" + (i + 1));
            var dir = li.attr("class").split(" ")[1];
            var cl = li.attr("class").split(" ")[0];
            var ti = 0;
            if (dir == "hr") {
                ti = (liSize[cl] == "100%") ? 0 : liSize[cl];
            }
            else if (dir == "vr") {
                ti = (liSize[cl] == "100%") ? 0 : liSize[cl];
            }
            return ti;
        }
    }
    function runAnimate(j) {
        var del = 0;
        var sec = $(".bio-holder > section");
        var li = $(".bio-holder > section:eq(" + j + ") .lines span.vr , .bio-holder > section:eq(" + j + ") .lines span.hr  ");
        sec.eq(j).addClass("show");
        for (var i = 0, len = li.length ; i < len; i++) {
            del = del + (retDelay(j, i) * 2);
            animateLines(j, i);
            if (i > 8) {
                setTimeout(function () {
                    sec.eq(j).find("header").addClass("show");
                    sec.eq(j).find("span.sm-box").addClass("show");
                }, del);

            }
        }
        window.setTimeout(function () {
            sec.eq(j).find("article").addClass("show");
        }, del);
    }
    liSize.li1 = 140;
    liSize.li2 = 50;
    liSize.li3 = 50;
    liSize.li4 = 50;
    liSize.li5 = 50;
    liSize.li6 = 15;
    liSize.li7 = 15;
    liSize.li8 = 15;
    liSize.li9 = 15;
    liSize.li10 = 85;
    liSize.li11 = "100%";
    liSize.li12 = "100%";
    liSize.li13 = "100%";
    liSize.li14 = "100%";
    liSize.li15 = 0;
    liSize.li16 = 20;
    liSize.li17 = 255;
    liSize.li18 = 255;
    liSize.li19 = 255;
    liSize.li20 = 255;

    startFunction.leftTop = function (del) {
        setTimeout(function () {
            navigationFlag = true;
            window.location.hash = "Biography";
            var art = $(".bio-holder > section > article");
            var he = $(".biography > header").addClass("show");
            for (var i = 0, len = he.find("span").length ; i < len ; i++) {
                he.find("span").eq(i).css("transition-delay", (i * 150) + "ms")
            }
            runAnimate(0);
            for (var i = 0, len = art.length ; i < len; i++) {
                var y = art.eq(i).offset().top;
                var hei = height;
                if (y < (hei / 1.5)) {
                    if (!art.eq(i).parent().hasClass("show")) {
                        runAnimate(i);
                    }
                }
            }
        }, del);
    };
}())