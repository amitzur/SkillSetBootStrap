module.exports = function() {
    let d = new Date();
    var args = [d.toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) + "." + leftPad(d.getMilliseconds(), 3) + " -"].concat([].slice.call(arguments));
    console.log.apply(console, args);
};

function leftPad(str, len) {
    str = String(str);
    if (str.length >= len) return str;
    return new Array(len - str.length + 1).join("0") + str;
}