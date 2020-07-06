const {User} = require('../../models');
const {generate} = require('../../utils/jwt');
const {verify} = require('../../utils/password');

const {NotFound, AuthError} = require('../../responses');

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
        
        let access_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'access_token', expires: Date.now() + 300*60*1000 });
        let refresh_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'refresh_token', expires: Date.now() + 300*60*1000 });
        
        return res.json({
            ...responses.Success,
            access_token,
            refresh_token,
            name: user.name,
        });
    } catch (err) {
        return res.json({...AuthError, message: 'Email and password combination does not match'});
    }
}