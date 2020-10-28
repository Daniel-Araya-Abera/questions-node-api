var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var questionSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    userID: String,
    categoryID: String,
    activeUser: Boolean
});

module.exports = mongoose.model('Question', questionSchema);
