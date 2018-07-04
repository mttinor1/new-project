(function () {
    var singlePageLoadFlag = true;

    discoPagesLoad.singles = function () {

        var singlePage = document.getElementById("singlePage");

        function showDiscoItemSingle(i, time) {
            var it = $(".singles-page  .disco-single-item");

            setTimeout(function () {
                it.eq(i).addClass("show");
            }, time * 600);

        }

        $(".singles-page").scroll(function () {
            var it = $(".singles-page  .disco-single-item");
            for (var i = 0, time = 0, len = it.length ; i < len; i++) {
                var y = it.eq(i).offset().top;
                var he = height - 70;
                if (y < (he - 200)) {
                    if (!it.eq(i).hasClass("show")) {
                        showDiscoItemSingle(i, time);
                        time++;
                    }
                }
            }
        });

        setTimeout(function () {
            if (singlePageLoadFlag) {
                createSingleItems();
                Ps.initialize(singlePage, {
                    wheelSpeed: 2,
                    wheelPropagation: true,
                    minScrollbarLength: 20,
                    suppressScrollX: true
                });
                for (var i = 0 ; i < 5 ; i++) {
                    showDiscoItemSingle(i, i);
                }
                singlePageLoadFlag = false;
            }

        }, 1000);
        $(window).on("resize", function () {
            Ps.update(singlePage);
        })


    }

    var singleData = new Array();


    $(document).ready(function () {
        $.ajax({
            contentType: "application/json;",
            type: "POST",
            data: {},
            dataType: "json",
            url: "Default.aspx/getSingle",
            success: function (re) {
                singleData = JSON.parse(re.d);
                ajaxLoadFlag.single = true;
                removeFirstLoading();
            }, error: function (er) {

            }
        })

    })


    function createSingleItems() {
        var page = $(".singles-page");
        var br = [];
        for (var i = 0, len = singleData.length / 5 ; i < len ; i++) {
            br.push(3 + (i * 5));
            br.push(5 + (i * 5));
        }
        page.children().not(".scroll-bar").remove();
        for (var i = 0, len = singleData.length ; i < len ; i++) {
            var it = $("<div class=disco-single-item>");
            var img = $("<div class=img>");
            img.append($("<img>").attr({ "src": "images/single/" + singleData[i].image }));
            img.append($("<span>"));
            var det = $("<p class=detail>");
            det.html(singleData[i]["detail"].replace(/(?:\r\n|\r|\n)/g, '<br>'));
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
            var ly = $("<h5>").append($("<span class=gray>").text("Lyrics : ")).append($("<span>").text(singleData[i].lyrics));
            var ar = $("<h5>").append($("<span class=gray>").text("Arrangement : ")).append($("<span>").text(singleData[i].arrangement));
            var ma = $("<h5>").append($("<span class=gray>").text("Mastering : ")).append($("<span>").text(singleData[i].mastering));
            var re = $("<h5>").append($("<span class=gray>").text("Release : ")).append($("<span>").text(singleData[i].release));
            var hoLines = $("<div class=lines>");
            var a = $("<a>").text("Download").attr("href", singleData[i].src);

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
            if (!singleData[i].lyrics.toString().trim() == "") {
                hoContent.append(ly);
            }
            if (!singleData[i].arrangement.toString().trim() == "") {
                hoContent.append(ar);
            }
            if (!singleData[i].mastering.toString().trim() == "") {
                hoContent.append(ma);
            }
            if (!singleData[i].release.toString().trim() == "") {
                hoContent.append(re);
            }
            ho.append(a);
            for (var j = 0, len2 = singleData[i].title.length ; j < len2 ; j++) {
                $("<span>").text(singleData[i].title[j]).appendTo(h2).css("transition-delay", (j * 200) + "ms");
                $("<span>").text(singleData[i].title[j]).appendTo(hoH1).css("transition-delay", (j * 200) + "ms");
            }

            hoContent.append(det);
            it.append(box);
            it.append(img);
            it.append(lines);
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

        var albumConttent = $(".disco-single-item .content")


        for (var i = 0, len = albumConttent.length ; i < len ; i++) {
            var cnt = albumConttent.eq(i)[0];
            Ps.initialize(cnt, {
                wheelSpeed: 1,
                wheelPropagation: true,
                minScrollbarLength: 20,
                suppressScrollX : true
            });
            

            $(window).on("resize", function () {
                Ps.update(cnt);
            })
        }
    }
}())