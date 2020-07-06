const {User} = require('../../models');
const {generate} = require('../../utils/jwt');
const logger = require('./winston');

const {ServerError, AuthError} = require('../../responses');

/**
 * @desc Express signup endpoint
 * @endpoint /api/auth/signup
 */
module.exports = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if (user != null) return res.json({...AuthError, message: 'Email already exists'});

        user = new User({
            name, 
            email,
            password,
        });

        user = await user.save();
        if (user == null) return res.json(ServerError);
        
        let access_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'access_token', expires: Date.now() + 300*60*1000 });
        let refresh_token = await generate({ id: user._id, email: user.email, access: 'user', type: 'refresh_token', expires: Date.now() + 300*60*1000 });
        
        return res.json({
            ...responses.Success,
            access_token,
            refresh_token,
            name: user.name,
        });
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(ServerError);
    }
}