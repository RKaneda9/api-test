const db      = require('./database'),
      Id      = require('mongodb').ObjectID,
      {check} = require('../helpers/validator'),
      utils   = require('../helpers/utils'),
      User    = require('../models/documents/user'),
      Meta    = require('../models/shared/meta');

let collection;

class UsersService {
    constructor() {
        this.name = db.collections.users;

        this.setup();
    }

    formatId (id) {
        return { '_id': new Id(id) };
    }

    isValidId (id) {
        return check(id).isString().notEmpty().len(24, 24).isValid;
    }

    async setup() {
        collection = (await db.connect()).use(this.name);
    }

    async add(props) {
        /* 
            TODO: check if any user exists matching
            - email
            - alternateEmails
        */

        let user = User.toDocument(props);

        user.meta = Meta.newDocument('raiden kaneda');

        return await collection.insert(user);
    }

    async getById(id) {
        if (!this.isValidId(id)) { throw `Invalid id passed: ${id}`; }

        return await collection.findOne(this.formatId(id));
    }

    async getAll() {
        return await collection.find({}).toArray();
    }

    async update(id, props) {
        if (!this.isValidId(id)) { throw `Invalid id passed: ${id}`; }

        let prev = await this.getById(id);

        if (!prev) { return null; }

        let user = User.toDocument(props);
        user.meta = Meta.update(prev.meta, 'raiden kaneda');

        // TOOD: archive prev

        return await collection.update(this.formatId(id), user);
    }

    async delete(id) {
        if (!this.isValidId(id)) { throw `Invalid id passed: ${id}`; }

        return await collection.remove(this.formatId(id));
    }
}

// TODO: setup after db is connected.

const service = new UsersService();

module.exports = {
    isValidId: service.isValidId.bind(service),
    getAll:    service.getAll   .bind(service),
    getById:   service.getById  .bind(service),
    add:       service.add      .bind(service),
    update:    service.update   .bind(service),
    delete:    service.delete   .bind(service)
};