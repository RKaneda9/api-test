'use strict';

const fields       = require('../fields/user'),
      action       = require('../shared/action'),
      DateKey      = require('./datekey'),
      Address      = require('./address'),
      PhoneNumber  = require('./phone-number'),
      utils        = require('../../helpers/utils'),
      { validate } = require('../../helpers/validator'),
      enums        = require('../../helpers/enums'),
      Validation   = require('./_base'),
      valid        = action.valid();

let validation = {};

validation[fields.userName] = data => {

    if (!validate.isString(data.userName))        return action.invalid(fields.userName, 'Username is not a string.');
    if (!validate.notEmpty(data.userName))        return action.error  (fields.userName, 'Please enter a username.');
    if (!validate.len     (data.userName, 5, 20)) return action.error  (fields.userName, 'Username must be between 5 and 20 characters');

    return valid;
};

validation[fields.firstName] = data => {

    if (!validate.isString(data.firstName)) return action.invalid(fields.firstName, 'First name is not a string.');
    if (!validate.notEmpty(data.firstName)) return action.error  (fields.firstName, 'Please enter a first name.');

    return valid;
};

validation[fields.lastName] = data => {

    if (!validate.isString(data.lastName)) return action.invalid(fields.lastName, 'Last name is not a string.');
    if (!validate.notEmpty(data.lastName)) return action.error  (fields.lastName, 'Please enter a last name.');

    return valid;
};

validation[fields.email] = data => {

    if (!validate.isString      (data.email)) return action.invalid(fields.email, 'Email is not a string.');
    if (!validate.notEmpty      (data.email)) return action.error  (fields.email, 'Please enter an email address.');
    if (!validate.isEmailAddress(data.email)) return action.error  (fields.email, 'Please enter a valid email address.');

    return valid;
};

validation[fields.role] = data => {

    if (!validate.isString(data.role)) return action.invalid(fields.role, 'Role is not a string.');
    if (!validate.notEmpty(data.role)) return action.error  (fields.role, 'Please enter a role.');
    if (!enums.userRole   [data.role]) return action.error  (fields.role, 'Invalid role.');

    return valid;
};

validation[fields.status] = data => {

    if (!validate.isString(data.status)) return action.invalid(fields.status, 'Status is not a string.');
    if (!validate.notEmpty(data.status)) return action.error  (fields.status, 'Please enter a status.');
    if (!enums.userStatus [data.status]) return action.error  (fields.status, 'Invalid status.');

    return valid;
};

validation[fields.password] = data => {

    if (!validate.isString(data.password)) return action.invalid(fields.password, 'Password is not a string.');

    return valid;
};

validation[fields.dateOfBirth] = data => {

    let result = DateKey(data.dateOfBirth); 

    if (!result.isValid) return result.change({ target: fields.dateOfBirth });

    return valid;
};

validation[fields.address] = data => {

    let result = Address(data.address); 

    if (!result.isValid) return result.change({ target: fields.address });

    return valid;
};

validation[fields.phoneNumber] = data => {

    let result = PhoneNumber(data.phoneNumber); 

    if (!result.isValid) return result.change({ target: fields.phoneNumber });

    return valid;
};

validation[fields.alternateEmails] = data => {

    return utils.first(data.alternateEmails, (email, i) => {

        if (!validate.isString      (email)) return action.error(`${fields.alternateEmails}.${i}`, "One of the alternate emails is not a string.");
        if (!validate.notEmpty      (email)) return action.error(`${fields.alternateEmails}.${i}`, "One of the alternate emails was left empty.");
        if (!validate.isEmailAddress(email)) return action.error(`${fields.alternateEmails}.${i}`, "One of the alternate emails is not a valid email address.");

    }) || valid;
};

validation[fields.alternatePhoneNumbers] = data => {

    let result;

    return utils.first(data.alternatePhoneNumbers, (phoneNumber, i) => {

        result = PhoneNumber(phoneNumber);

        if (!result.isValid) return result.change({ target: `${fields.alternatePhoneNumbers}.${i}` });

    }) || valid;
};

module.exports = new Validation('User', fields, validation);