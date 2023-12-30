let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let UserSchema = Schema({
    login: String,
    password: String,
    role: String
});

UserSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('User', UserSchema);
