const {isAlphanumeric, isDataURI, isEmail, isEmpty} = require('validator');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequest } = require('../responses');

module.exports = {
    project: (req, res, next) => {
        const {name} = req.body;
        if (isEmpty(name)) return res.json({...BadRequest, message: 'Name cannot be blank'});
        next();
    },
    issue: (req, res, next) => {
        const { description, projectId } = req.body;
        if (isEmpty(description) || !isAlphanumeric(description)) return res.json({...BadRequest, message: 'Description cannot be blank'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});
        next();
    },
    feature: (req, res, next) => {
        const { description, deadline, projectId } = req.body;
        if (isEmpty(description) || !isAlphanumeric(description)) return res.json({...BadRequest, message: 'Description cannot be blank'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});
        if (!isDataURI(deadline))
        next();
    },
    link: (req, res, next) => {
        const {linkFor, link, projectId} = req.body;
        if (isEmpty(linkFor) || !isAlphanumeric(linkFor)) return res.json({...BadRequest, message: 'Link description cannot be blank'});
        if (isEmpty(link) || !isAlphanumeric(link)) return res.json({...BadRequest, message: 'link cannot be blank'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        next();
    },
    comment: (req, res, next) => {
        const {projectId, componentId, type} = req.body;
        if (isEmpty(type) || !isAlphanumeric(type)) return res.json({...BadRequest, message: 'Type cannot be blank'});
        if (!ObjectId.isValid(projectId))  return res.json({...BadRequest, message: 'Invalid project ID'});        
        if (!ObjectId.isValid(componentId))  return res.json({...BadRequest, message: 'Invalid component ID'});        
        next();
    }
}