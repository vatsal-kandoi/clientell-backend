module.exports.AddProject = require('./add');
module.exports.CloseProject = require('./close');
module.exports.DeleteProject = require('./remove');

module.exports.AddLink = require('./links').add;
module.exports.RemoveLink = require('./links').remove;

module.exports.AddUser = require('./user').add;
module.exports.RemoveUser = require('./user').remove;

module.exports.AddIssue = require('./issue').add;
module.exports.RemoveIssue = require('./issue').remove;
module.exports.OpenIssue = require('./edit-issue').open;
module.exports.CloseIssue = require('./edit-issue').close;

module.exports.AddFeature = require('./feature').add;
module.exports.RemoveFeature = require('./feature').remove;
module.exports.MarkFeatureAccepted = require('./edit-feature').acceptFeature;
module.exports.MarkFeatureComplete = require('./edit-feature').markComplete;

