const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    /*_id: {
        type: Object
    },*/
    googleid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    }
    /*password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },*/
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;