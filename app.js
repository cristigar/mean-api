(() => {

    "use strict";

    // call the packages we need
    var express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        config = require('./modules/config'),
        User = require('./app/models/user'),
        assert = require('assert');

    // configure app to use bodyParser()
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // establishing a database connection
    mongoose.connect(config.database, (err) => {
        assert.equal(null, err);
        console.log('Successfully connected to ' + config.database);
    });

    // configuring routes
    var router = express.Router();

    // middleware to use for all requests
    router.use((req, res, next) => {
        // logging...
        console.log('Something is happening.');
        next(); // pass to the next route
    });

    // testing routes to make sure everything is working (localhost:8080/api)
    router.get('/', (req, res) => {
        res.json({
            message: "It works!"
        });
    });

    // register the routes
    app.use('/api', router);

    // starting the server
    app.listen(config.port);
    console.log('Listening on port: ' + config.port);
})();
