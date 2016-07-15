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
                        });

                    res.json({
                        message: 'Todo created!'
                    });
                });
            });
        });

    /**
     * Routes tha end in `/users/:user_id`
     *
     * @param  {string} '/users/:user_id' Route descriptor
     */
    router.route('/:user_id')
        /**
         * Get all todos of a specific user
         *
         * @param {Object} req, res - Request and response objects
         */
        .get(
            (req, res) => {
                Todo.find({
                    _author: req.params.user_id
                }, (err, todos) => {
                    if (err) {
                        res.send(err);
                    }

                    res.json(todos);
                });
            });

    router.route('/:todo_id')

    .put((req, res) => {
        /**
         * Find the todo by id and change its name
         */
        Todo.findById(req.params.todo_id, (err, todo) => {

            // Send error message in case of error
            if (err) res.send(err);

            // Update todo info
            todo.name = req.body.name;
            todo.done = req.body.done;

            // save todo
            todo.save((err) => {
                // Send error message in case of error
                if (err) res.send(err);

                // Send success message
                res.json({
                    message: 'Todo updated!'
                });
            });

        });
    })

    .delete((req, res) => {
        Todo.remove({
            _id: req.params.todo_id
        }, (err, todo) => {
            if (err) res.send(err);

            res.json({
                message: 'Todo successfully deleted'
            });
        });
    });

    module.exports = router;
})();
