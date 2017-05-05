'use strict';

const { trim } = require('../../helpers/validator');

module.exports = class Address {
    constructor(props) {
        this.street  = trim(props.street,  100);
        this.city    = trim(props.city,    100);
        this.region  = trim(props.region,  100);
        this.country = trim(props.country, 100);
        this.zip     = trim(props.zip,      10);
    }

    unload() {
        return {
            street:  this.street,
            city:    this.city,
            region:  this.region,
            country: this.country,
            zip:     this.zip
        };
    }
}