let $ = require("./xQuery");


function MasterDetails(el, options) {
    this.el = init(el);
    return {
        render,
        setSelected,
        options,
        $: selector => $(selector, this.el),
        $$: selector => $.all(selector, this.el)
    };
}

function init(mountAt) {
    let el = $.create("div", { className: "master-details" }, [
        $.create("div", { className: "master-details-master" }),
        $.create("div", { className: "master-details-details" })
    ]);
    
    mountAt.appendChild(el);
}

function render() {
    
    this.options.data.forEach((item, i) => {
        let $item = $.create("div", { className: "item" }, [ this.options.masterTemplate(item) ]);

        $item.addEventListener("click", e => {
            this.setSelected(i);
        });
    
        this.$(".master-details-master").appendChild($item);
    });
}

function setSelected(index) {
    this.$$(".item").forEach(el => el.classList.remove("active"));
    this.$(".item:nth-child(" + (index + 1) + ")").classList.add("active");
    this.$(".master-details-details").innerHTML = "";
    this.$(".master-details-details").appendChild(this.options.detailsTemplate(this.options.data[index]));
}

module.exports = MasterDetails;