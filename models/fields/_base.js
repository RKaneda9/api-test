const utils = require('../../helpers/utils');

module.exports = function FieldSet(fields) {
    let fieldSet = {};

    utils.foreach(fields, field => {
        fieldSet[field] = field;
    });

    return fieldSet;
}