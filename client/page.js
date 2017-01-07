let $ = require("./xQuery");
let transition = require("./transition");

function Page(options) {
    let el = $.create("div", { id: options.id, className: "page" });
    $("#root").appendChild(el);
    
    return {
        el,
        show,
        options
    };
}

function show(transitionName, onbeforetransition) {
    if (transitionName) {
        return new Promise(resolve => {
            let to = this;
            let from = Page.activePage;
            transition(from, to, transitionName, onbeforetransition).then(() => {
                Page.activePage = to;
                resolve();
            });
        });
    } else {
        this.el.classList.add("active");
        Page.activePage = this;
        return Promise.resolve();
    }
    
}


module.exports = Page;