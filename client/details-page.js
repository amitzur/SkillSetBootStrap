let Page = require("./page");
let Templates = require("./templates");
let EventBus = require("./event-bus");

function DetailsPage(options) {
    let page = new Page({ id: options.id });  
    
    page.el.addEventListener("click", e => {
        EventBus.trigger("president/back");
    });

    let ret = {
        page,
        setData,
        show: transition => page.show(transition, () => page.el.scrollTop = 0)
    };
    
    ret.setData(options.data);
    return ret;
}

function setData(data) {
    this.page.el.innerHTML = "";
    this.page.el.appendChild(Templates["president"](data));
}

module.exports = DetailsPage;