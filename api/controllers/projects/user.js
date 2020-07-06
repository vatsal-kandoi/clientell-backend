const {User, Project} = require('../../models');
const logger = require('./winston');

const {ServerError, Success, NotFound} = require('../../responses');



module.exports = {
    /**
     * @desc Express create user endpoint
     * @endpoint /api/project/user/add
     */
    add: async (req, res) => {
        try {
            const {userId, emailToAdd, mode} = req.body;

            const userSearched = await User.findOne({email: emailToAdd});

            if (userSearched == null) return res.json(NotFound);

            await Project.findOneAndUpdate({_id: projectId, users: {$elemMatch: {user: userId, access: 'admin'}}}, {'$pull': {users: { user: userSearched._id, access: mode }}});              
            return res.json(Success)
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },

    /**
     * @desc Express remove user endpoint
     * @endpoint /api/project/user/remove
     */
    remove: async (req, res) => {
        try {
            const {userId, emailToRemove} = req.body;

            const userSearched = await User.findOne({email: emailToRemove});

            if (userSearched == null) return res.json(NotFound);

            await Project.findOneAndUpdate({_id: projectId, users: {$elemMatch: {user: userId, access: 'admin'}}}, {'$pull': {users: { user: userSearched._id }}});              
            return res.json(Success);
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    }
}