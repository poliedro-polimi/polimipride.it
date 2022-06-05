var deltaTop = 0;
var eventInterval = null;
var eventSelected = 0;
var papInterval = null;
var papSelected = 0;

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

let setSelectedCard = (containerSelector, pos) => {
    document.querySelectorAll(containerSelector + " > *").forEach((el, elpos) => {
        if (elpos === pos) {
            el.classList.add("highlighted");
        } else {
            el.classList.remove("highlighted");
        }
    })
}

function startCarousel() {
    if (window.innerWidth / window.innerHeight >= 4 / 3) {
        
        if (eventInterval == null) {
            setSelectedCard("#events-container", eventSelected)
            eventInterval = setInterval(() => {
                eventSelected++;
                eventSelected %= 3;
                setSelectedCard("#events-container", eventSelected);
            }, 4000);
        }
        if (papInterval == null) {
            setSelectedCard("#pap-container", papSelected)
            papInterval = setInterval(() => {
                papSelected++;
                papSelected %= 3;
                setSelectedCard("#pap-container", papSelected);
            }, 4000);
        }
    } else {
        clearInterval(eventInterval);
        clearInterval(papInterval);
    }
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
    startCarousel();
}
onresizes.push(indexResize);

onloads.push(() => {
    let innerHeight = document.getElementById('height-probe').clientHeight;
    deltaTop = innerHeight - window.innerHeight;
    indexResize();
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
    document.querySelectorAll(".event").forEach((el , pos) => {
        el.onmousemove = () => {
            clearInterval(eventInterval);
            eventInterval = null;
            eventSelected = pos;
            setSelectedCard("#events-container", eventSelected);
        }
        el.onmouseout = () => {
            clearInterval(eventInterval);
            eventInterval = null;
            startCarousel();
        }
    })
    document.querySelectorAll(".pap").forEach((el , pos) => {
        el.onmousemove = () => {
            clearInterval(papInterval);
            papInterval = null;
            papSelected = pos;
            setSelectedCard("#pap-container", papSelected);
        }
        el.onmouseout = () => {
            clearInterval(papInterval);
            papInterval = null;
            startCarousel();
        }
    })
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
            document.getElementById("brush-nav-back").style.opacity = "1";
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
            document.getElementById("brush-nav-back").style.opacity = "0";
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
        let sectionPosition = e.offsetTop - document.documentElement.scrollTop;
        
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
                picture.style.backgroundPositionX = 100 * (sectionPosition + goalsContent.offsetHeight * 1.1)  / (goalsContent.offsetHeight * 2.4)  + "%"
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
