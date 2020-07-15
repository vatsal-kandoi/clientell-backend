const {NotFound, AuthError, Success} = require('../../responses');

/**
 * @desc Express login endpoint
 * @endpoint /api/auth/logout
 */
module.exports = async (req, res) => {
    try {
        res.cookie('ClienTel', '',{maxAge: 0});

        return res.json(Success)
    } catch (err) {
        console.log(err);
        return res.json({...AuthError, message: 'Error logging out'});
    }
}