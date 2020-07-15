const {generate} = require('../../utils/jwt');

const logger = require('../../../config/winston');

const { User } = require('../../models');
const { NotFound, ServerError, Success } = require('../../responses');
const randomstring = require('randomstring');
const mailer = require('../../utils/mailer');

/**
 * @desc Express forgot password endpoint
 * @endpoint /api/auth/forgotpassword
 */
module.exports = async (req, res) => {
    try {
        const {email} = req.body;
        
        const user = await User.findOne({email});
        if (user == null) return res.json(NotFound);
        const random = await randomstring.generate(6);
        const updated = await User.findOneAndUpdate({_id: user._id}, {passwordResetSecret: {expires: Date.now() + 30 * 300000, code: random}});
        if (updated == null) return res.json(ServerError);

        const token = await generate('password', {email, type: 'password_reset', secret_code: random});
        if (!token.success) return res.json(ServerError);
        
        const mailSent = await mailer(user.email, `https://clientel.herokuapp.com/auth/resetpassword?token=${token.token}`);
        if (mailSent) return res.json(Success);
        return res.json(ServerError)
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);       
    }  
}
