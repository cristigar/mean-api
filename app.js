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
        /**
         * Create a user (accessed at POST http://localhost:8080/api/users)
         *
         * @param {Object} req, res - Request and response objects
         */
        .post((req, res) => {
            /**
             * Create a new instance of the User model and set the name and
             * password values from the request
             *
             * @param {Object} user - The user object
             * @param {string} user.name - The user's name
             * @param {string} user.password - The user's password
             */
            var user = new User({
                name: req.body.name,
                password: req.body.password
            });

            /**
             * Save the user
             *
             * @type {Object} user
             */
            user.save((err) => {
                if (err) res.send(err);

                res.json({ message: 'User created!' });
            });
        })

        //
        /**
         * Get all the users (accessed at GET http://localhost:8080/api/users)
         *
         * @param {Object} req, res - Request and response objects
         */
        .get((req, res) => {
            User.find((err, users) => {
                if (err) {
                    res.send(err);
                }

                res.json(users);
            });
        });

    router.route('/users/:user_id')

        /**
         * Get a single user by ID
         *
         * @param {Object} req, res - Request and response objects
         */
        .get((req, res) => {
            User.findById(req.params.user_id, (err, user) => {
                if (err) res.send(err);

                res.json(user);
            });
        });

    // register the routes
    app.use('/api', router);

    // starting the server
    app.listen(config.port);
    console.log('Listening on port: ' + config.port);
})();
