(() => {
    "use strict";

    const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        User = mongoose.model;
    // User = require('./user').model;

    var TodoSchema = new Schema({
        name: String,
        done: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        _author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    });

    module.exports = mongoose.model('Todo', TodoSchema);

})();
