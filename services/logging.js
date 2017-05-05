'use strict';

const fs         = require('fs'),
      Log        = require('../models/logging/log'),
      utils      = require('../helpers/utils'),
      settings   = require('../helpers/settings'),
      enums      = require('../helpers/enums'),
      constants  = require('../helpers/constants').logging;

const levels             = enums.logging.levels;
const prefixes           = Object.keys(levels).map(key => key.toUpperCase());
const logErrorsToConsole = enums.environments[settings.env] <= enums.environments.local; 

let pending  = { raw: [], str: [] };
let writeTimeout;

class LogService {
    constructor() {
        this.parseErrorArg     = this.parseErrorArg    .bind(this);
        this.formatRawEntryArg = this.formatRawEntryArg.bind(this);
        this.formatStrEntryArg = this.formatStrEntryArg.bind(this);
        this.writePending      = this.writePending     .bind(this);
    }

    parseErrorArg (err) {
        return {
            type:    err.name,
            message: err.message,
            stack:   err.stack
        }
    }

    getDateStr (date, spacer) {
        let today = date || new Date(),
            month = (today.getMonth() + 1).toString(),
            day   =  today.getDate ()     .toString(),
            year  =  today.getFullYear();

        if (month.length < 2) { month  = '0' + month; }
        if (day  .length < 2) { day    = '0' + day;   }
        if (!spacer)          { spacer = '-';         }

        return `${year}${spacer}${month}${spacer}${day}`;
    }

    getTimeStr (date, spacer) {
        let now     = date || new Date(),
            hours   = utils.pad(now.getHours()),
            minutes = utils.pad(now.getMinutes()),
            seconds = utils.pad(now.getSeconds());

        if (!spacer) { spacer = ':'; }

        return `${hours}${spacer}${minutes}${spacer}${seconds}`;
    }

    getRawFilename () { return `${constants.filePaths.raw}${this.getDateStr()}${constants.fileExt.raw}`; }
    getStrFilename () { return `${constants.filePaths.str}${this.getDateStr()}${constants.fileExt.str}`; }

    formatRawEntryArg (arg) {
        return arg instanceof Error 
             ? this.parseErrorArg(arg)
             : arg;
    }

    formatStrEntryArg (arg) {
        if (arg instanceof Error) { 
            return JSON.stringify(this.parseErrorArg(arg));
        }    

        if (typeof arg === 'object') { 
            return JSON.stringify(arg);
        }
    
        return arg;
    }

    addRawEntry (entry, session) {

        pending.raw.push(
            JSON.stringify({

                id:      utils.rand(),
                level:   entry.level,
                prefix:  prefixes[entry.level],
                session: session,
                time:    this.getTimeStr(entry.time),
                args:    utils.map(entry.args, this.formatRawEntryArg)

            })
        );
    }

    addStrEntry (entry, session) {
        pending.str.push(
            `${prefixes[entry.level]} ${this.getTimeStr(entry.time)} ${session} ${utils.map(entry.args, this.formatStrEntryArg).join(' ')}`
        );

        if (logErrorsToConsole && entry.level <= levels.error) {

            let args = [
                prefixes[entry.level],
                this.getTimeStr(entry.time),
                session
            ].concat(entry.args);

            console.error.apply(console, args);
        }
    }

    flushLog(log) {
        let str;

        utils.foreach(log.entries, entry => {
            if (log.settings.logRawLevel >= entry.level) { this.addRawEntry(entry, log.settings.session); }
            if (log.settings.logStrLevel >= entry.level) { this.addStrEntry(entry, log.settings.session); }
        });

        if (!writeTimeout) { writeTimeout = setTimeout(this.writePending, constants.writeTimeout); }
    }

    newLog(props) {
        if (!props) { props = {}; }

        props.session     = props.session     || utils.rand(10);
        props.logRawLevel = props.logRawLevel || levels.error;
        props.logStrLevel = props.logStrLevel || levels.debug;

        return new Log(props);
    }

    writePending () {
        writeTimeout = null;

        let raw = pending.raw.splice(0),
            str = pending.str.splice(0);

        if (raw.length) {
            fs.appendFile(this.getRawFilename(), raw.join('\n') + '\n', (err) => { 
                if (err) console.error('Error saving to log file!', err, this.getRawFilename()); 
            });
        }

        if (str.length) {
            fs.appendFile(this.getStrFilename(), str.join('\n') + '\n', (err) => { 
                if (err) console.error('Error saving to log file!', err, this.getStrFilename()); 
            });
        }
    }
}

const service  = new LogService();
Object.freeze(service);

module.exports = {
    flush:      service.flushLog.bind(service),
    newSession: service.newLog  .bind(service)
};