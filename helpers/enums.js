const enums = module.exports = {
    environments: {
        local: 1,
        dev:   2,
        qa:    3,
        prod:  4
    },

    eventType: {
        class: 1,
        event: 2
    },

    activityType: {
        /* TODO */
    },

    userRole: {
        guest:    0,
        member:   5,
        trainer: 10,
        owner:   15,
        admin:   20
    },

    userStatus: {
        pending:  0,
        active:   1,
        inactive: 2,
        deleted:  3
    },

    months: {
        january:   1,
        february:  2,
        march:     3,
        april:     4,
        may:       5,
        june:      6,
        july:      7,
        august:    8,
        september: 9,
        october:  10,
        november: 11,
        december: 12
    },

    logging: {
        levels: {
            none:  0,
            error: 1,
            warn:  2,
            info:  3,
            debug: 4
        }
    },

    httpStatus: {
        success: {
            ok            : 200,
            created       : 201,
            accepted      : 202,
            noContent     : 204,
            resetContent  : 205,
            partialContent: 206
        },

        redirect: {
            multipleChoices  : 300,
            movedPermanently : 301,
            found            : 302,
            seeOther         : 303,
            notModified      : 304,
            useProxy         : 305,
            unused           : 306,
            temporaryRedirect: 307
        },

        clientError: {
            badRequest       : 400,
            unauthorized     : 401,
            paymentRequired  : 402,
            forbidden        : 403,
            notFound         : 404,
            methodNotAllowed : 405,
            notAcceptable    : 406,
            proxyAuthRequired: 407,
            requestTimeout   : 408,
            conflict         : 409
        },

        serverError: {
            internal              : 500,
            notImplemented        : 501,
            badGateway            : 502,
            serviceUnavailable    : 503,
            gatewayTimeout        : 504,
            httpVersionNotSupporte: 505
        }
    }
};