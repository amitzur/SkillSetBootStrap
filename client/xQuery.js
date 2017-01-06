// inspired by https://github.com/LeaVerou/awesomplete

let slice = Array.prototype.slice;

function $(selector, context) {
    return (context || document).querySelector(selector);
}

$.create = function(tagName, options, children) {
    let el = document.createElement(tagName);
    
    for (let key in options) {
        let val = options[key];
        if (key in el) {
            el[key] = val;
        } else {
            el.setAttribute(key, val);
        }
    }
    
    if (children) {
        children.forEach(child => {
            el.appendChild(child);
        });
    }
    
    return el;
};

$.all = function(selector, context) {
    return slice.call((context || document).querySelectorAll(selector));
};

module.exports = $;