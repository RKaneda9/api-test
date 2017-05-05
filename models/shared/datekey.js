'use strict';

const { validate } = require('../../helpers/validator'),
      utils        = require('../../helpers/utils');
      
/*
    DateKey can be in one of the following formats:

    20170404 
    - integer 
    - length = 8
    - yyyymmdd

    {
        month: 4,
        day:   25,
        year:  2017
    }
*/
module.exports = class DateKey {
    constructor(props) {
        this.value = validate.isObject(props)
            ? parseInt(`${props.year}${utils.pad(props.month, 2)}${utils.pad(props.day, 2)}`)
            : parseInt(props);
    }

    unload() { return this.value; }
}

Date.prototype.toDateKey = function() {
    let year  = this.getUTCFullYear(),
        month = this.getUTCMonth() + 1,
        day   = this.getUTCDate(),
        val   = parseInt(`${year}${utils.pad(month, 2)}${utils.pad(day, 2)}`);

    return val;
}