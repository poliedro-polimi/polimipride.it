onscrolls.push(() => {
    let multiplier = (window.innerWidth > 860) ? 2 : 1;
    document.querySelectorAll(".date-panel").forEach((el) => {
        let displacement = Math.max(-2, Math.min(3, ((el.getBoundingClientRect().top / window.innerHeight) - 0.5) * 2));
        if (window.innerWidth > 860) {
            el.style.transform = "translateY(" + (displacement * 50) + "%)";
        } else {
            el.style.transform = "translateY(0)";
        }
    })
    document.querySelectorAll(".center-picture").forEach((el) => {
        let displacement = Math.max(-2, Math.min(3, ((el.getBoundingClientRect().top / window.innerHeight) - 0.5) * 2));
        el.style.transform = "translate(-50%, " + (-50 + displacement * 10 * multiplier) + "%)";
    })
    document.querySelectorAll(".front-picture").forEach((el) => {
        let displacement = Math.max(-2, Math.min(3, ((el.getBoundingClientRect().top / window.innerHeight) - 0.5) * 2));
        el.style.transform = "translate(-50%, " + (-50 + displacement * 15 * multiplier) + "%) scale(45%)";
    })
    document.querySelectorAll(".back-picture").forEach((el) => {
        let displacement = Math.max(-2, Math.min(3, ((el.getBoundingClientRect().top / window.innerHeight) - 0.5) * 2));
        el.style.transform = "translate(-50%, " + (-50 + displacement * 5 * multiplier) + "%) scale(45%)";
    })
})