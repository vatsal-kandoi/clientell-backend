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
            let updated = await Project.findOneAndUpdate({_id: projectId, 'closed.client.value': true, users: { $elemMatch: {user: userId, access: 'admin'}}}, {'closed.admin.value': true, 'closed.admin.by': userId});              
            if (updated == null) return res.json(AuthError);
            return res.json(Success);
        } else if(projectAccess == 'client') {
            let updated = await Project.findOneAndUpdate({_id: projectId,  users: { $elemMatch: {user: userId, access: 'client'}}}, {'closed.client.value': true, 'closed.client.by': userId});              
            if (updated == null) return res.json(AuthError);
            return res.json(Success);
        } else {
            return res.json(AuthError);
        }
    } catch (err) {
        logger.error({error: err, message: 'An error occured'});
        return res.json(ServerError);
    }
}