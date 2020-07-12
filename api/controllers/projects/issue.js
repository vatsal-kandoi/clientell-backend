const {Project, Issue} = require('../../models');
const logger = require('../../../config/winston');


const {ServerError, Success, AuthError} = require('../../responses');



module.exports = {
    /**
     * @desc Express create issue endpoint
     * @endpoint /api/project/issue/add
     */
    add: async (req, res) => {
        try {
            const {description, projectId, userId} = req.body;

            let issue = new Issue({
                description,
                comments: [],
                addedBy: userId,
            })

            issue = await issue.save();

            if (issue == null) return res.json(ServerError);

            const hasAccess = await Project.findOneAndUpdate({_id: projectId, 'closed.admin.value': false, 'closed.client.value':false, users: { $elemMatch: {user: userId, access: {"$in": ['client', 'admin']}}}},
                {"$push": { issues: issue._id}});

            if (hasAccess == null) return res.json(AuthError);

            return res.json({...Success, id: issue._id});
        } catch (err) {
            console.log(err);
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },

    /**
     * @desc Express remove issue endpoint
     * @endpoint /api/project/issue/remove
     */
    remove: async (req, res) => {
        try {
            const {issueId, projectId, userId} = req.body;
            
            await Project.findOneAndUpdate({_id: projectId, users: { $elemMatch: {user: userId, access: {"$in": ['client', 'admin']}}}},
                {"$pull": { issues: issueId}});

            await Issue.findOneAndDelete({_id: issueId});

            return res.json(Success);
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },
}