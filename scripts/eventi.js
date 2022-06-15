let events = [];
let loadedEvents = false;

let currentEvent = null;
let currentEventElement = null;

function createSvg(w, d) {
    let linkSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let linkPath = document.createElementNS(linkSVG.namespaceURI, "path");
    linkSVG.append(linkPath);
    linkPath.setAttribute(
        "d",
        d
    )
    linkPath.style.fill = "white";
    linkSVG.setAttribute("viewBox", "0 0 " + w + " " + w);
    return linkSVG;
}

function createEventDOM(pos, e) {
    let eventContainer = document.createElement("span");
    eventContainer.classList.add("event-container");
    eventContainer.style.backgroundImage = "url('/res/brushes/brush_event_" + (pos % 3 + 1) + "_horz.webp')"
    eventContainer.style.filter = "hue-rotate(" + 50 * ((pos / 3) % 9) + "deg)";
    
    let eventTitle = document.createElement("span");
    eventTitle.classList.add("event-title");
    eventTitle.innerText = e.title;
    eventContainer.append(eventTitle);
    
    let eventDesc = document.createElement("span");
    eventDesc.classList.add("event-desc");
    eventDesc.innerText = e.description;
    eventContainer.append(eventDesc);
    eventContainer.append(createSvg(100, "M96.1,8.2H81.6V3.8c0-2.1-1.7-3.8-3.8-3.8h-2.1c-2.1,0-3.8,1.7-3.8,3.8v4.3H54.9V3.8c0-2.1-1.7-3.8-3.8-3.8h-2.1c-2.1,0-3.8,1.7-3.8,3.8v4.3H28.8V3.8C28.8,1.7,27.1,0,25,0h-2.1C20.8,0,19,1.7,19,3.8v4.3H4.5c-2.1,0-3.8,1.7-3.8,3.8v84.2c0,2.1,1.7,3.8,3.8,3.8h91.6c2.1,0,3.8-1.7,3.8-3.8V12C100,9.9,98.3,8.2,96.1,8.2z M90.2,90.2H10.5V18H19v4.3c0,2.1,1.7,3.8,3.8,3.8H25c2.1,0,3.8-1.7,3.8-3.8V18h16.3v4.3c0,2.1,1.7,3.8,3.8,3.8h2.1c2.1,0,3.8-1.7,3.8-3.8V18h16.9v4.3c0,2.1,1.7,3.8,3.8,3.8h2.1c2.1,0,3.8-1.7,3.8-3.8V18h8.5V90.2z M78.1,35H34.5c-2.1,0-3.8,1.7-3.8,3.8v2.1c0,2.1,1.7,3.8,3.8,3.8h43.6c2.1,0,3.8-1.7,3.8-3.8v-2.1C81.9,36.7,80.2,35,78.1,35zM78.1,53.4H21.9c-2.1,0-3.8,1.7-3.8,3.8v2.1c0,2.1,1.7,3.8,3.8,3.8h56.1c2.1,0,3.8-1.7,3.8-3.8v-2.1C81.9,55.1,80.2,53.4,78.1,53.4zM65.5,71.8H21.9c-2.1,0-3.8,1.7-3.8,3.8v2.1c0,2.1,1.7,3.8,3.8,3.8h43.6c2.1,0,3.8-1.7,3.8-3.8v-2.1C69.4,73.5,67.6,71.8,65.5,71.8z"))
    
    let eventWhen = document.createElement("span");
    eventWhen.classList.add("event-when");
    eventWhen.innerText = e.when.coarse;
    eventContainer.append(eventWhen);
    
    eventContainer.append(createSvg(100, "M50,0C22.4,0,0,22.4,0,50s22.4,50,50,50s50-22.4,50-50S77.6,0,50,0z M50,90.2c-22.2,0-40.2-18-40.2-40.2c0-22.2,18-40.2,40.2-40.2s40.2,18,40.2,40.2C90.2,72.2,72.2,90.2,50,90.2z M54.5,52.2L42.1,68c-1.3,1.7-3.7,2-5.4,0.7l-1.7-1.3c-1.7-1.3-2-3.7-0.7-5.4l8.7-11.2l-17.9-14c-1.7-1.3-2-3.7-0.7-5.4l1.3-1.7c1.3-1.7,3.7-2,5.4-0.7l20.9,16.3c0,0,0,0,0,0l1.7,1.3C55.5,48.1,55.8,50.5,54.5,52.2z"))
    
    eventWhen = document.createElement("span");
    eventWhen.classList.add("event-when");
    eventWhen.innerText = e.when.fine;
    eventContainer.append(eventWhen);
    let eventWhere = document.createElement("span");
    
    eventContainer.append(createSvg(100, "M52.7,98.3c-1.5,1.5-3.9,1.5-5.4,0L20.6,71.6C12.3,63.3,8,52.2,8.4,40.5c0.9-21.9,19.1-39.6,41-39.9c23.7-0.3,42.9,19.3,42.1,43.1c-0.4,10.7-5.1,20.9-12.7,28.5L52.7,98.3z M50,10.4c-17.5,0-31.8,14.3-31.8,31.8c0,8.5,3.3,16.5,9.3,22.5L50,87.1l22.5-22.5c6-6,9.3-14,9.3-22.5C81.8,24.6,67.5,10.4,50,10.4z"))
    
    eventWhere.classList.add("event-where");
    eventWhere.innerText = e.where.coarse;
    eventContainer.append(eventWhere);
    
    eventContainer.append(createSvg(100, "M98.9,23.1L89,13.2c-0.7-0.7-1.7-1.1-2.7-1.1H54.9V3.8c0-2.1-1.7-3.8-3.8-3.8h-2.1c-2.1,0-3.8,1.7-3.8,3.8v8.3H24.5c-2.1,0-3.8,1.7-3.8,3.8v19.8c0,2.1,1.7,3.8,3.8,3.8h20.6v4.3H13.8c-1,0-2,0.4-2.7,1.1l-9.9,9.9c-1.5,1.5-1.5,3.9,0,5.4l9.9,9.9c0.7,0.7,1.7,1.1,2.7,1.1h31.4v24.8c0,2.1,1.7,3.8,3.8,3.8h2.1c2.1,0,3.8-1.7,3.8-3.8V71.4h20.6c2.1,0,3.8-1.7,3.8-3.8V47.7c0-2.1-1.7-3.8-3.8-3.8H54.9v-4.3h31.4c1,0,2-0.4,2.7-1.1l9.9-9.9C100.4,27,100.4,24.6,98.9,23.1z"))
    
    eventWhere = document.createElement("span");
    eventWhere.classList.add("event-where");
    eventWhere.innerText = e.where.fine;
    eventContainer.append(eventWhere);
    
    let socials = document.createElement("span");
    socials.classList.add("event-socials");
    if (e.instagram) {
        let linkA = document.createElement("a");
        linkA.classList.add("no-underline")
        let linkSVG = createSvg(24,
            "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        )
        linkA.append(linkSVG);
        linkA.setAttribute("href", e.instagram);
        linkA.setAttribute("target", "_blank");
        socials.append(linkA)
    }
    if (e.facebook) {
        let linkA = document.createElement("a");
        linkA.classList.add("no-underline")
        let linkSVG = createSvg(24,
            "M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"
        )
        linkA.append(linkSVG);
        linkA.setAttribute("href", e.facebook);
        linkA.setAttribute("target", "_blank");
        socials.append(linkA)
    }
    if (e.maps) {
        for (let location of e.maps) {
            let linkA = document.createElement("a");
            linkA.classList.add("no-underline")
            let linkSVG = createSvg(100,
                "M52.7,98.3c-1.5,1.5-3.9,1.5-5.4,0L20.6,71.6C12.3,63.3,8,52.2,8.4,40.5c0.9-21.9,19.1-39.6,41-39.9c23.7-0.3,42.9,19.3,42.1,43.1c-0.4,10.7-5.1,20.9-12.7,28.5L52.7,98.3z M50,10.4c-17.5,0-31.8,14.3-31.8,31.8c0,8.5,3.3,16.5,9.3,22.5L50,87.1l22.5-22.5c6-6,9.3-14,9.3-22.5C81.8,24.6,67.5,10.4,50,10.4z"
            )
            linkA.append(linkSVG);
            linkA.setAttribute("href", location);
            linkA.setAttribute("target", "_blank");
            socials.append(linkA)
        }
    }
    if (e.event) {
        for (let location of e.event.location) {
            let link = "https://www.google.com/calendar/render?action=TEMPLATE"
            link += "&text=" + encodeURIComponent(e.title);
            link += "&dates=" + new Date(e.event.dateStart).toISOString().replaceAll(/[^\dTZ]/g, "")
                    + "/" + new Date(e.event.dateEnd).toISOString().replaceAll(/[^\dTZ]/g, "");
            link += "&details=" + encodeURIComponent(e.description);
            link += "&location=" + encodeURIComponent(location);
            if (e.event.duration !== 1) {
                link += "&recur=RRULE:FREQ%3DDAILY;INTERVAL%3D1;COUNT%3D" + e.event.duration;
            }
            let linkA = document.createElement("a");
            linkA.classList.add("no-underline")
            let linkSVG = createSvg(100,"M96.1,8.2H81.6V3.8c0-2.1-1.7-3.8-3.8-3.8h-2.1c-2.1,0-3.8,1.7-3.8,3.8v4.3H54.9V3.8c0-2.1-1.7-3.8-3.8-3.8h-2.1c-2.1,0-3.8,1.7-3.8,3.8v4.3H28.8V3.8C28.8,1.7,27.1,0,25,0h-2.1C20.8,0,19,1.7,19,3.8v4.3H4.5c-2.1,0-3.8,1.7-3.8,3.8v84.2c0,2.1,1.7,3.8,3.8,3.8h91.6c2.1,0,3.8-1.7,3.8-3.8V12C100,9.9,98.3,8.2,96.1,8.2z M90.2,90.2H10.5V18H19v4.3c0,2.1,1.7,3.8,3.8,3.8H25c2.1,0,3.8-1.7,3.8-3.8V18h16.3v4.3c0,2.1,1.7,3.8,3.8,3.8h2.1c2.1,0,3.8-1.7,3.8-3.8V18h16.9v4.3c0,2.1,1.7,3.8,3.8,3.8h2.1c2.1,0,3.8-1.7,3.8-3.8V18h8.5V90.2z M78.1,35H34.5c-2.1,0-3.8,1.7-3.8,3.8v2.1c0,2.1,1.7,3.8,3.8,3.8h43.6c2.1,0,3.8-1.7,3.8-3.8v-2.1C81.9,36.7,80.2,35,78.1,35zM78.1,53.4H21.9c-2.1,0-3.8,1.7-3.8,3.8v2.1c0,2.1,1.7,3.8,3.8,3.8h56.1c2.1,0,3.8-1.7,3.8-3.8v-2.1C81.9,55.1,80.2,53.4,78.1,53.4zM65.5,71.8H21.9c-2.1,0-3.8,1.7-3.8,3.8v2.1c0,2.1,1.7,3.8,3.8,3.8h43.6c2.1,0,3.8-1.7,3.8-3.8v-2.1C69.4,73.5,67.6,71.8,65.5,71.8z");
            linkA.append(linkSVG);
            linkA.setAttribute("href", link);
            linkA.setAttribute("target", "_blank");
            socials.append(linkA)
        }
    }
    
    if (e.info) {
        let linkA = document.createElement("a");
        linkA.classList.add("no-underline")
        let linkSVG = createSvg(100,
                                "M50,9.87A40.13,40.13,0,1,1,9.87,50,40.17543,40.17543,0,0,1,50,9.87M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Zm4.93457,77.5501V43.54951a3.8,3.8,0,0,0-3.8-3.8H48.86494a3.8,3.8,0,0,0-3.8,3.8V77.5501a3.8,3.8,0,0,0,3.8,3.8h2.26963A3.8,3.8,0,0,0,54.93457,77.5501Zm0-52.83057V22.4499a3.8,3.8,0,0,0-3.8-3.8H48.86494a3.8,3.8,0,0,0-3.8,3.8v2.26963a3.8,3.8,0,0,0,3.8,3.8h2.26963A3.8,3.8,0,0,0,54.93457,24.71953Z"
        )
        linkA.append(linkSVG);
        linkA.setAttribute("href", e.info);
        socials.append(linkA)
    }
    eventContainer.append(socials);
    return eventContainer;
}

window.onhashchange = () => {
    let hash = window.location.hash.substring(1);
    if ((currentEvent === null) || (currentEvent.day !== parseInt(hash))) {
        if (loadedEvents !== false) {
            let calendarDay = document.querySelector("[day='" + hash + "']>span");
            if (calendarDay && calendarDay.onclick instanceof Function) {
                calendarDay.onclick();
            }
        }
    }
}

onloads.push(() => {
    let date = new Date();
    let day = date.getMonth() === 5 ? date.getDate() : (date.getMonth() === 6 ? 30 + date.getDate() : -1);
    if ((day > 0) && (day < 34)) {
        document.querySelector("[day='" + day + "']").classList.add("today")
    } else {
        day = undefined;
    }
    
    fetch(window.location.origin + window.location.pathname + '/events.json')
        .then(response => response.json())
        .then(data => {
            events = data.sort((a, b) => (a.day < day ? a.day + 100 : a.day) - (b.day < day ? b.day + 100 : b.day));
            loadedEvents = true;
            events.forEach((e, pos) => {
                let calendarDay = document.querySelector("[day='" + e.day + "']>span");
                calendarDay.classList.add("event")
                calendarDay.onclick = () => {
                    window.location.hash = e.day + "";
                    document.querySelectorAll(".event").forEach(e => e.classList.remove("selected"));
                    calendarDay.classList.add("selected")
                    if (currentEvent !== e) {
                        let eventContainer = createEventDOM(pos, e);
                        if (currentEvent === null) {
                            currentEvent = e;
                            eventContainer.style.position = "fixed";
                            document.body.append(eventContainer);
                            let height = eventContainer.offsetHeight;
                            let width = eventContainer.offsetWidth;
                            document.body.removeChild(eventContainer);
                            eventContainer.style.position = "";
                            if ((width + document.getElementById("calendar").offsetWidth) > window.innerWidth) {
                                eventContainer.style.marginBottom = -height + "px";
                                eventContainer.style.transform = "scaleY(0)";
                                document.getElementById("pride-month-container").append(eventContainer);
                                setTimeout(() => {
                                    eventContainer.style.marginBottom = "0px";
                                    eventContainer.style.transform = "scaleY(1)";
                                }, 0);
                            } else {
                                eventContainer.style.marginRight = -width + "px";
                                eventContainer.style.transform = "scaleX(0)";
                                document.getElementById("pride-month-container").append(eventContainer);
                                setTimeout(() => {
                                    eventContainer.style.marginRight = "0px";
                                    eventContainer.style.transform = "scaleX(1)";
                                }, 0);
                            }
                            currentEventElement = eventContainer;
                        } else {
                            currentEvent = e;
                            let oldElement = currentEventElement;
                            currentEventElement = eventContainer;
                            oldElement.style.left = oldElement.offsetLeft + "px";
                            oldElement.style.top = oldElement.offsetTop + "px";
                            oldElement.style.position = "absolute"
                            oldElement.style.transformOrigin = "center";
                            oldElement.style.transform = "scale(0)";
                            eventContainer.style.transformOrigin = "center"
                            eventContainer.style.transform = "scale(0)";
                            document.getElementById("pride-month-container").append(eventContainer);
                            setTimeout(() => {
                                eventContainer.style.transform = "scale(1)";
                            }, 0);
                            setTimeout(() => oldElement.remove(), 500);
                        }
                    }
                }
                let eventContainer = createEventDOM(pos, e);
                document.getElementById("all-events").append(eventContainer);
            })
            let today = events.filter(a => a.day === day);
            if (today.length > 0) {
                let todayTitle = document.createElement("div");
                todayTitle.innerText = /^\/en\/.*$/.test( window.location.pathname) ? "Today's events" : "Eventi di oggi";
                todayTitle.classList.add("subpage-subtitle");
                todayTitle.style.backgroundImage = "url('/res/brushes/brush_nav_7.webp')"
                document.getElementById("all-events-title").before(todayTitle);
                today.forEach((el, pos) => todayTitle.after(createEventDOM(pos, el)))
            }
            window.onhashchange(null);
        });
})