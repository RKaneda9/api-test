const utils    = require('../helpers/utils'),
      {events} = require('./event-system'),
      client   = require('mongodb').MongoClient;

const url = `mongodb://localhost:{port}/{dbName}`;

const collections = {
    users: 'users'
};

let db;

class DatabaseService {
    constructor(props) {
        this.props = utils.extend({}, props);

        // TODO: validation

        this.props.url = url
            .split('{port}')  .join(this.props.port)
            .split('{dbName}').join(this.props.dbName);
    }

    async connect() {
        return new Promise((resolve, reject) => {

            if (db) { return resolve(this); }

            client.connect(this.props.url, (err, database) => {
                if (err) { return reject(err); }

                db = database;

                events.onDatabaseConnected.emit();

                resolve(this);
            });
        });
    }

    use(collection) {
        // TODO: validate collection name.

        return db.collection(collection);
    }
}

const service = new DatabaseService(require('../helpers/settings').database);

module.exports = {
    collections: collections,
    connect:     service.connect.bind(service),
    use:         service.use    .bind(service)
};