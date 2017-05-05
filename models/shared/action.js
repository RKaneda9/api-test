'use strict';

module.exports = class ActionResponse {
    constructor (isValid, message, data, error, target) {

        this.isValid = isValid;
        this.message = message || 'There was an error processing your request.'; // pretty print
        this.error   = error; 
        this.data    = data;
        this.target  = target;      
    }

    change(props) {
        if (!props) props = {};

        if (props.prefix) { 
            this.message = this.message ? `${props.prefix} ${this.message}` : props.prefix;
            this.error   = this.error   ? `${props.prefix} ${this.error}`   : props.prefix;
        }

        if (props.message) {
            this.message = props.message;
        }

        if (props.target) {
            this.target = props.target;
        }

        if (props.parent) {
            //this.target = this.target ? `${parent}.${this.target.split('.').slice(1).join('.')}` : parent;
            this.target = this.target ? `${parent}.${this.target}` : parent;
        }

        return this;
    }

    static valid (msg, data) {
        return new ActionResponse(true, msg, data);
    }

    static error (target, msg, error) {
        return new ActionResponse(false, msg, null, error, target);
    }

    static invalid (target, error, data) {
        return new ActionResponse(false, null, null, error, target);
    }
}