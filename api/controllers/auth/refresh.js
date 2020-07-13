const refresh = require('../../utils/refreshToken');
const { AuthError } = require('../../responses');
const { verify } = require('../../utils/jwt');

const logger = require('../../../config/winston');

/**
 * @desc Express refresh token endpoint
 * @endpoint /api/auth/refresh
 */
module.exports = async (req, res) => {
    if (req.cookies['ClienTel'] == undefined) res.json(AuthError);
    try {
        let cookie = req.cookies['ClienTel'];
        const data = await verify(cookie);
        if (!data.success) {
            res.cookie('ClienTel', '', {expires: 0});
            return res.json(AuthError);
        }
        if (data.type != refresh_token || data.expires > Date.now()) return res.json(AuthError);
        const newTokens = await refresh(data.email, data.id);
        if (!newTokens.success) return res.json(AuthError);
        else {
            res.cookie('ClienTel', newTokens.refresh_token, {httpOnly: true});
            res.json({
                success: true,
                access_token: newTokens.access_token
            });
        }
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(AuthError);
    }
}