'use strict';

const { trim }    = require('../../helpers/validator'),
      utils       = require('../../helpers/utils'),
      DateKey     = require('../shared/datekey'),
      Address     = require('../shared/address'),
      PhoneNumber = require('../shared/phone-number');

module.exports = class User {
    constructor(props) {
        this.userName  = trim(props.userName,  100);
        this.firstName = trim(props.firstName, 100);
        this.lastName  = trim(props.lastName,  100);
        this.email     = trim(props.email,     100);

        this.dateOfBirth = new DateKey    (props.dateOfBirth);
        //this.meta        = new Meta       (props.meta);
        this.address     = new Address    (props.address);
        this.phoneNumber = new PhoneNumber(props.phoneNumber);

        this.alternateEmails       = utils.map(props.alternateEmails,       email  => trim(props.email, 100));
        this.alternatePhoneNumbers = utils.map(props.alternatePhoneNumbers, number => new PhoneNumber(number));

        this.role   = trim(props.role);
        this.status = trim(props.status);
    }

    unload() {
        return {
            firstName:             this.firstName,
            lastName:              this.lastName,
            email:                 this.email,
            dateOfBirth:           this.dateOfBirth.unload(),
            address:               this.address    .unload(),
            phoneNumber:           this.phoneNumber.unload(),
            alternateEmails:       this.alternateEmails,
            alternatePhoneNumbers: utils.map(this.alternatePhoneNumbers, number => number.unload()),
            role:                  this.role
        }
    }

    static toDocument(props) {
        return new User(props).unload();
    }
}