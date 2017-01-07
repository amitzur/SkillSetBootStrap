let http = require("http");
let browserify = require("browserify");
let fs = require("fs");
let connect = require("connect");
let serveStatic = require("serve-static");
let morgan = require("morgan");
let log = require("./log");

function bundle() {
    b.bundle().on("error", function(err) {
        log("error in bundle: " + err);
    }).pipe(fs.createWriteStream("bundle.js")).on("close", function() {
        log("bundle created");
    });
}

let port = 3000;
let b = browserify("client/app.js", { debug: true });
bundle();

let app = connect();
app.use(morgan('dev', {
    //skip: function (req, res) { return res.statusCode < 400; }
}));
app.use(serveStatic("."));

http.createServer(app).listen(port, function() {
    log("http server listening on port " + port);
});

fs.watch("client", function(type, filename) {
    log(type + ": " + filename);
    if (filename !== "bundle.js") {
        bundle();
    }
});