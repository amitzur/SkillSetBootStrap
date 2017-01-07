let Page = require("./page");
let Templates = require("./templates");

function DetailsPage(options) {
    let page = new Page({ id: options.id });  

    let ret = {
        page,
        setData,
        show: transition => page.show(transition)
    };
    
    ret.setData(options.data);
    return ret;
}

function setData(data) {
    this.page.el.appendChild(Templates["president"](data));
}

module.exports = DetailsPage;