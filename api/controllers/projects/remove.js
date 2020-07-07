const {User, Project} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success} = require('../../responses');

/**
 * @desc Express delete project endpoint
 * @endpoint /api/project/delete
 */
module.exports = async (req, res) => {
    try {
        const {projectId, userId} = req.body;

        const project = await Project.findOneAndDelete({_id: projectId, users: { $elemMatch: {user: userId, access: 'admin'}}});
        if (project == null) return res.json(ServerError);

        project.users.forEach(async function (element) {
            await User.findOneAndUpdate({_id: element.user._id}, {"$pull": {projects: project._id}});    
        });

        return res.json(Success);        
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);
    }
}