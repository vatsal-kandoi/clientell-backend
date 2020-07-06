const mongoose = require('mongoose');

let feature = new mongoose.Schema({
    description: {type: String},
    deadline: {type: Date},
    status: {type: String, default: 'incomplete'},
    /** By developer */
    completed: {
        value: {type: Boolean, default: false},
        by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    },
    /** By client */
    accepted: {
        value: {type: Boolean, default: false},
        by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    addedOn: {type: Date, default: Date.now()},
    for: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
});

feature.pre('save', next => {
  now = new Date();
  if(!this.addedOn) this.addedOn = now;
  next();
});

feature = mongoose.model('Feature', feature);

module.exports = feature;