module.exports.AddProject = require('./add');
module.exports.DeleteProject = require('./remove');

module.exports.AddLink = require('./links').add;
module.exports.RemoveLink = require('./links').remove;

module.exports.AddUser = require('./user').add;
module.exports.RemoveUser = require('./user').remove;

module.exports.AddIssue = require('./issue').add;
module.exports.RemoveIssue = require('./issue').remove;