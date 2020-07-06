const {User} = require('../../models');
const logger = require('./winston');

const {ServerError, Success, AuthError} = require('../../responses');
const project = require('../../models/project');

/**
 * @desc Express get project dashboard endpoint
 * @endpoint /api/user/project
 */

module.exports = async(req, res) => {
    try {
        const {userId, projectId} = req.body;
        const hasAccess = await Project.findOne({_id: projectId, 'users.user': userId});
        if (hasAccess == null) return res.json(AuthError);

        const project = await Project.findOne({_id: projectId}).populate({path: 'users.user', select: 'name email'})
            .populate({path: 'closed.admin.by', select: 'name email'})
            .populate({path: 'closed.client.by', select: 'name email'})
            .populate({path: 'features', select: 'description deadline status completed accepted addedOn',
                populate: [{path: 'completed.by', select: 'name email'}, {path: 'accepted.by', select: 'name email'}] })
            .populate({path: 'issues', select: 'description addedBy addedOn closed',
                populate: [{path: 'addedBy', select: 'name email'}, {path: 'closed.by', select: 'name email'}]})
            .select('users features issues closed links')
            .lean();
        return res.json({...Success, ...project});
    } catch(err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);    
    }
}