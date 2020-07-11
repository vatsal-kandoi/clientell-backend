const {User} = require('../../models');
const logger = require('../../../config/winston');
const {ServerError, Success, AuthError} = require('../../responses');

/**
 * @desc Express get projects endpoint
 * @endpoint /api/user/overview
 */

module.exports = async(req, res) => {
    try {
        const {userId} = req.body;
        let user = await User.findOne({_id: userId}).select('projects createdAt')
            .populate({path: 'projects', select: '_id name createdAt lastAccessed features issues users closed', order: {lastAccessed: -1}, limit: 4}).lean();

        if (user == null) return res.json(AuthError);
        user.projects.forEach(element => {
            element.users = element.users.length;
            element.features = element.features.length;
            element.issues = element.issues.length;
        });
        return res.json({...Success, ...user});
    } catch(err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);    
    }
}