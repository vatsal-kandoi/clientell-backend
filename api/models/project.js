const mongoose = require('mongoose');

let project = new mongoose.Schema({
    name: {type: String},
    links: [{
      for: {type: String}, link: {type: String},
    }],
    users: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, access: String}],
    features: [{
        description: {type: String},
        deadline: {type: Date},
        status: {type: String},
        completed: {type: Boolean},
        accepted: {type: Boolean},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        addedOn: {type: Date, default: Date.now()},
    }],
    issues: [{
        description: {type: String},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        addedOn: {type: Date, default: Date.now()},
    }],
    createdAt: {type: Date, default: Date.now()},
});

project.pre('save', next => {
  now = new Date();
  if(!this.createdAt) this.createdAt = now;
  next();
});

project = mongoose.model('Project', project);

module.exports = project;
