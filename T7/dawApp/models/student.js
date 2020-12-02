var mongoose = require('mongoose')
var Schema = mongoose.Schema

var studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numero: String,
    nome: String,
    git: String,
    tpc: [Number]
});

module.exports = mongoose.model('student', studentSchema)