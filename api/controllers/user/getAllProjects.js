const {User} = require('../../models');
const logger = require('../../../config/winston');
const {ServerError, Success, AuthError} = require('../../responses');

/**
 * @desc Express get projects endpoint
 * @endpoint /api/user/project
 */

module.exports = async(req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findOne({_id: userId}).select('name email projects createdAt')
            .populate({path: 'projects', select: '_id name createdAt closed'}).lean();

        if (user == null) return res.json(AuthError);

        return res.json({...Success, ...user});
    } catch(err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);    
    }
}