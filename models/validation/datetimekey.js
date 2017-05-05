'use strict';

const fields       = require('../fields/datetimekey'),
      action       = require('../shared/action'),
      utils        = require('../../helpers/utils'),
      { validate } = require('../../helpers/validator'),
      DateKey      = require('./datekey'),
      TimeKey      = require('./timekey'),
      Validation   = require('./_base'),
      valid        = action.valid();


let validation = {};

validation['_'] = data => {

    if (validate.isString(data))) {
        if (!validate.len(data.toString(), 14, 14)) return action.invalid(null, "Value must be exactly 14 characters long.");

        return valid;
    } 

    if (validate.isNotEmptyObject(data)) {
        return valid;
    }

    return action.invalid(null, "Value is not an string or an object.");
};

validation[fields.date] = data => {
    return validate.isString(data)
         ? DateKey(data.substr(0, 8))
         : DateKey(data);
}

validation[fields.time] = data => {
    return validate.isString(data)
         ? TimeKey(data.substr(8))
         : TimeKey(data);
};

module.exports = new Validation('DateTimeKey', fields, validation);