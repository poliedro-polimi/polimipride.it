var deltaTop = 0;

// 2, 5, 6, 4, 7, 3, 1
transforms = {
    "brush-1": {
        size: [1738 / 1080 * .9, 625 / 1080 * .9],
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
    document.getElementById("sponsor-background").style.display = "block";
    document.getElementById("sponsor-background").style.top = document.getElementById("sponsor").offsetTop + "px";
    
}
onresizes.push(indexResize);

onloads.push(() => {
    let innerHeight = document.getElementById('height-probe').clientHeight;
    deltaTop = innerHeight - window.innerHeight;
    indexResize()
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
    if ((document.documentElement.scrollTop > vHeight * 0.7) && !barVisible) {
        barVisible = true;
        barTimeouts.forEach(t => clearTimeout(t));
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-back"), true);
        }, 1000))
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
    if ((document.documentElement.scrollTop < vHeight * 0.7 - barHeight) && barVisible) {
        barVisible = false;
        barTimeouts.forEach(t => clearTimeout(t));
        barTimeouts.push(setTimeout(() => {
            animateBrush(document.getElementById("brush-nav-back"), false);
        }, 0))
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
    document.querySelectorAll(".index-section").forEach(e => {
        let space = e.getAttribute("space");
            let fixedPercent;
            let fixedHeight = parseInt(getComputedStyle(document.documentElement)
                                           .getPropertyValue('--fixed-pause-height'));
        let spaceElement;
        if (space != null) {
            spaceElement = document.getElementById(space);
            e.classList.remove("section-fixed")
            e.classList.remove("section-passed")
            spaceElement.style.display = "none"
            e.offsetWidth;
        }
        let sectionPosition = e.offsetTop - document.documentElement.scrollTop;
        if (space != null) {
            if (sectionPosition > barHeight) {
                fixedPercent = 0;
                e.classList.remove("section-fixed")
                e.classList.remove("section-passed")
                spaceElement.style.display = "none"
            } else if (sectionPosition > -fixedHeight + barHeight) {
                fixedPercent = (sectionPosition - barHeight) / -fixedHeight
                e.classList.add("section-fixed")
                e.classList.remove("section-passed")
                spaceElement.style.display = "block"
            } else {
                fixedPercent = 1;
                e.classList.remove("section-fixed")
                e.classList.add("section-passed")
                spaceElement.style.display = "none"
            }
            if (fixedPercent != null) {
                switch (e.getAttribute("id")) {
                    case "events": {
                        let selectedChild = Math.min(2, Math.floor(fixedPercent * 3));
                        let oldSelected = parseInt(e.getAttribute("selected"));
                        if (oldSelected !== selectedChild) {
                            e.querySelectorAll("#events-container>.event").forEach(card => card.classList.remove("highlighted"))
                            e.querySelector("#events-container>.event:nth-child(" + (selectedChild + 1) + ")").classList.add("highlighted")
                            e.setAttribute("selected", selectedChild + "");
                            for (let i = 1; i < 4; i++) {
                                animateBrush(document.getElementById("event-brush-" + i), (i - 1) === selectedChild);
                            }
                        }
                        break;
                    }
                    case "pap": {
                        let selectedChild = Math.min(2, Math.floor(fixedPercent * 3));
                        let oldSelected = parseInt(e.getAttribute("selected"));
                        if (oldSelected !== selectedChild) {
                            e.querySelectorAll("#pap-container>.pap").forEach(card => card.classList.remove("highlighted"))
                            e.querySelector("#pap-container>.pap:nth-child(" + (selectedChild + 1) + ")").classList.add("highlighted")
                            e.setAttribute("selected", selectedChild + "");
                            for (let i = 1; i < 4; i++) {
                                animateBrush(document.getElementById("pap-brush-" + i), (i - 1) === selectedChild);
                            }
                        }
                        break;
                    }
                }
            }
            e.offsetWidth;
        }
    
        switch (e.getAttribute("id")) {
    
            case "goal": {
                let goalsContent = document.getElementById("goal-content");
                let picture = document.getElementById("goal-img");
                let textChild = new Array(
                    ...document.querySelectorAll(
                        "#goal-content>.goal-subtitle,#goal-content>.goal-paragraph"));
                let heightDifferenceA = textChild.slice(0, 2)
                                                 .reduce((sum, el) => sum + el.getBoundingClientRect().height, 0);
                let heightDifferenceB = textChild.slice(2, 4)
                                                 .reduce((sum, el) => sum + el.getBoundingClientRect().height, 0);
                picture.style.height = goalsContent.offsetHeight - heightDifferenceA - heightDifferenceB + "px";
                picture.style.backgroundPositionX = 100 * (sectionPosition - barHeight - fixedHeight) / -(fixedHeight * 3) + "%"
            }
        }
    })
    document
        .getElementById("sponsor-background")
        .style
        .transform = "translateY(" +
                     (document.getElementById("sponsor").offsetTop - document.documentElement.scrollTop - vHeight / 2) / vHeight * barHeight * 2.5 + "px)"
}
onscrolls.push(indexScroll);
