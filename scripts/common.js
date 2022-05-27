onloads = [];
onscrolls = [];
onresizes = [];

let animations = {};

stringifyTransform = (transform) => {
    let values = transform.values;
    return transform.command + "(" + values.map(a => a.toFixed(5)).join(",") + ")"
}

animateBrush = (element, direction) => {
    if (element === null)
        return;
    let id = element.getAttribute("id");
    if (!direction && animations[id] == null) {
        return;
    }
    let info = element.getAttribute("brush-animation").split(";");
    let duration = parseFloat(element.getAttribute("brush-duration") || "1000");
    info = info
        .map(a => a.split(/[(,)]/).filter(a => a !== ""))
        .map(a => ({
            command: a[0],
            from: a.slice(1).filter((number, index) => index % 2 === 0).map(number => parseFloat(number)),
            to: a.slice(1).filter((number, index) => index % 2 === 1).map(number => parseFloat(number)),
        }));
    if (!direction) {
        info.forEach(e => {
            let temp = e.to;
            e.to = e.from;
            e.from = temp;
        })
    }
    if (animations[id] != null) {
        for (let i = 0; i < animations[id].currentValues.length; i++) {
            let transform = animations[id].currentValues[i];
            info[i].from = transform.values.map(a => a);
        }
        clearInterval(animations[id].animation);
    }
    let start = new Date().getTime();
    let path = document.getElementById(element.getAttribute("brush-path"))
    let animation = animations[id] = {
        "start": start,
        "duration": duration,
        currentValues: info.map(a => ({command: a.command, values: a.from})),
        animation: setInterval(() => {
            let delta = new Date().getTime() - start;
            let progress = Math.min(delta / duration, 1);
            let interpolated = interpolation(progress);
            animation.currentValues = [];
            for (let transform of info) {
                animation.currentValues.push(
                    {
                        command: transform.command,
                        values: transform.from.map((value, index) => interpolated.map(value, transform.to[index]))
                    })
            }
            let strings = [];
            strings.push("scale(" + element.offsetWidth / 100 + "," + element.offsetHeight / 100 + ")");
            strings.push("scale(100, 100)")
            strings.push(...animation.currentValues.map(a => stringifyTransform(a, element)).reverse());
            strings.push("scale(" + 1 / 100 + "," + 1 / 100 + ")");
            path.setAttribute("transform", strings.join(" "))
            if (progress === 1) {
                clearInterval(animation.animation);
            }
        }, 1000 / 60)
    }
}

window.onload = function (evt) {
    onloads.forEach(a => a(evt))
}
window.onresize = function (evt) {
    onresizes.forEach(a => a(evt));
}
document.onscroll = function (evt) {
    onscrolls.forEach(a => a(evt));
}

onresizes.push(() => {
    let navBrush = document.getElementById("brush-mobile-1");
    let brushWidth = window.innerWidth * 1.2;
    let brushHeight = brushWidth / 2402 * 1631;
    navBrush.style.height = brushHeight + "px";
    navBrush.style.width = brushWidth + "px";
    navBrush.style.left = -window.innerWidth * 0.1 + "px";
    navBrush.style.top = "calc(4 * var(--navbar-height) - 77vw)";
})

function openMobileBar() {
    document.getElementById("nav-mobile").classList.add("visible");
    document.getElementById("bar-open").classList.remove("nav-appeared")
    animateBrush(document.getElementById("brush-mobile-1"), true);
    animateBrush(document.getElementById("brush-mobile-2"), true);
    animateBrush(document.getElementById("brush-mobile-3"), true);
    animateBrush(document.getElementById("brush-mobile-4"), true);
}

function closeMobileBar() {
    document.getElementById("nav-mobile").classList.remove("visible");
    document.getElementById("bar-open").classList.add("nav-appeared")
    animateBrush(document.getElementById("brush-mobile-1"), false);
    animateBrush(document.getElementById("brush-mobile-2"), false);
    animateBrush(document.getElementById("brush-mobile-3"), false);
    animateBrush(document.getElementById("brush-mobile-4"), false);
}

onloads.push(() => {
    onresizes.forEach(a => a());
    document.getElementById("bar-open").onclick = () => {
        openMobileBar();
    }
    document.getElementById("bar-close").onclick = () => {
        closeMobileBar();
    }
})