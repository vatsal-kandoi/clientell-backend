const {User} = require('../../models');
const {generate} = require('../../utils/jwt');
const {verify} = require('../../utils/password');

const {NotFound, AuthError, Success} = require('../../responses');

/**
 * @desc Express login endpoint
 * @endpoint /api/auth/login
 */
module.exports = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (user == null) return res.json(NotFound);

        const same = await verify(password, user.password);
        if (!same) return res.json({...AuthError, message: 'Email and password combination does not match'});
        
        let access_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'access_token', expires: Date.now() + 30000*60*1000 });
        let refresh_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'refresh_token', expires: Date.now() + 30000*60*1000 });
        if (access_token.success == false || refresh_token.success == undefined) return res.json(ServerError);

        return res.json({
            ...Success,
            access_token: access_token.token,
            refresh_token: refresh_token.token,
            name: user.name,
        });
    } catch (err) {
        return res.json({...AuthError, message: 'Email and password combination does not match'});
    }
}