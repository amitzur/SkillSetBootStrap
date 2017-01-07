let $ = require("./xQuery");


function MasterDetails(mountAt, options) {
    let el = init(mountAt);
    return {
        el,
        render,
        setSelected,
        showDetails,
        hideDetails,
        options,
        $: selector => $(selector, this.el),
        $$: selector => $.all(selector, this.el)
    };
}

function init(mountAt) {
    let el = $.create("div", { className: "master-details" }, [
        $.create("div", { className: "master-details-master" }),
        $.create("div", { className: "master-details-details" }, [
            $.create("div", { className: "placeholder", innerHTML: "Choose item on the right" })
        ])
    ]);
    
    mountAt.appendChild(el);
    return el;
}

function render() {
    
    this.options.data.forEach((item, i) => {
        let $item = $.create("div", { className: "item animated fade-up", style: "animation-delay:" + ((i+1)*100) + "ms" }, [ this.options.masterTemplate(item) ]);

        $item.addEventListener("click", e => {
            this.hideDetails().then(() => {
                this.setSelected(i);
            });
        });
        
        $item.addEventListener("animationend", e => {
            $item.classList.remove("fade-up");
        });
    
        this.$(".master-details-master").appendChild($item);
    });
}

function setSelected(index) {
    this.$$(".item").forEach(el => el.classList.remove("active"));
    this.$(".item:nth-child(" + (index + 1) + ")").classList.add("active");
    this.showDetails(index);
}

function showDetails(index) {
    this.$(".master-details-details").innerHTML = "";
    this.$(".master-details-details").scrollTop = 0;
    this.$(".master-details-details").appendChild(this.options.detailsTemplate(this.options.data[index]));
    this.$(".master-details-details p").addEventListener("animationend", e => {
        this.$(".master-details-details p").classList.remove("fade-up");
        this.$(".master-details-details .img-wrap").classList.remove("fade-right");
    });
}

function hideDetails() {
    return new Promise((resolve, reject) => {
        if (this.$(".master-details-master .item.active")) {
            this.$(".master-details-details .img-wrap").classList.add("fade-out-left");
            this.$(".master-details-details p").classList.add("fade-out-down");
            this.$(".master-details-details p").addEventListener("animationend", e => {
                resolve();
            });
        } else {
            resolve();
        }
    });
}

module.exports = MasterDetails;