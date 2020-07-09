const {Project, Issue} = require('../../models');
const logger = require('../../../config/winston');


const {ServerError, Success} = require('../../responses');



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

            await Project.findOneAndUpdate({_id: projectId, users: { $elemMatch: {user: userId, access: 'client'}}},
                {"$push": { issues: issue._id}});

            return res.json({...Success, id: issue._id});
        } catch (err) {
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
            
            await Project.findOneAndUpdate({_id: projectId, users: { $elemMatch: {user: userId, access: 'client'}}},
                {"$pull": { issues: { issueId }}});

            await Issue.findOneAndDelete({_id: issueId});

            return res.json(Success);
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },
}