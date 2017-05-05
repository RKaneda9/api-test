module.exports = {
    phoneNumberTypes: {
        mobile: 'mobile',
        home:   'home'
    },

    logging: {
        filePaths: {
            raw: 'database/logs/',
            str: 'logs/'
        },

        fileExt: {
            raw: '.json',
            str: '.log'
        },

        writeTimeout: 15000
    }
};