'use strict';

const express  = require('express'),
      cors     = require('cors'),
      logging  = require('../middleware/logging'),
      status   = require('../helpers/enums').httpStatus,
      utils    = require('../helpers/utils'),
      users    = require('../services/users'),
      validate = require('../models/validation/user'),
      router   = express.Router();

router.use(cors());
router.use(logging);

const formatError = msg => `Oops...There was a problem ${msg}. We have been notified of the error and will be fixing it ASAP!`;

/* 
    Route:  http://{base}/api/users
    Method: Post
    Desc:   Create a user
*/
router.post('/', async (req, res) => {
    try {
        const data   = req.body;
        let   result = validate(data);

        if (!result.isValid) {

            if (!result.message) { 

                // TODO: dispatch error to log / email as a warning

                result.message = formatError("adding this user");
            }

            return res
                .status(status.clientError.badRequest)
                .error (result);
        }

        result = await users.add(data);

        res
            .status(status.success.ok)
            .json  (result.ops[0]);
    }
    catch (e) {

        res
            .status(status.serverError.internal)
            .error (formatError("adding this user"), e);
    }
});

/* 
    Route:  http://{base}/api/users
    Method: Get
    Desc:   Get all users
*/
router.get('/', async (req, res) => {

    try {
        let result = await users.getAll();

        res.status(status.success.ok).json(result);
    }
    catch (e) {

        res
            .status(status.serverError.internal)
            .error (formatError("retrieving users"), e);
    }
});

/* 
    Route:  http://{base}/api/users
    Method: Get
    Desc:   Get all users
*/
router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id;

        if (!id) {

            return res
                .status(status.clientError.badRequest)
                .send  ("No id parameter was passed in.");
        }

        if (!users.isValidId(id)) {

            return res
                    .status(status.clientError.badRequest)
                    .send  ("Invalid id");
        }

        let result = await users.getById(id);

        res.send(result);
    }
    catch (e) {

        res
            .status(status.serverError.internal)
            .error (formatError("retrieving user"), e);
    }
});

/* 
    Route:  http://{base}/api/users/:id
    Method: PUT
    Desc:   Update a user
*/
router.put('/:id', async (req, res) => {

    try {
        const id   = req.params.id,
              data = req.body;

        let result;
        
        if (!id) {
            
            return res
                .status(status.clientError.badRequest)
                .send  ("No id parameter was passed in.");
        }

        if (!users.isValidId(id)) {

            return res
                    .status(status.clientError.badRequest)
                    .send  ("Invalid id");
        }

        result = validate(data);

        if (!result.isValid) {

            if (!result.message) {

                // TODO: dispatch error to log / email as a warning

                result.message = formatError("updating this user");
            } 

            return res
                .status(status.clientError.badRequest)
                .error (result.message, result.error);
        }

        result = await users.update(id, data);

        res
            .status(status.success.ok)
            .json  (result);
    }
    catch (e) {

        res
            .status(status.serverError.internal)
            .error (formatError("updating this user"), e);
    }
});

/* 
    Route:  http://{base}/api/users/:id
    Method: DELETE
    Desc:   Delete a user
*/
router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        
        if (!id) {
            
            return res
                .status(status.clientError.badRequest)
                .send  ("No id parameter was passed in.");
        }

        if (!users.isValidId(id)) {

            return res
                    .status(status.clientError.badRequest)
                    .send  ("Invalid id");
        }

        let result = await users.delete(id);

        res
            .status(status.success.ok)
            .json  (result);
    }
    catch (e) {

        res
            .status(status.serverError.internal)
            .error (formatError("deleting this user"), e);
    }
});

module.exports = router;



