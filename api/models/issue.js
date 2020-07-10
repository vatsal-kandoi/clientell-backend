const mongoose = require('mongoose');

let issue = new mongoose.Schema({
    description: {type: String},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    /** By client */
    addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    addedOn: {type: Date, default: Date.now()},
    /** By developer */
    closed: {
        value: {type: Boolean, default: false},
        by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    },
    /** By client or admin */
    accepted: {
      value: {type: Boolean, default: false},
      by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    }
});

issue.pre('save', next => {
  now = new Date();
  if(!this.addedOn) this.addedOn = now;
  next();
});

issue = mongoose.model('Issue', issue);

module.exports = issue;