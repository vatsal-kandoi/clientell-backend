const {User, Project} = require('../../models');
const logger = require('./winston');

const {ServerError, Success} = require('../../responses');



module.exports = {
    /**
     * @desc Express create issue endpoint
     * @endpoint /api/project/issue/add
     */
    add: async (req, res) => {
        try {
            const {description, projectId, userId} = req.body;

            await Project.findOneAndUpdate({_id: projectId, users: { $elemMatch: {user: userId, access: 'client'}}},
                {"push": {issues: {description: description, comments: [], addedBy: userId}}});

            return res.json(Success);
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
                {"pull": {issues: { _id: issueId }}});

            return res.json(Success)            
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },
}