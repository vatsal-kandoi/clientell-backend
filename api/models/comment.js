const mongoose = require('mongoose');

let comment = new mongoose.Schema({
    description: {type: String},
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now() },
});

comment.pre('save', next => {
  now = new Date();
  if(!this.createdAt) this.createdAt = now;
  next();
});

comment = mongoose.model('Comment', comment);

module.exports = comment;
