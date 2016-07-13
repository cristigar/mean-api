(() => {
    "use strict";

    const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        Todo = require('./todo');

    var UserSchema = new Schema({
        name: String,
        password: String,
        todos: [{
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }]
    });

    //module.exports = mongoose.model('User', UserSchema);
    module.exports = {
        model: mongoose.model('User', UserSchema),
        schema: UserSchema
    };

})();
