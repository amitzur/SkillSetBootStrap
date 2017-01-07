let $ = require("./xQuery");
let EventBus = require("./event-bus");
let Templates = require("./templates");

let total = 200, start = 100;
let $meta;

EventBus.on("president/click", president => {
    $meta = Templates["president-meta"](president);
    $("#root").appendChild($meta);
});

EventBus.on("president/back", () => {
    $meta.parentNode.removeChild($meta);
});

EventBus.on("president/scroll", top => {
    let opacity;
    opacity = (top - start) / (total - start);
    $meta.style.opacity = opacity;
    if (top > total) $meta.style.boxShadow = "0 0 6px rgba(0,0,0,0.5)";
});