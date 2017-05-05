'use strict';

module.exports = class PhoneNumber {
    constructor(props) {
        this.type  = props.type;
        this.value = PhoneNumber.parse(props.value);
    }

    unload() {
        return {
            type:  this.type,
            value: this.value
        };
    }

    static parse(input) {
        return input.match(/\d/g).join('');
    }

    static format(input) {
        let val, i;

        input = PhoneNumber.parse(input);

        // last 4 digits
        i     = Math.max(input.length - 4, 0);
        val   = input.substr(i, 4);
        input = input.substr(0, i);

        if (!input.length) return val;

        // middle 3 digits (can be 1 digit too)
        i     = Math.max(input.length - 3, 0);
        val   = `${input.substr(i, 3)}-${val}`;
        input = input.substr(0, i);

        if (!input.length) return val;

        // area code 
        i     = Math.max(input.length - 3, 0);
        val   = `(${input.substr(i, 3)}) ${val}`;
        input = input.substr(0, i);

        if (!input.length) return val;

        i     = input.length;
        val   = `+${input} ${val}`;

        return val;
    }
}