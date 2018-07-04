(function () {
    var colleagueData = new Array();
    var colleaguePageLoadFlag = true;
    startFunction.rightTop = function (del) {
        setTimeout(function () {
            navigationFlag = true;
            window.location.hash = "Colleague";
            var colleaguePage = document.getElementById("colleaguePage");
            function showColleagueItems(i, time) {
                var it = $(".colleague-page  .colleague-item");
                setTimeout(function () {
                    it.eq(i).addClass("show");
                }, time * 600);
            }
            $(".colleague-page").scroll(function () {
                var it = $(".colleague-page  .colleague-item");
                for (var i = 0, time = 0, len = it.length ; i < len; i++) {
                    var y = it.eq(i).offset().top;
                    var he = height - 70;
                    if (y < (he - 200)) {
                        if (!it.eq(i).hasClass("show")) {
                            showColleagueItems(i, time);
                            time++;
                        }
                    }
                }
            });
            if (colleaguePageLoadFlag) {
                createColleagueItems();
                var cont = $(".colleague-item .hover .content");
                for (var i = 0, len = cont.length ; i < len ; i++) {
                    Ps.initialize(cont.eq(i)[0], {
                        wheelSpeed: 2,
                        wheelPropagation: true,
                        minScrollbarLength: 20,
                        suppressScrollX: true
                    });
                }
                Ps.initialize(colleaguePage, {
                    wheelSpeed: 2,
                    wheelPropagation: true,
                    minScrollbarLength: 20,
                    suppressScrollX: true
                });
                for (var i = 0 ; i < 5 ; i++) {
                    showColleagueItems(i, i);
                }
                colleaguePageLoadFlag = false;
                var he = $(".colleague > header").addClass("show");
                for (var i = 0, len = he.find("span").length ; i < len ; i++) {
                    he.find("span").eq(i).css("transition-delay", (i * 150) + "ms")
                }
            }
            $(window).on("resize", function () {
                Ps.update(colleaguePage);
            })
        }, del);
    }
    $(document).ready(function () {
        $.ajax({
            contentType: "application/json;",
            type: "POST",
            data: {},
            dataType: "json",
            url: "Default.aspx/getCol",
            success: function (re) {
                colleagueData = JSON.parse(re.d);
                ajaxLoadFlag.colleague = true;
                removeFirstLoading();
            }, error: function (er) {
             
            }
        })
    })
    function createColleagueItems() {
        var page = $(".colleague-page");
        var br = [];
        for (var i = 0, len = colleagueData.length / 5 ; i < len ; i++) {
            br.push(3 + (i * 5));
            br.push(5 + (i * 5));
        }
        page.children().not(".scroll-bar").remove();
        for (var i = 0, len = colleagueData.length ; i < len ; i++) {
            var it = $("<div class=colleague-item>");
            var img = $("<div class=img>");
            img.append($("<img>").attr({ "src": "images/colleague/" + colleagueData[i].image }));
            img.append($("<span>"));
            var lines = $("<div class=lines>");
            var box = $("<span class=box>");
            for (var j = 0 ; j < 8 ; j++) {
                var sp = $("<span>").addClass("li" + (j + 1));
                if (j < 4) {
                    lines.append(sp);
                }
                else if (4 < j < 8) {
                    box.append(sp);
                }
                if (((j + 1) % 2) == 0) {
                    sp.addClass("hr")
                }
                else {
                    sp.addClass("vr")
                }
            }
            var h2 = $("<h2>");
            var ho = $("<div class=hover>");
            var hoContent = $("<div class=content>");
            var hoH1 = $("<h1>");
            var p = $("<p>").html(colleagueData[i].detail.replace(/(?:\r\n|\r|\n)/g, '<br>'));
            var hoLines = $("<div class=lines>");
            for (var j = 0 ; j < 5 ; j++) {
                var sp = $("<span>");
                sp.addClass("li" + (j + 1));

                if (j % 2 == 0) {
                    sp.addClass("hr");
                }
                else {
                    sp.addClass("vr");
                }
                if (j == 4) {
                    hoH1.append(sp);
                }
                else {
                    hoLines.append(sp);
                }
            }
            ho.append(hoLines);
            ho.append(hoH1);
            ho.append(hoContent);
            hoContent.append(p);
            for (var j = 0, len2 = colleagueData[i].name.length ; j < len2 ; j++) {
                $("<span>").text(colleagueData[i].name[j]).appendTo(h2).css("transition-delay", (j * 200) + "ms");
                $("<span>").text(colleagueData[i].name[j]).appendTo(hoH1).css("transition-delay", (j * 100) + "ms");
            }
            h2.append($("<span class=info>").text(colleagueData[i].info));
            it.append(box);
            it.append(img)
            it.append(lines)
            it.append(h2);
            it.append(ho);
            page.append(it);
            for (var k = 0, len2 = br.length ; k < len2 ; k++) {
                if ((i + 1) == br[k]) {
                    page.append($("<br>"));
                }
            }
        }
        $("<div class=padding>").css({ "height": "100px", "width": "100%" }).appendTo(page);
    }
}())