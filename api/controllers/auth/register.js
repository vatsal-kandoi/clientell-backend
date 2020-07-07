const {User} = require('../../models');
const {generate} = require('../../utils/jwt');
const logger = require('../../../config/winston');

const {hash} = require('../../utils/password');

const {ServerError, AuthError, Success} = require('../../responses');

/**
 * @desc Express signup endpoint
 * @endpoint /api/auth/signup
 */
module.exports = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if (user != null) return res.json({...AuthError, message: 'Email already exists'});
        const newPassword = await hash(password);
        
        user = new User({
            name, 
            email,
            password: newPassword,
        });

        user = await user.save();
        if (user == null) return res.json(ServerError);
        
        let access_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'access_token', expires: Date.now() + 300*60*1000 });
        let refresh_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'refresh_token', expires: Date.now() + 300*60*1000 });
        
        if (access_token.success == false || refresh_token.success == undefined) return res.json(ServerError);
        
        return res.json({
            ...Success,
            access_token: access_token.token,
            refresh_token: refresh_token.token,
            name: user.name,
        });
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);
    }
}