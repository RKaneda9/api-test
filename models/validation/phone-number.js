'use strict';

const fields       = require('../fields/phone-number'),
      action       = require('../shared/action'),
      utils        = require('../../helpers/utils'),
      types        = require('../../helpers/constants').phoneNumberTypes,
      { validate } = require('../../helpers/validator'),
      Validation   = require('./_base'),
      valid        = action.valid();

let validation = {};

validation[fields.type] = data => {

    if (!validate.isString(data.type)) return action.invalid(fields.type, 'Phone Number Type is not a string.');
    if (!validate.notEmpty(data.type)) return action.error  (fields.type, 'Please enter a phone number type.');
    if (!types[data])                  return action.error  (fields.type, 'Unknown phone number type.');

    return valid;
};

validation[fields.value] = data => {

    if (!validate.isString     (data.value)) return action.invalid(fields.value, 'Phone Number Value is not a string.');
    if (!validate.notEmpty     (data.value)) return action.error  (fields.value, 'Please enter a phone number.');
    if (!validate.isPhoneNumber(data.value)) return action.error  (fields.value, 'Invalid phone number.');

    return valid;
};

module.exports = new Validation('Phone Number', fields, validation);