let $ = require("./xQuery");
let Transition = require("./transition");

function Page(options) {
    let el = $.create("div", { id: options.id, className: "page" });
    $("#root").appendChild(el);
    
    return {
        el,
        show,
        options
    };
}

function show(transition) {
    let to = this;
    let from = Page.activePage;
    Transition(from, to, transition).then(() => {
        Page.activePage = to;
    });
    
}


module.exports = Page;