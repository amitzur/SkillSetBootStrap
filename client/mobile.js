let EventBus = require("./event-bus");
let ListPage = require("./list-page");
let DetailsPage = require("./details-page");

window.addEventListener("DOMContentLoaded", e => {
    fetch("https://rawgit.com/amitzur/sample-data/master/presidents.json").then(r => r.json()).then(data => {
    
        let listPage = new ListPage({ id: "president-list", data });
        let detailsPage = new DetailsPage({ id: "president-details", data });
        
        EventBus.on("president/click", president => {
            detailsPage.setData(president);
            detailsPage.show("slide-left");

            // TODO add back button to header
        });
        
        EventBus.on("president/back", () => {
            listPage.show("slide-right");

            // TODO remove back button from header
        });

        listPage.show();
    });
});