let Templates = require("./templates");
let MasterDetails = require("./master-details");
let Presidents = require("./presidents");

window.addEventListener("DOMContentLoaded", e => {
    fetch("https://rawgit.com/amitzur/sample-data/master/presidents.json").then(r => r.json()).then(data => {
        new MasterDetails(document.getElementById("root"), { masterTemplate: Templates["president-short"], detailsTemplate: Templates["president"], data: Presidents(data)}).render();
    });
});