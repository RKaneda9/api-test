'use strict';

const fields       = require('../fields/timekey'),
      action       = require('../shared/action'),
      utils        = require('../../helpers/utils'),
      { months }   = require('../../helpers/enums'),
      { validate } = require('../../helpers/validator'),
      Validation   = require('./_base'),
      valid        = action.valid();

let validation = {};

validation['_'] = data => {

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        if (!validate.len(data.toString(), 6, 6)) return action.invalid(null, "Value must be exactly 6 characters long.");

        return valid;
    } 

    if (validate.isNotEmptyObject(data)) {
        return valid;
    }

    return action.invalid(null, "Value is not an integer or an object.");
};

validation[fields.hour] = data => {

    let hour;

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        
        hour = parseInt(data.toString().substr(0, 2));
    }
    else if (validate.isNotEmptyObject(data)) {

        hour = data.hour;
    }

    if (!validate.isWithinRange(hours, 0, 23)) return action.error(fields.hour, "Hours must be within 0 and 23."); 
        
    return valid;
};

validation[fields.minute] = data => {

    let min;

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        
        min = parseInt(data.toString().substr(0, 2));
    }
    else if (validate.isNotEmptyObject(data)) {

        min = data.minute;
    }

    if (!validate.isWithinRange(min, 0, 59)) return action.error(fields.minute, "Minutes must be within 0 and 59."); 
        
    return valid;
};

validation[fields.second] = data => {

    let sec;

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        
        sec = parseInt(data.toString().substr(0, 2));
    }
    else if (validate.isNotEmptyObject(data)) {

        sec = data.second;
    }

    if (!validate.isWithinRange(sec, 0, 59)) return action.error(fields.second, "Second must be within 0 and 59."); 
        
    return valid;
};

module.exports = new Validation('TimeKey', fields, validation);