const {User, Project} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success, NotFound} = require('../../responses');



module.exports = {
    /**
     * @desc Express create user endpoint
     * @endpoint /api/project/user/add
     */
    add: async (req, res) => {
        try {
            const {userId, emailToAdd, mode, projectId} = req.body;

            const userSearched = await User.findOne({email: emailToAdd});

            if (userSearched == null) return res.json(NotFound);

            await Project.findOneAndUpdate({_id: projectId, users: {$elemMatch: {user: userId, access: 'admin'}}}, {'$push': {users: { user: userSearched._id, access: mode }}});              
            await User.findOneAndUpdate({_id: userSearched._id}, {"$push": {projects: projectId}});
            return res.json({...Success, id: userSearched._id});
        } catch (err) {
            console.log(err)
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
            const {userId, emailToRemove,projectId} = req.body;

            const userSearched = await User.findOne({email: emailToRemove});

            if (userSearched == null) return res.json(NotFound);

            await Project.findOneAndUpdate({_id: projectId, users: {$elemMatch: {user: userId, access: 'admin'}}}, {'$pull': {users: { user: userSearched._id }}});              
            await User.findOneAndUpdate({_id: userSearched._id}, {"$pull": {projects: projectId}});

            return res.json(Success);
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    }
}