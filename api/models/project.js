const mongoose = require('mongoose');

let project = new mongoose.Schema({
    name: {type: String},
    links: [{
      for: {type: String}, link: {type: String},
    }],
    closed: {
        /** By admin */
        admin: {value: {type: Boolean, default: false}, by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}},
        /** By client */
        client: {value: {type: Boolean, default: false}, by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}},
    },
    /** By admin */
    users: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, access: String}],
    /** By client */
    features: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feature'}],
    issues: [{type: mongoose.Schema.Types.ObjectId, ref: 'Issue'}],
    createdAt: {type: Date, default: Date.now()},
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

project.pre('save', next => {
    now = new Date();
    if(!this.createdAt) this.createdAt = now;
    next();
});

project = mongoose.model('Project', project);

module.exports = project;
