(() => {

    "use strict";

    // call the packages we need
    const
        express = require('express'),
        app = express(),
        config = require('./modules/config'),
        mongoose = require('mongoose'),
        usersRoutes = require('./app/routes/users'),
        todosRoutes = require('./app/routes/todos'),
        bodyParser = require('body-parser'),
        assert = require('assert');

    // configure app to use bodyParser()
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // establishing a database connection
    mongoose.connect(config.database, (err) => {
        assert.equal(null, err);
        console.log('Successfully connected to ' + config.database);
    });

    // register the routes
    app.use('/api/v1/users', usersRoutes);
    app.use('/api/v1/todos', todosRoutes);
    
    // starting the server
    app.listen(config.port);
    console.log('Listening on port: ' + config.port);
})();
