var albumData = new Object();

$(document).ready(function () {
    $.ajax({
        contentType: "application/json;",
        type: "POST",
        data: {},
        dataType: "json",
        url: "Default.aspx/getAlbum",
        success: function (re) {
            var data = JSON.parse(re.d);
            albumData.albums = data.Table;
            albumData.tracks = data.Table1;
            ajaxLoadFlag.albums = true;
            removeFirstLoading();
        }, error: function (er) {

        }
    })

})


var albumPageLoadFlag = true;

discoPagesLoad.albums = function () {





    var albumPage = document.getElementById("albumPage");
    function showDiscoItemAlbum(i, time) {
        var it = $(".albums-page  .disco-album-item");
        it.eq(i).addClass("show");
    }
    $(".albums-page").scroll(function () {
        var it = $(".albums-page  .disco-album-item");
        for (var i = 0, len = it.length ; i < len; i++) {
            var y = it.eq(i).offset().top;
            var he = height - 70;
            if (y < (he)) {
                if (!it.eq(i).hasClass("show")) {
                    showDiscoItemAlbum(i);
                }
            }
        }
    });
    setTimeout(function () {
        if (albumPageLoadFlag) {
            createAlbumItems();
            Ps.initialize(albumPage, {
                wheelSpeed: 1,
                wheelPropagation: true,
                minScrollbarLength: 20,
                suppressScrollX: true
            });
            showDiscoItemAlbum(0);
            showDiscoItemAlbum(1);

            albumPageLoadFlag = false;

            var albumItem = $(".albums-page .disco-album-item .album-content");
            for (var i = 0, len = albumItem.length ; i < len ; i++) {
                if (albumItem.eq(i).parent().hasClass("left")) {
                    albumItem.eq(i).css("left", (((width * 0.95) / 2) - 300) + "px");
                }
                else {
                    albumItem.eq(i).css("left", (((width * 0.95) / 2) - 200) + "px");
                }
            }
        }

    }, 1000);




    $(".albums-page").on("click", ".disco-album-item.show > .album-content >  .img , .disco-album-item.show > .album-content> .lines , .disco-album-item.show > .album-content > h2", function () {
        var item = $(this).parents(".disco-album-item");
        if (!item.hasClass("show-list")) {
            item.stop().animate({ "height": (height - 145) + "px" }, 1400);
            var sTop = item.prevAll().length * 400;
            $(".albums-page").stop().animate({ scrollTop: sTop }, 1400);

            $(".albums-page .disco-album-item").removeClass("show-list");
            $(".albums-page .disco-album-item").not(item).stop().animate({ "height": "400px" }, 1400).find(".album-list").fadeOut(1000);
            var he = $(".albums-page").height();
            if (he > 500) {
                item.find(".album-list .album-list-content").css("height", (he - 310) + "px");
            }
            else {
                item.find(".album-list .album-list-content").css("height", (300) + "px");
                item.stop().animate({ "height": (500) + "px" }, 200);
            }

            item.addClass("show-list");
            item.find(".album-list").stop().fadeIn(1000);
            var cnt = document.querySelector(".disco-album-item.show-list .album-list .content");

            Ps.initialize(cnt, {
                wheelSpeed: 1,
                wheelPropagation: true,
                minScrollbarLength: 20,
                suppressScrollX: true
            });

            $(window).on("resize", function () {
                Ps.update(cnt);
            })
        }
    });



    $(".albums-page").on("click", function (e) {
        if (!$(e.target).closest(".disco-album-item .album-content , .disco-album-item .album-list").length && !$(e.target).is(".disco-album-item .album-content , .disco-album-item .album-list") && !$(e.target).is(".disco-album-item .album-content * , .disco-album-item .album-list *")) {
            //$(".albums-page .disco-album-item.show-list .album-content h2").slideUp(50).delay(300).slideDown(300);
            $(".albums-page .disco-album-item.show-list").stop().animate({ "height": "400px" }, 1400);
            $(".albums-page .disco-album-item.show-list").find(".album-list").stop().fadeOut(1000);
            $(".albums-page .disco-album-item.show-list").removeClass("show-list");
        }

    });


    $(window).on("resize", function () {
        var albumItem = $(".albums-page .disco-album-item .album-content");
        for (var i = 0, len = albumItem.length ; i < len ; i++) {
            if (albumItem.eq(i).parent().hasClass("left")) {
                albumItem.eq(i).css("left", (((width * 0.95) / 2) - 300) + "px");
            }
            else {
                albumItem.eq(i).css("left", (((width * 0.95) / 2) - 200) + "px");
            }
        }

        Ps.update(albumPage);
    })



}


function createAlbumItems() {
    var page = $(".albums-page");
    for (var i = 0, len = albumData.albums.length ; i < len ; i++) {
        var it = $("<div class=disco-album-item>");
        var img = $("<div class=img>");
        var det = $("<p class=detail>");
        det.html(albumData.albums[i].detail.replace(/(?:\r\n|\r|\n)/g, '<br>'))
        img.append($("<img>").attr({ "src": "images/album/" + albumData.albums[i].image }));
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



        for (var j = 0, len2 = albumData.albums[i].title.length ; j < len2 ; j++) {
            $("<span>").text(albumData.albums[i].title[j]).appendTo(h2).css("transition-delay", (j * 100) + "ms");
        }
        var discoContent = $("<div class=album-content>");
        discoContent.append(box);
        discoContent.append(img)
        discoContent.append(lines)
        discoContent.append(h2);
        h2.append($("<span class=release>").text(albumData.albums[i].release));
        it.append(discoContent);
        page.append(it);

        if (i % 2 !== 0) {
            it.addClass("left");
        }

        if (i == 0) {
            it.css("margin-top", "0px");
        }



        var list = $("<div class=album-list>");
        var content = $("<div class=album-list-content>");
        var listLines = $("<div class=lines>");
        listLines.append($("<span class='li1 hr'>"));
        listLines.append($("<span class='li2 vr'>"));
        listLines.append($("<span class='li3 hr'>"));
        listLines.append($("<span class='li4 vr'>"));
        list.append(listLines);
       
        var listContent = $("<article class=content>");
        var contentTitle = $("<div class=title>");
        contentTitle.append($("<span>").text("No."));
        contentTitle.append($("<span>").text("Title"));
        contentTitle.append($("<span>").text("Time"));
        contentTitle.append($("<span>").text("Lyrics"));
        contentTitle.append($("<span>").text("Arrangement"));
        contentTitle.append($("<span>").text("Mix & Mastering"));
        list.append(content);
        content.append(listContent);
        listContent.append(contentTitle);
        var rows = albumData.tracks;
        for (var j = 0, len2 = rows.length ; j < len2 ; j++) {
            if (albumData.albums[i].id == rows[j].albumID) {
                var tableContent = $("<div class=table-content>");
                tableContent.append($("<span>").text(rows[j].number));
                tableContent.append($("<span>").text(rows[j].title));
                tableContent.append($("<span>").text(rows[j].time));
                tableContent.append($("<span>").text(rows[j].lyrics));
                tableContent.append($("<span>").text(rows[j].arrangement));
                tableContent.append($("<span>").text(rows[j].mastering));
                listContent.append(tableContent);
            }

        }

        listContent.append(det);
        it.append(list);

    }


    $("<div class=padding>").css({ "height": "80px", "width": "100%" }).appendTo(page);


}

