let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    nom: String,
    imageMatiere: String,
    prof: String
});

MatiereSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Matiere', MatiereSchema);