const {Comment, Project, Feature, Issue} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success, AuthError} = require('../../responses');

/**
 * @desc Express create project endpoint
 * @endpoint /api/user/comments
 */

module.exports = async(req, res) => {
    try {
        const {userId, projectId, componentId, type} = req.body;

        if (type == 'issue') {
            let hasAccess = await Project.findOne({_id: projectId, 'issues': componentId ,'users.user': userId});              
            if (hasAccess == null) return res.json(AuthError);

            const comments = await Issue.findOne({_id: componentId}).select('description addedOn closed accepted comments')
                .populate({path: 'comments', select: 'description by createdAt', populate: {path: 'by', select: 'name email'}}).lean();
            return res.json({...Success, ...comments});
        } else {
            let hasAccess = await Project.findOne({_id: projectId, 'features': componentId ,'users.user': userId});              
            if (hasAccess == null) return res.json(AuthError);

            const comments = await Feature.findOne({_id: componentId}).select('description addedOn completed accepted comments')
                .populate({path: 'comments', select: 'description by createdAt', populate: {path: 'by', select: 'name email'}}).lean();
            return res.json({...Success, ...comments});
        }
    } catch (err) {
        console.log(err);
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);    
    }     
}