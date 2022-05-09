window.onload = function () {
    document.getElementById("bar-open").onclick = () => {
        document.getElementById("nav-mobile").classList.add("visible");
    }
    document.getElementById("bar-close").onclick = () => {
        document.getElementById("nav-mobile").classList.remove("visible");
    }
}
