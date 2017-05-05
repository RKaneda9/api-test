const utils = {

    isArray   : val => val instanceof Array || val == null,
    isBoolean : val => typeof val === 'boolean',
    isString  : val => typeof val === 'string' || val == null,
    isObject  : val => typeof val === 'object' && !(val instanceof Array),
    isInteger : val => typeof val === 'number' && parseInt  (val) == val.toString(),
    isFloat   : val => typeof val === 'number' && parseFloat(val) == val.toString(),

    isNotEmptyString: val => { return typeof val === 'string' && val.trim().length; },
    isNotEmptyObject: val => { return typeof val === 'object' && val && !(val instanceof Array); },
    isNotEmptyArray:  val => { return typeof val === 'object' && val && val instanceof Array; },

    isPhoneNumber: val => {

        if (!val || !utils.isString(val)) return false;

        let parsed = val.match(/\d/g).join('');

        return parsed.length == 5 ||
               parsed.length == 7 ||
               parsed.length >= 10;
    },

    isEmailAddress: val => {

        return val 
            && utils.isString(val)
            && /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    },

    isValidUrl: val => {
        // TODO:
        return utils.isString(val);
    },

    notEmpty: val => {
             if (utils.isObject(val)) { return val && Object.keys(val).length > 0; }
        else if (utils.isArray (val)) { return val && val.length              > 0; }
        else if (utils.isString(val)) { return val && val.trim().length       > 0; }

        return !!val;
    },

    isWithinRange: (val, min, max) => {
        if (utils.isInteger(val)) {
            return val >= min
                && val <= max;
        }

        return false;
    },

    len: (val, min, max) => {
        if (utils.isString(val)) { 

            return val != null
                && (!min || val.trim().length >= min)
                && (!max || val.trim().length <= max);

        }

        else if (utils.isArray(val)) {

            return val != null
                && (!min || val.length >= min)
                && (!max || val.length <= max);
        }

        return false;
    }
};

/*
    Description: Validate class is a validation tool setup for chaining
    Examples:
        const {check} = require('./validator');
        
        check(data).isString().notEmpty().isEmailAddress().isValid
        check(data).isString().notEmpty().len(10, 100).isValid
*/
class Validate {

    constructor(data) {

        this.data    = data;
        this.isValid = true;
    }

    isArray       () { if (this.isValid) { this.isValid = utils.isArray       (this.data); } return this; }
    isObject      () { if (this.isValid) { this.isValid = utils.isObject      (this.data); } return this; }
    isString      () { if (this.isValid) { this.isValid = utils.isString      (this.data); } return this; }
    isInt         () { if (this.isValid) { this.isValid = utils.isInteger     (this.data); } return this; }
    isBool        () { if (this.isValid) { this.isValid = utils.isBoolean     (this.data); } return this; }
    isEmailAddress() { if (this.isValid) { this.isValid = utils.isEmailAddress(this.data); } return this; }
    isPhoneNumber () { if (this.isValid) { this.isValid = utils.isPhoneNumber (this.data); } return this; }
    notEmpty      () { if (this.isValid) { this.isValid = utils.notEmpty      (this.data); } return this; }

    notNull() { 

        if (this.isValid) {

            this.isValid = !!this.data || utils.isInteger(this.data);
        }

        return this;
    }

    len(min, max) {

        if (this.isValid) { 

            this.isValid = utils.len(this.data, min, max);
        }

        return this;
    }

    check (data) { this.data = data; return this; }
}

const check = (data) => (new Validate(data));
const trim  = (val, maxlength) => {
    val = val && utils.isString(val) ? val.trim() : val;

    if (maxlength) { val = val.substr(0, maxlength); }

    return val;
};

module.exports = { check, trim, validate: utils };