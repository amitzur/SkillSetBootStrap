let $ = require("./xQuery");

function onload(e) {
    let img = e.target;
    img.classList.add("active");
    if (img.naturalHeight > img.naturalWidth) {
        img.classList.add("portrait");
    } else {
        img.classList.add("landscape");
    }
}

function loadImages(context) {
    $.all("img", context).forEach(img => {
        img.addEventListener("load", onload);
    });
}

module.exports = {
    loadImages
};