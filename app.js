(() => {

    "use strict";

    // call the packages we need
    var express = require('express'),
        app = express(),
        bodyParser = require('body-parser');

    // configure app to use bodyParser()
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    var port = process.env.PORT || 8080;

    // configuring routes
    var router = express.Router();

    // testing routes to make sure everything is working (localhost:8080/api)
    router.get('/', (req, res) => {
        res.json({
            message: "It works!"
        });
    });

    // register the routes
    app.use('/api', router);

    // starting the server
    app.listen(port);
    console.log('Listening on port: ' + port);
})();
