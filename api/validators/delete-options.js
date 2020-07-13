const {isAlphanumeric, isDataURI, isEmail, isEmpty} = require('validator');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequest } = require('../responses');

module.exports = {
    project: (req, res, next) => {
        const {projectId} = req.body;
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        next();
    },
    issue: (req, res, next) => {
        const {issueId, projectId} = req.body;
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        if (!ObjectId.isValid(issueId))  return res.json({...BadRequest, message: 'Invalid issue ID'});        
        next();
    },
    feature: (req, res, next) => {
        const {featureId, projectId} = req.body;
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        if (!ObjectId.isValid(featureId))  return res.json({...BadRequest, message: 'Invalid feature ID'});        

        next();
    },
    link: (req, res, next) => {
        const {linkFor, projectId} = req.body;
        if (isEmpty(linkFor) || !isAlphanumeric(linkFor)) return res.json({...BadRequest, message: 'Type cannot be blank'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        

        next();
    },
    comment: (req, res, next) => {
        const {commentId, projectId, componentId, type} = req.body;
        if (isEmpty(type) || !isAlphanumeric(type)) return res.json({...BadRequest, message: 'Type cannot be blank'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        if (!ObjectId.isValid(componentId))  return res.json({...BadRequest, message: 'Invalid component ID'});        
        if (!ObjectId.isValid(commentId))  return res.json({...BadRequest, message: 'Invalid comment ID'});        
        next();
    }
}