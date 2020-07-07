const {Project} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success, AuthError} = require('../../responses');


/**
 *** @desc Express close project admin endpoint
 *** @endpoint /api/project/close
 ***/
module.exports = async (req, res) => {
    try {
        const {userId, projectId, projectAccess} = req.body;
        if (projectAccess == 'admin') {
            await Project.findOneAndUpdate({_id: projectId,  users: { $elemMatch: {user: userId, access: 'admin'}}}, {closed: {admin: {value: true, by: userId}}});              
            return res.json(Success);
        } else if(projectAccess == 'client') {
            await Project.findOneAndUpdate({_id: projectId,  users: { $elemMatch: {user: userId, access: 'client'}}}, {closed: {client: {value: true, by: userId}}});              
            return res.json(Success);
        } else {
            return res.json(AuthError);
        }
    } catch (err) {
        logger.error({error: err, message: 'An error occured'});
        return res.json(ServerError);
    }
}