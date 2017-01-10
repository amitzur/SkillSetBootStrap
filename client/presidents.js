module.exports = function(data) {
    return data.map(item => {

        // NOTE: normally vars are in camel case. But in order to leverage ES6 syntax for object literals in the Object.assign below, I am naming
        // the variables just the same as their JSON key names
        let took_office_year = item.took_office.substr(0, 4);
        let left_office_year = item.left_office ? item.left_office.substr(0,4) : "";
        return Object.assign({}, item, { took_office_year, left_office_year });
    });
};