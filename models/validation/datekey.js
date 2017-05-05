'use strict';

const fields       = require('../fields/datekey'),
      action       = require('../shared/action'),
      utils        = require('../../helpers/utils'),
      { months }   = require('../../helpers/enums'),
      { validate } = require('../../helpers/validator'),
      Validation   = require('./_base'),
      valid        = action.valid();

function getValidYearRange() {
    let currentYear = new Date().getFullYear(),
        yearRange   = 150;

    return { 
        min: currentYear - yearRange,
        max: currentYear + yearRange
    };
}

function getValidDayMax(year, month) {
    switch (month) {
        case months.february:  return year % 4 === 0 ? 29 : 28; // the year 0004 was a leap year.
        case months.april: 
        case months.june: 
        case months.september:
        case months.november:  return 30;
        default:               return 31;
    }
}

let validation = {};

validation['_'] = data => {

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        if (!validate.len(data.toString(), 8, 8)) return action.invalid(null, "Value must be exactly 8 characters long.");

        return valid;
    } 

    if (validate.isNotEmptyObject(data)) {
        return valid;
    }

    return action.invalid(null, "Value is not an integer or an object.");
};

validation[fields.year] = data => {

    let year, yRange;

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        
        year = parseInt(data.toString().substr(0, 4));
    }
    else if (validate.isNotEmptyObject(data)) {

        year = data.year;
    }

    yRange = getValidYearRange();

    if (!validate.isWithinRange(year,  yRange.min, yRange.max)) return action.error(fields.year, `Year must be within ${yRange.min} and ${yRange.max}.`);

    return valid;
};

validation[fields.month] = data => {

    let month;

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        
        month = parseInt(data.toString().substr(4, 2));
    }
    else if (validate.isNotEmptyObject(data)) {

        month = data.month;
    }

    if (!validate.isWithinRange(month, 1, 12)) return action.error(fields.month, "Month is invalid.");

    return valid;
};

validation[fields.day] = data => {

    let year, month, day, val, dayMax;

    if (validate.isInteger(data) || (data && validate.isString(data))) {
        
        val   = data.toString();
        year  = parseInt(val.substr(0, 4));
        month = parseInt(val.substr(4, 2));
        day   = parseInt(val.substr(6, 2));
    }
    else if (validate.isNotEmptyObject(data)) {

        year  = data.year;
        month = data.month;
        day   = data.day;
    }

    dayMax = getValidDayMax(year, month);

    if (!validate.isWithinRange(day, 1, dayMax)) return action.error(fields.day, `Day is invalid. Must be from 1 - ${dayMax}.`);

    return valid;
};

module.exports = new Validation('DateKey', fields, validation);