'use strict';

const { validate } = require('../../helpers/validator'),
      utils        = require('../../helpers/utils');

/*
    TimeKey can be in one of the following formats:

    "160859" 
    - string
    - length = 6
    - hhmmss

    {
        hour:    16,
        minute:   8,
        second:  59
    }
*/

module.exports = class TimeKey {
    constructor(props) {
        this.value = validate.isObject(props)
            ? `${props.hour}${props.minute}${props.second}`
            : props;
    }

    unload() { return this.value; }
}

Date.prototype.toTimeKey = function() {
    let hour = utils.pad(this.getUTCHours  ().toString(), 2),
        min  = utils.pad(this.getUTCMinutes().toString(), 2),
        sec  = utils.pad(this.getUTCSeconds().toString(), 2);

    return hour + min + sec;
};