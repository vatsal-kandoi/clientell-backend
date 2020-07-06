const mongoose = require('mongoose');

const {hash} = require('../utils/password');

let user = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    createdAt: { type: Date, default: Date.now() },
});

user.pre('save',async (next) => {
    try {
        now = new Date();
        
        if(!this.createdAt) this.createdAt = now;
        this.password = await hash(this.password);
        next();
    } catch (err) {
        throw new Error(err);
    }
});

user = mongoose.model('User', user);

module.exports = user;
