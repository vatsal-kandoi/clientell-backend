const {Project, Feature} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success} = require('../../responses');



module.exports = {
    /**
     * @desc Express edit completion status of feature endpoint
     * @endpoint /api/project/feature/complete
     */
    markComplete: async (req, res) => {
        try {
            const {userId, status, projectId, featureId} = req.body;
            
            let hasAccess = await Project.findOne({_id: projectId, features: featureId, users: { $elemMatch: {user: userId, access: 'developer'}}});
            if (hasAccess == null) return res.json(AuthError);

            if (status == true) {
                await Feature.findOneAndUpdate({_id: featureId}, {completed: {value: true, by: userId}, status: 'complete'});
                return res.json(Success);
            } else {
                await Feature.findOneAndUpdate({_id: featureId}, {completed: {value: false, by: null}, status: 'incomplete'});
                return res.json(Success);
            }
        } catch(err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);   
        }
    },

    /**
     * @desc Express edit accepted status of feature endpoint
     * @endpoint /api/project/feature/accept
     */
    acceptFeature: async (req, res) => {
        try {
            const {userId, status, projectId, featureId} = req.body;
            
            let hasAccess = await Project.findOne({_id: projectId, features: featureId, users: { $elemMatch: {user: userId, access: 'client'}}});
            if (hasAccess == null) return res.json(AuthError);

            if (status == true) {
                await Feature.findOneAndUpdate({_id: featureId}, {accepted: {value: true, by: userId}});
                return res.json(Success);
            } else {
                await Feature.findOneAndUpdate({_id: featureId}, {accepted: {value: false, by: null}});
                return res.json(Success);
            }
        } catch(err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);   
        }
    }
};