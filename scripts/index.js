var deltaTop = 0;

// 2, 5, 6, 4, 7, 3, 1
transforms = {
    "brush-1": {
        size: [1738 / 1080*.9, 625 / 1080*.9],
        translate: [-120 / 1080, 480 / 1080],
        rotate: -6,
        delay: 100,
    },
    "brush-2": {
        size: [1260 / 1080 * 1.05, 421 / 1080 * 1.05],
        translate: [581 / 1080, -210 / 1080],
        rotate: 11,
        delay: 800,
    },
    "brush-3": {
        size: [1878 / 1080, 470 / 1080],
        translate: [-237 / 1080, 651 / 1080],
        rotate: 6,
        delay: 1100,
    },
    "brush-4": {
        size: [1258 / 1080 * 1.25, 355 / 1080 * 1.25],
        translate: [-173 / 1080, 243 / 1080],
        rotate: -6,
        delay: 1800,
    },
    "brush-5": {
        size: [1361 / 1080, 436 / 1080],
        translate: [348 / 1080, 824 / 1080],
        rotate: -17,
        delay: 2200,
    },
    "brush-6": {
        size: [1240 / 1080, 468 / 1080],
        translate: [511 / 1080, 41 / 1080],
        rotate: 13,
        delay: 2600,
    },
    "brush-7": {
        size: [1473 / 1080, 515 / 1080],
        translate: [-388 / 1080, -4 / 1080],
        rotate: -9,
        delay: 3100,
    }
}

interpolation = function (k) {
    return .5 * (Math.sin((k - .5) * Math.PI) + 1);
}

Number.prototype.mapFull = function (inFrom, inTo, outFrom, outTo) {
    return (this - inFrom) * (outTo - outFrom) / (inTo - inFrom) + outFrom;
}

Number.prototype.map = function (outFrom, outTo) {
    return this * (outTo - outFrom) + outFrom;
}

let indexResize = function () {
    let innerHeight = document.getElementById('height-probe').clientHeight;
    let horizontal = window.innerWidth > innerHeight;
    let deltaX = (window.innerWidth - innerHeight / 3 * 4) / 2;
    let deltaY = (innerHeight - window.innerWidth / 3 * 4) / 2;
    for (let brush of Object.keys(transforms)) {
        let correctTranslationX = transforms[brush].translate[0] * (horizontal ? innerHeight : window.innerWidth) - deltaTop / 2;
        let correctTranslationY = transforms[brush].translate[1] * (horizontal ? innerHeight : window.innerWidth);
        let correctScaling = transforms[brush].size[0] * (horizontal ? innerHeight : window.innerWidth) / 100;
        let correctHeight = 100 / transforms[brush].size[0] * transforms[brush].size[1]
        let transform;
        if (horizontal) {
            transform = "translate(" +
                        (deltaX + correctTranslationX) +
                        "px, " +
                        correctTranslationY +
                        "px) scale(" +
                        correctScaling +
                        ", " +
                        correctScaling +
                        ") rotate(" +
                        transforms[brush].rotate +
                        "deg)";
        } else {
            transform = "translate(" +
                        (window.innerWidth - correctTranslationY) +
                        "px, " +
                        (deltaY + correctTranslationX) +
                        "px) scale(" +
                        correctScaling +
                        ", " +
                        correctScaling +
                        ") rotate(" +
                        (transforms[brush].rotate + 90) +
                        "deg)";
        }
        document.getElementById(brush).style.transform = transform
        document.getElementById(brush).style.height = correctHeight + "px"
    }
    if (!horizontal) {
        document.getElementById("scroll-down").style.bottom = deltaY + "px"
    } else {
        document.getElementById("scroll-down").style.bottom = ""
    }
}
onresizes.push(indexResize);

onloads.push(() => {
    let innerHeight = document.getElementById('height-probe').clientHeight;
    deltaTop = innerHeight - window.innerHeight;
    indexResize()
    ;
    let horizontal = window.innerWidth > innerHeight;
    for (let brush of Object.keys(transforms)) {
        setTimeout(() => {
            animateBrush(document.getElementById(brush), true);
        }, transforms[brush].delay)
        if (horizontal) {
            setTimeout(() => {
                document.getElementById("pride-inside-shadow").style.opacity = "0.4";
            }, 400)
            setTimeout(() => {
                document.getElementById("polimi-inside-shadow").style.opacity = "0.4";
            }, 2400)
        } else {
            setTimeout(() => {
                document.getElementById("pride-inside-shadow").style.opacity = "0.4";
                document.getElementById("polimi-inside-shadow").style.opacity = "0.4";
            }, 4000)
        }
        setTimeout(() => {
            document.getElementById("scroll-down").style.opacity = "1";
        }, 4500)
    }
});

let barVisible = false;
let barTimeouts = [];

let indexScroll = () => {
    let vHeight = document.getElementById("height-probe").offsetHeight;
    let barHeight = document.getElementById("nav-banner").offsetHeight;
    if ((document.documentElement.scrollTop > vHeight + barHeight) && !barVisible) {
        barVisible = true;
        barTimeouts.forEach(t => clearTimeout(t));
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-1"), true);
            document.getElementById("nav-logo").classList.add("nav-appeared")
        }, 0))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-7"), true);
            document.getElementById("nav-language").classList.add("nav-appeared")
            document.getElementById("bar-open").classList.add("nav-appeared")
        }, 200))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-5"), true);
            document.getElementById("nav-link-4").classList.add("nav-appeared")
        }, 400))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-3"), true);
            document.getElementById("nav-link-2").classList.add("nav-appeared")
        }, 400))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-4"), true);
            document.getElementById("nav-link-3").classList.add("nav-appeared")
        }, 600))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-2"), true);
            document.getElementById("nav-link-1").classList.add("nav-appeared")
        }, 800))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-6"), true);
            document.getElementById("nav-link-5").classList.add("nav-appeared")
        }, 800))
    }
    if ((document.documentElement.scrollTop < vHeight) && barVisible) {
        barVisible = false;
        barTimeouts.forEach(t => clearTimeout(t));
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-1"), false);
            document.getElementById("nav-logo").classList.remove("nav-appeared")
        }, 800))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-7"), false);
            document.getElementById("nav-language").classList.remove("nav-appeared")
            document.getElementById("bar-open").classList.remove("nav-appeared")
        }, 600))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-5"), false);
            document.getElementById("nav-link-4").classList.remove("nav-appeared")
        }, 400))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-3"), false);
            document.getElementById("nav-link-2").classList.remove("nav-appeared")
        }, 400))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-4"), false);
            document.getElementById("nav-link-3").classList.remove("nav-appeared")
        }, 100))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-2"), false);
            document.getElementById("nav-link-1").classList.remove("nav-appeared")
        }, 0))
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-6"), false);
            document.getElementById("nav-link-5").classList.remove("nav-appeared")
        }, 0))
        closeMobileBar();
    }
}
onscrolls.push(indexScroll);
