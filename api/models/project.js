const mongoose = require('mongoose');

let project = new mongoose.Schema({
    name: {type: String},
    links: [{
      for: {type: String}, link: {type: String},
    }],
    closed: {
        /** By admin */
        admin: {type: Boolean, default: false},
        /** By client */
        client: {type: Boolean, default: false},
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
