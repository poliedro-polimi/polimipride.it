$(document).ready(function () {
    var obj = $("section#header");
    var navbar = $("nav#mainNav");
    var togglebtn = $("button.navbar-toggler");

    $(window).scroll(function () {
        var top = $(window).scrollTop();
        var max = obj.height() * .90;

        if (togglebtn.is(":visible") && !togglebtn.hasClass("collapsed"))
            return;

        if (top >= max && !navbar.hasClass("affix"))
            navbar.addClass("affix");
        else if (top < max && navbar.hasClass("affix"))
            navbar.removeClass("affix");
    });

    togglebtn.click(function () {
        setTimeout(function () {
            if (!togglebtn.hasClass("collapsed")) {
                navbar.addClass("menu-open");
                if (!navbar.hasClass("affix"))
                    navbar.addClass("affix");
            } else {
                navbar.removeClass("menu-open");
            }
        }, 100);
    });
});