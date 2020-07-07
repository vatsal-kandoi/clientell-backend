const {Project} = require('../../models');
const logger = require('../../../config/winston');
const {ServerError, Success} = require('../../responses');



module.exports = {
    /**
     * @desc Express create link endpoint
     * @endpoint /api/project/link/add
     */
    add: async (req, res) => {
        try {
            const {linkFor, link, userId, projectId} = req.body;
            await Project.findOneAndUpdate({_id: projectId, 'users.user': userId}, {'$push': {links: {for: linkFor, link: link}}});              
            return res.json(Success)
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },

    /**
     * @desc Express remove link endpoint
     * @endpoint /api/project/link/remove0
     */
    remove: async (req, res) => {
        try {
            const {linkFor, userId, projectId} = req.body; 
            await Project.findOneAndUpdate({_id: projectId, 'users.user': userId}, {'$pull': {'links.$.for': linkFor}});
            return res.json(Success);
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },
}