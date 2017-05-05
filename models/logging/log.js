'use strict';

const enums = require('../../helpers/enums').logging;

class Entry {
    constructor(level, args, time) {
        this.level = level;
        this.args  = args;
        this.time  = time || new Date();
    }
}

module.exports = class Log {
    constructor(props) {
        if (!props) { props = {}; }

        this.settings = props;
        this.entries  = [];
    }

    debug() { this.log(enums.levels.debug, arguments); }
    info () { this.log(enums.levels.info,  arguments); }
    warn () { this.log(enums.levels.warn,  arguments); }
    error() { this.log(enums.levels.error, arguments); }

    log(level, args) { this.entries.push(new Entry(level, args)); }
}