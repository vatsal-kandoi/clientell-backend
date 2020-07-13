const {isAlphanumeric, is,isDataURI, isEmail, isEmpty} = require('validator');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequest } = require('../responses');

module.exports = {
    addUser: (req, res, next) => {
        const {emailToAdd, mode, projectId} = req.body;

        if (!isAlphanumeric(mode)) return res.json({...BadRequest, message: 'Invalid access mode'})
        if (!isEmail(emailToAdd)) return res.json({...BadRequest, message: 'Invalid email'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        next();
    },
    deleteUser: (req, res, next) => {
        const {emailToRemove,projectId} = req.body;        
        if (!isEmail(emailToRemove)) return res.json({...BadRequest, message: 'Invalid email'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        next();
    },
    closeProject: (req, res, next) => {
        const {projectId, projectAccess} = req.body;
        if (!isAlphanumeric(projectAccess)) return res.json({...BadRequest, message: 'Invalid access'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});                
        next();
    },
    closeIssue: (req, res, next) => {
        const {projectId, issueId} = req.body;
        if (!ObjectId.isValid(issueId))  return res.json({...BadRequest, message: 'Invalid issue ID'});        
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});    
        next();
    },
    openIssue: (req, res, next) => {      
        const {projectId, issueId} = req.body;
        if (!ObjectId.isValid(issueId))  return res.json({...BadRequest, message: 'Invalid issue ID'});        
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});    
        next();
    },
    acceptIssue: (req, res, next) => {
        const {projectId, issueId} = req.body;
        if (!ObjectId.isValid(issueId))  return res.json({...BadRequest, message: 'Invalid issue ID'});        
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});    
        next();
    },
    rejectIssue: (req, res, next) => {
        const {projectId, issueId} = req.body;
        if (!ObjectId.isValid(issueId))  return res.json({...BadRequest, message: 'Invalid issue ID'});        
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        next();
    },
    acceptFeature: (req, res, next) => {
        const { status, projectId, featureId} = req.body;
        if (!isBoolean(status)) return res.json({...BadRequest, message: 'Status can be a boolean value only'});
        if (!ObjectId.isValid(featureId))  return res.json({...BadRequest, message: 'Invalid feature ID'});        
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});                
        next();
    },
    markCompleteFeature: (req, res, next) => {
        const {status, projectId, featureId} = req.body;

        if (!isBoolean(status)) return res.json({...BadRequest, message: 'Status can be a boolean value only'});
        if (!ObjectId.isValid(featureId))  return res.json({...BadRequest, message: 'Invalid feature ID'});        
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        next();
    },
}