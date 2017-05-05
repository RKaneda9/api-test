const { validate } = require('../../helpers/validator'),
      utils        = require('../../helpers/utils'),
      action       = require('../shared/action')
      valid        = action.valid();

module.exports = function Validation(type, fields, validation) {

    // checking to make sure all fields are covered.
    utils.foreach(fields, key => {
        if (!validation[key]) throw `No validation is set for ${type} field: ${key}`;
    });

    return (data, ignore) => {
        
        if (!validate.isNotEmptyObject(data))   return action.invalid(null, `${type} data is not an object.`);
        if (!validate.isNotEmptyArray (ignore)) ignore = [];

        let result;

        if (validation['_'] && !(results = validation['_']).isValid) return result;

        return utils.first(fields, key => {

            result = validation[key](data);

            if (!result.isValid) return result;

        }) || valid;
    }
}