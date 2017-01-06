let $ = require("./xQuery");
let { loadImages } = require("./image");

let Templates = {};
[].forEach.call(document.querySelectorAll("script[type='x-template']"), el => {
    let templateName = el.id.replace("-template", "");
    Templates[templateName] = templatize(templateName, el.textContent);
});

function templatize(templateName, templateStr) {
    return function(context) {
        let html = templateStr.replace(/{{([^}]+)}}/g, function(match, p1) { return context[p1]; });
        let el = $.create("div", { className: templateName, innerHTML: html });
        loadImages(el);
        return el;
    };
}

module.exports = Templates;