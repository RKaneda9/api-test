const enums              = require('./enums'),
      utils              = require('./utils'),
      { validate, trim } = require('./validator');

let settings = {
    port: 3700,
    env:  enums.environments.prod,

    database: {
        port: 27017,
        dbName: "test"
    }
};

// validation and overrides
(function(config) {

    if (validate.isInteger(config.port)) settings.port = config.port;
    if (validate.isNotEmptyString(config.env) && 
        enums.environments[config.env])  settings.env  = config.env;

    if (validate.isNotEmptyObject(config.database)) {
        if (validate.isInteger       (config.database.port))   settings.database.port   = config.database.port;
        if (validate.isNotEmptyString(config.database.dbName)) settings.database.dbName = config.database.dbName;
    }

}(require('../settings')));

Object.freeze(settings);

module.exports = settings;