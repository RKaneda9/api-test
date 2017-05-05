const express     = require('express'),
      bodyParser  = require('body-parser'),
      compression = require('compression'),
      settings    = require('./helpers/settings'),
      db          = require('./services/database'),
      app         = express();

app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', require('./controllers/users'));

db.connect()
    .then(() => {
        app.listen(settings.port, () => {
            console.log(`Application is now running on port ${settings.port} under the following settings:`);
            console.log(settings);
        });
    })
    .catch(e => {
        console.error('There was a problem connecting to MongoDB', e);
        process.exit(1);
    });