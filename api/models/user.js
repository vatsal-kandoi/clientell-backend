const mongoose = require('mongoose');

let user = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    createdAt: { type: Date, default: Date.now() },
});

user = mongoose.model('User', user);

module.exports = user;
