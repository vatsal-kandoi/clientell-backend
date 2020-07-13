const {verify} = require('../../utils/jwt');
const { AuthError, ServerError, Success } = require('../../responses');
const { User } = require('../../models');
const logger = require('../../../config/winston');

const {hash} = require('../../utils/password');

/**
 * @desc Express reset password endpoint
 * @endpoint /api/auth/resetpassword
 */
module.exports = async (req, res) => {
    try {
        const {newPassword, token} = req.body;
        const decoded = await verify(token);

        if (decoded.success == false || decoded.expires > Date.now()) return res.json(AuthError) 
        const {email, code} = decoded;

        const canUpdate = await User.findOne({email});
        if (canUpdate.passwordResetSecret.code == code || Date(canUpdate.passwordResetSecret.createdAt).now() + 3000 * 30 > Date.now()) return res.json({...AuthError, message: 'Link expired. Please retry'});

        const hashed = await hash(newPassword);
        const updated = await User.findOne({email},{password: hashed});

        if (updated == false) return res.json(ServerError);

        return res.json(Success);
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);
    } 
}