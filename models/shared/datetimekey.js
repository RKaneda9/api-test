'use strict';

const { validate, trim } = require('../../helpers/validator'),
      utils              = require('../../helpers/utils'),
      DateKey            = require('./datekey'),
      TimeKey            = require('./timekey'),
      action             = require('./action');

/*
    DateTimeKey can be in one of the following formats:

    "20170429160859" 
    - string
    - length = 6
    - yyyymmddhhmmss

    {
        year:  2017,
        month:  
        hour:    16,
        minute:   8,
        second:  59
    }
*/

module.exports = class DateTimeKey {
    constructor(props) {
        if (validate.isObject(props)) {

            this.date = new DateKey(props);
            this.time = new TimeKey(props);
        }
        else {

            this.date = new DateKey(props.substr(0, 8));
            this.time = new DateKey(props.substr(8));
        }
    }

    unload() { return `${this.date.unload()}${this.time.unload()}`; }

    static validateStructure(data) { 

        let result;

        if (validate.isString(data)) {
            if (!validate.len(data, 14, 14)) return action.invalid(null, "Value must be exactly 14 characters long.");

            return action.valid();
        } 

        if (validate.isNotEmptyObject(data)) {

            result = DateKey.validateStructure(data); if (!result.isValid) return result;
            result = TimeKey.validateStructure(data); if (!result.isValid) return result;

            return action.valid();
        }

        return action.invalid(null, "Value is not a string or an object.");
    }

    static validateData(data) {

        let result;

        if (validate.isNotEmptyObject(data)) {

            result = DateKey.validateData(data); if (!result.isValid) return result;
            result = TimeKey.validateData(data); if (!result.isValid) return result;

            return action.valid();
        }

        return action.valid();
    }

    static validate(data) {

        let result = DateTimeKey.validateStructure(data);

        if (!result.isValid) return result;

        return DateTimeKey.validateData(data);
    }
}

Date.prototype.toDateTimeKey = function() {
    return this.toDateKey() + this.toTimeKey();
};