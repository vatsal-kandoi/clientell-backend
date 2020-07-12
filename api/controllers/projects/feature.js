const {Project, Feature} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success, AuthError} = require('../../responses');



module.exports = {
    /**
     * @desc Express create feature endpoint
     * @endpoint /api/project/feature/add
     */
    add: async (req, res) => {
        try {
            const {description, deadline, projectId, userId} = req.body;

            let feature = new Feature({
                description,
                deadline,
                comments: [],
            })

            feature = await feature.save();

            if (feature == null) return res.json(ServerError);

            const hasAccess = await Project.findOneAndUpdate({_id: projectId, 'closed.admin.value': false, 'closed.client.value':false, users: { $elemMatch: {user: userId, access: 'admin'}}},
                {"$push": { features: feature._id}});
            if (hasAccess == null) return res.json(AuthError);
            return res.json({...Success, id: feature._id});
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },

    /**
     * @desc Express remove feature endpoint
     * @endpoint /api/project/feature/remove
     */
    remove: async (req, res) => {
        try {
            const {featureId, projectId, userId} = req.body;
            
            await Project.findOneAndUpdate({_id: projectId, users: { $elemMatch: {user: userId, access: 'admin'}}},
                {"$pull": { features: { featureId}}});

            await Feature.findOneAndDelete({_id: featureId});

            return res.json(Success);
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },
}