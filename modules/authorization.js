(() => {
    "use strict";

    const jwt = require('jsonwebtoken'),
        config = require('./config');

    module.exports = {
        isUserAuthentificated: function(req, res, next) {
            // check header or url parameters or post parameters for token
            var userId = req.body._id;
            var token = req.body.token || req.query.token || req.headers['x-access-token'];

            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, config.superSecret, function(err, decoded) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Failed to authenticate token.'
                        });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }
        }
    };
})();
