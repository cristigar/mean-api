(() => {
    "use strict";

    const
        express = require('express'),
        router = express.Router(),
        User = require('../models/user').model,
        config = require('../../modules/config'),
        jwt = require('jsonwebtoken'),
        authorization = require('../../modules/authorization');


    router.post('/login', (req, res) => {
        // find the user
        User.findOne({
            name: req.body.name
        }, (err, user) => {

            if (err) throw err;

            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

                    // if user is found and password is right
                    // create a token
                    const token = jwt.sign(user, config.superSecret, {
                        expiresIn: 60 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        user: user
                    });
                }

            }

        });
    });

    /**
     * Routes that end in `/users`
     */
    router.route('/')
        /**
         * Create a user (POST http://localhost:8080/api/users)
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
            let user = new User({
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

                res.json({
                    message: 'User created!'
                });
            });
        })
        /**
         * Get all the users (GET http://localhost:8080/api/users)
         *
         * @param {Object} req, res - Request and response objects
         */
        .get(authorization.isUserAuthentificated, (req, res) => {
            User.find((err, users) => {
                if (err) {
                    res.send(err);
                }

                res.json(users);
            });
        });

    /**
     * Routes tha end in `/users/:user_id`
     *
     * @param  {string} '/users/:user_id' Route descriptor
     */
    router.route('/:user_id')
        // Only follow those routes if the user is authenticated
        .all(authorization.isUserAuthentificated)
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
        })
        /**
         * Update the user with this id
         * (PUT http://localhost:8080/api/users/:user_id)
         *
         * @param {Object} req, res - Request and response objects
         */
        .put((req, res) => {
            /**
             * Find a user by id and change its name and password
             *
             * @param  {integer} req.params.user_id Id of the user
             */
            User.findById(req.params.user_id, (err, user) => {

                // Send error message in case of error
                if (err) res.send(err);

                // Update the user info
                user.name = req.body.name;
                user.password = req.body.password;

                // save the user
                user.save((err) => {
                    // Send error message in case of error
                    if (err) res.send(err);

                    // Send success message
                    res.json({
                        message: 'User updated!'
                    });
                });

            });
        })
        /**
         * Delete the user with this id
         * (DELETE http://localhost:8080/api/users/:user_id)
         *
         * @param {Object} req, res - Request and response objects
         */
        .delete((req, res) => {
            User.remove({
                _id: req.params.user_id
            }, (err, user) => {
                if (err) res.send(err);

                res.json({
                    message: 'User successfully deleted'
                });
            });
        });

    module.exports = router;
})();
