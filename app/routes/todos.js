(() => {
    "use strict";

    const
        express = require('express'),
        router = express.Router(),
        Todo = require('../models/todo'),
        User = require('../models/user').model;

    /**
     * Routes that end in `/todos`
     */
    router.route('/')
        /**
         * Create a todo (POST http://localhost:8080/api/todo)
         *
         * @param {Object} req, res - Request and response objects
         */
        .post((req, res) => {

            // Set todo name from the request
            let todo = new Todo({
                name: req.body.name
            });

            /**
             * Find the author of todo
             */
            User.findById(req.body.author, (err, user) => {
                if (err) res.send(err);

                // Set the author of todo to the found user id
                todo._author = user._id;

                //Save the user
                todo.save((err) => {
                    if (err) res.send(err);

                    // Populate the todo author with author object
                    Todo.findById(todo._id, (err, todo) => {})
                        .populate('_author')
                        .exec((err, todo) => {
                            if (err) res.send(err);

                            // Log the newly created todo
                            console.log(todo);
                        });

                    res.json({
                        message: 'Todo created!'
                    });
                });
            });
        });
        // /**
        //  * Get all the users (GET http://localhost:8080/api/users)
        //  *
        //  * @param {Object} req, res - Request and response objects
        //  */
        // .get((req, res) => {
        //     User.find((err, users) => {
        //         if (err) {
        //             res.send(err);
        //         }
        //
        //         res.json(users);
        //     });
        // });
    //
    // /**
    //  * Routes tha end in `/users/:user_id`
    //  *
    //  * @param  {string} '/users/:user_id' Route descriptor
    //  */
    // router.route('/users/:user_id')
    //     /**
    //      * Get a single user by ID
    //      *
    //      * @param {Object} req, res - Request and response objects
    //      */
    //     .get((req, res) => {
    //         User.findById(req.params.user_id, (err, user) => {
    //             if (err) res.send(err);
    //
    //             res.json(user);
    //         });
    //     })
    //     /**
    //      * Update the user with this id
    //      * (PUT http://localhost:8080/api/users/:user_id)
    //      *
    //      * @param {Object} req, res - Request and response objects
    //      */
    //     .put((req, res) => {
    //         /**
    //          * Find a user by id and change its name and password
    //          *
    //          * @param  {integer} req.params.user_id Id of the user
    //          */
    //         User.findById(req.params.user_id, (err, user) => {
    //
    //             // Send error message in case of error
    //             if (err) res.send(err);
    //
    //             // Update the user info
    //             user.name = req.body.name;
    //             user.password = req.body.password;
    //
    //             // save the user
    //             user.save((err) => {
    //                 // Send error message in case of error
    //                 if (err) res.send(err);
    //
    //                 // Send success message
    //                 res.json({
    //                     message: 'User updated!'
    //                 });
    //             });
    //
    //         });
    //     })
    //     /**
    //      * Delete the user with this id
    //      * (DELETE http://localhost:8080/api/users/:user_id)
    //      *
    //      * @param {Object} req, res - Request and response objects
    //      */
    //     .delete((req, res) => {
    //         User.remove({
    //             _id: req.params.user_id
    //         }, (err, user) => {
    //             if (err) res.send(err);
    //
    //             res.json({
    //                 message: 'User successfully deleted'
    //             });
    //         });
    //     });

    module.exports = router;
})();
