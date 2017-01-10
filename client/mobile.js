let EventBus = require("./event-bus");
let ListPage = require("./list-page");
let DetailsPage = require("./details-page");
let Presidents = require("./presidents");
require("./meta");

window.addEventListener("DOMContentLoaded", e => {
    fetch("https://rawgit.com/amitzur/sample-data/master/presidents.json").then(r => r.json()).then(data => {
    
        let listPage = new ListPage({ id: "president-list", data: Presidents(data) });
        let detailsPage = new DetailsPage({ id: "president-details", data });
        
        EventBus.on("president/click", president => {
            detailsPage.setData(president);
            detailsPage.show("slideleft");
            
            // TODO add back button to header
        });
        
        EventBus.on("president/back", () => {
            listPage.show("slideright");
            
            // TODO remove back button from header
        });

        listPage.show();
    });
});