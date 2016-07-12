(() => {
    "use strict";

    // setting the application configurations
    module.exports = {
        port: process.env.PORT || 8080,
        database: process.env.MONGO_URL || "mongodb://localhost:27017/todo_api"
    };

})();
