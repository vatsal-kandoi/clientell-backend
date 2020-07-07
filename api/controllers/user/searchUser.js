const {User} = require('../../models');
const logger = require('../../../config/winston');
const {ServerError, Success, AuthError} = require('../../responses');

/**
 * @desc Express search user endpoint
 * @endpoint /api/user/search
 */

module.exports = async(req, res) => {
    try {
        const {query} = req.body;
        const users = await User.find({ '$or': [{name: { $regex: '.*' + query + '.*' }}, {email: { $regex: '.*' + query + '.*' }}]}).select('name email').lean();
        return res.json({...Success, users})
    } catch(err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);    
    }
}