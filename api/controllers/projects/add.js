const {User, Project} = require('../../models');
const logger = require('./winston');

const {ServerError, Success} = require('../../responses');
const user = require('../../models/user');

/**
 * @desc Express create project endpoint
 * @endpoint /api/project/create
 */
module.exports = async (req, res) => {
    try {
        const {name, userId} = req.body;
        let project = new Project({
            name, 
            by: userId,
            links: [],
            users: [{user: userId, access: 'admin'}],
            features: [],
            issues: [],
        });

        project = await project.save();
        if (project == null) return res.json(ServerError);

        await User.findOneAndUpdate({_id: userId}, {"$push": {projects: project._id}});

        return res.json({...Success, project: project._id});        
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);
    }
}