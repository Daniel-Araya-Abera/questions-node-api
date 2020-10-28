var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var userSchema = mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        enum: ["regular", "admin"],
        required: true,
        default: "regular",
    },
});

module.exports = mongoose.model('User', userSchema);
