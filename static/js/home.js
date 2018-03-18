"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
    var height = document.getElementsByClassName("page-header")[0].offsetHeight;
    var btn = document.getElementById("scopridipiubtn");

    btn.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: height,
            behavior: "smooth"
        });
    });
});