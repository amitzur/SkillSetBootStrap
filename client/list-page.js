let Templates = require("./templates");
let Page = require("./page");
let EventBus = require("./event-bus");
let $ = require("./xQuery");

function ListPage(options) {
    let page = new Page({ id: options.id });
    
    options.data.forEach((item, i) => {
        let $item = $.create("div", { className: "item animated fade-up", style: "animation-delay:" + ((i+1)*100) + "ms" }, [ Templates["president-short"](item) ]);

        $item.addEventListener("click", e => {
            EventBus.trigger("president/click", item);
        });

        $item.addEventListener("animationend", e => {
            $item.classList.remove("fade-up");
        });

        page.el.appendChild($item);
    });
    
    return {
        show: transition => page.show(transition)
    }
}

module.exports = ListPage;