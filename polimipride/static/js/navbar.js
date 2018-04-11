var obj, navbar;

function setNavbarTransparency() {
    var top = $(window).scrollTop();
    var max = obj.height() * .2;

    if (top >= max && navbar.hasClass("transparent"))
        navbar.removeClass("transparent");
    else if (top < max && !navbar.hasClass("transparent"))
        navbar.addClass("transparent");
}

$(document).ready(function () {
    obj = $("section#header");
    navbar = $("nav#mainNav");
    var togglebtn = $("button.navbar-toggler");

    $(window).scroll(setNavbarTransparency);

    togglebtn.click(function () {
        setTimeout(function () {
            if (!togglebtn.hasClass("collapsed")) {
                $(".navbar-toggler .navbar-red-bullet").fadeOut();
                navbar.addClass("menu-open");
                if (navbar.hasClass("transparent"))
                    navbar.removeClass("transparent");
            } else {
                navbar.addClass("menu-open");
                setNavbarTransparency();
            }
        }, 100);
    });
});