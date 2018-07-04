$(document).ready(function () {
    createSocialnetworks();
   var contactHolder = document.getElementById("contactHolder");
    function createSocialnetworks() {
        $(".socialnetworks div").addClass("hide");
        $(".contact   .contact-details").addClass("hide");
        $(".contactus-section").addClass("hide");
        $(".contactus-section .text span").addClass("hide");

    }

    Ps.initialize(contactHolder, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 20,
        suppressScrollX: true
    });

    $(window).on("resize", function () {
        Ps.update(contactHolder);
    })
})
startFunction.rightBottom = function (del) {
    setTimeout(function () {
        navigationFlag = true;
        window.location.hash = "Contact";
        animateSpan();
        $(".contact   .contact-details").removeClass("hide");
        var he = $(".contact > header").addClass("show");
        for (var i = 0, len = he.find("span").length ; i < len ; i++) {
            he.find("span").eq(i).css("transition-delay", (i * 150) + "ms")
        }
        function animateSpan() {
            setTimeout(function () {
                var cs = $(".contactus-section");
                for (var i = 0, len = cs.length ; i < len ; i++) {
                    cs.eq(i).css("transition-delay", (i * 50) + "ms").removeClass("hide");
                }
            }, 500);
            setTimeout(function () {
                var sp = $(".socialnetworks div");
                for (var i = 0, len = sp.length ; i < len ; i++) {
                    sp.eq(i).css("transition-delay", (i * 50) + "ms").removeClass("hide");
                }
            }, 500);
            setTimeout(function () {
                var sp = $(".contactus-section .text span");
                for (var i = 0, len = sp.length ; i < len ; i++) {
                    sp.eq(i).css("transition-delay", (i * 50) + "ms").removeClass("hide");
                }
            }, 500);
        }
    }, del);
}