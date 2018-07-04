(function () {
    var videoPageLoadFlag = true;

    discoPagesLoad.videos = function () {

        var videosPage = document.getElementById("videosPage");

        function showDiscoItemVideo(i, time) {
            var it = $(".videos-page  .disco-single-item");

            setTimeout(function () {
                it.eq(i).addClass("show");
            }, time * 600);

        }

        $(".videos-page").scroll(function () {
            var it = $(".videos-page  .disco-single-item");
            for (var i = 0, time = 0, len = it.length ; i < len; i++) {
                var y = it.eq(i).offset().top;
                var he = height - 70;
                if (y < (he - 200)) {
                    if (!it.eq(i).hasClass("show")) {
                        showDiscoItemVideo(i, time);
                        time++;
                    }
                }
            }
        });

        setTimeout(function () {
            if (videoPageLoadFlag) {
                createVideoItems();
                Ps.initialize(videosPage, {
                    wheelSpeed: 2,
                    wheelPropagation: true,
                    minScrollbarLength: 20,
                    suppressScrollX: true
                });
                for (var i = 0 ; i < 5 ; i++) {
                    showDiscoItemVideo(i, i);
                }
                VideoPageLoadFlag = false;
            }

        }, 1000);
        $(window).on("resize", function () {
            Ps.update(videosPage);
        })


    }

    var videoData = new Array();


    $(document).ready(function () {
        $.ajax({
            contentType: "application/json;",
            type: "POST",
            data: {},
            dataType: "json",
            url: "Default.aspx/getVideo",
            success: function (re) {
                videoData = JSON.parse(re.d);
                ajaxLoadFlag.videos = true;
                removeFirstLoading();
            }, error: function (er) {

            }
        })

    })


    function createVideoItems() {
        var page = $(".videos-page");
        var br = [];
        console.log(videoData);
        for (var i = 0, len = videoData.length / 5 ; i < len ; i++) {
            br.push(3 + (i * 5));
            br.push(5 + (i * 5));
        }
        page.children().not(".scroll-bar").remove();
        for (var i = 0, len = videoData.length ; i < len ; i++) {
            var it = $("<div class=disco-single-item>");
            var img = $("<div class=img>");
            img.append($("<img>").attr({ "src": "images/video/" + videoData[i].image }));
            img.append($("<span>"));
            var det = $("<p class=detail>");
            det.html(videoData[i]["detail"].replace(/(?:\r\n|\r|\n)/g, '<br>'));
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
           
            var ly = $("<h5>").append($("<span class=gray>").text("Lyrics : ")).append($("<span>").text(videoData[i].lyrics));
            var ar = $("<h5>").append($("<span class=gray>").text("Arrangement : ")).append($("<span>").text(videoData[i].arrangement));
            var ma = $("<h5>").append($("<span class=gray>").text("Mastering : ")).append($("<span>").text(videoData[i].mastering));
            var re = $("<h5>").append($("<span class=gray>").text("Release : ")).append($("<span>").text(videoData[i].release));
            var hoLines = $("<div class=lines>");
            var a = $("<a>").text("Download").attr("href", videoData[i].src);

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

            if (!videoData[i].lyrics.toString().trim() == "") {
                hoContent.append(ly);
            }
            if (!videoData[i].arrangement.toString().trim() == "") {
                hoContent.append(ar);
            }
            if (!videoData[i].mastering.toString().trim() == "") {
                hoContent.append(ma);
            }
            if (!videoData[i].release.toString().trim() == "") {
                hoContent.append(re);
            }
            ho.append(a);
            for (var j = 0, len2 = videoData[i].title.length ; j < len2 ; j++) {
                $("<span>").text(videoData[i].title[j]).appendTo(h2).css("transition-delay", (j * 200) + "ms");
                $("<span>").text(videoData[i].title[j]).appendTo(hoH1).css("transition-delay", (j * 200) + "ms");
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

        var videoConttent = $(".disco-single-item .content")


        for (var i = 0, len = videoConttent.length ; i < len ; i++) {
            var cnt = videoConttent.eq(i)[0];
            Ps.initialize(cnt, {
                wheelSpeed: 1,
                wheelPropagation: true,
                minScrollbarLength: 20
            });

            $(window).on("resize", function () {
                Ps.update(cnt);
            })
        }
    }
}())