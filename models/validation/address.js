'use strict';

const fields       = require('../fields/address'),
      action       = require('../shared/action'),
      utils        = require('../../helpers/utils'),
      { validate } = require('../../helpers/validator'),
      Validation   = require('./_base'),
      valid        = action.valid();

let validation = {};

validation[fields.street] = data => {

    if (!validate.isString(data.street)) return action.invalid(fields.street, 'Street is not a string.');
    if (!validate.notEmpty(data.street)) return action.error  (fields.street, 'Please enter a street.');

    return valid;
};

validation[fields.city] = data => {

    if (!validate.isString(data.city)) return action.invalid(fields.city, 'City is not a string.');
    if (!validate.notEmpty(data.city)) return action.error  (fields.city, 'Please enter a city.');

    return valid;
};

validation[fields.region] = data => {

    if (!validate.isString(data.region)) return action.invalid(fields.region, 'State / Region is not a string.');
    if (!validate.notEmpty(data.region)) return action.error  (fields.region, 'Please enter a state / region.');

    return valid;
};

validation[fields.country] = data => {

    if (!validate.isString(data.country)) return action.invalid(fields.country, 'Country is not a string.');
    if (!validate.notEmpty(data.country)) return action.error  (fields.country, 'Please enter a country.');

    return valid;
};

validation[fields.zip] = data => {

    if (!validate.isString(data.zip)) return action.invalid(fields.zip, 'Zip / Postal Code is not a string.');
    if (!validate.notEmpty(data.zip)) return action.error  (fields.zip, 'Please enter a zip / postal code.');

    return valid;
};

module.exports = new Validation('Address', fields, validation);