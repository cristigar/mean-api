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

    // routes that end in /users
    router.route('/users')
        // create a user (accessed at POST http://localhost:8080/api/users)
        .post((req, res) => {

            // create a new instance of the User model
            var user = new User();

            // set the user's name (comes from the request)
            user.name = req.body.name;

            // set the user's password (comes from the request)
            user.password = req.body.password;

            user.save((err) => {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'User created!' });
            });
        })

        // get all the users (accessed at GET http://localhost:8080/api/users)
        .get((req, res) => {
            User.find((err, users) => {
                if (err) {
                    res.send(err);
                }

                res.json(users);
            });
        });

    // register the routes
    app.use('/api', router);

    // starting the server
    app.listen(config.port);
    console.log('Listening on port: ' + config.port);
})();
