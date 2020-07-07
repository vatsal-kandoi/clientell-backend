const {Project, Issue, Feature, Comment} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success, AuthError} = require('../../responses');

module.exports = {
    /**
     * @desc Express close issue endpoint
     * @endpoint /api/project/comment/add
     */
    add: async (req, res) => {
        try {
            const {description, userId, type, projectId, componentId} = req.body;

            let comment = new Comment({
                description,
                by: userId                
            });
            comment = await comment.save();
            if (comment == null) return res.json(ServerError);

            if (type == 'issue') {
                // Issue
                let hasAccess = await Project.findOne({_id: projectId, 'issues': componentId ,'users.user': userId});              
                if (hasAccess == null) return res.json(AuthError);

                await Issue.findOneAndUpdate({_id: componentId}, {'$push': {comments: commentId}});
                return res.json(Success);
            } else {
                // Feature
                let hasAccess = await Project.findOne({_id: projectId, 'features': componentId ,'users.user': userId});              
                if (hasAccess == null) return res.json(AuthError);

                await Feature.findOneAndUpdate({_id: componentId}, {'$push': {comments: commentId}});
                return res.json(Success);
            }
        } catch (err) {
            logger.error({error: err, message: "An error occured"});
            return res.json(ServerError);    
        }     
    },


    /**
     * @desc Express delete comment endpoint
     * @endpoint /api/project/comment/delete
     */
    delete: async (req, res) => {
        try {
            const {commentId, userId, projectId, componentId, type} = req.body;

            if (type == 'issue') {
                // Issue
                let hasAccess = await Project.findOne({_id: projectId, 'issues': componentId ,'users.user': userId});              
                if (hasAccess == null) return res.json(AuthError);

                await Issue.findOneAndUpdate({_id: componentId}, {'$pull': {comments: commentId}});
                return res.json(Success);
            } else {
                // Feature
                let hasAccess = await Project.findOne({_id: projectId, 'features': componentId ,'users.user': userId});              
                if (hasAccess == null) return res.json(AuthError);

                await Feature.findOneAndUpdate({_id: componentId}, {'$pull': {comments: commentId}});
                return res.json(Success);
            }


        } catch (err) {
            logger.error({error: err, message: "An error occured"});
            return res.json(ServerError);    
        }     
    }
}