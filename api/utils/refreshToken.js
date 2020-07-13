const logger = require('../../config/winston');

const {generate} = require('./jwt');

/*** 
 * @desc Generate access token
 ***/
module.exports = async (email, id) => {
    try {        
        let access_token = await generate('access',{ id, email: email, access: 'user', type: 'access_token', expires: Date.now() + 300*60*1000 });
        let refresh_token = await generate('refresh',{ id, email: email, access: 'user', type: 'refresh_token', expires: Date.now() + 30*300*60*1000 });

        return {
            success: true,
            access_token,
            refresh_token,
        };
    } catch (err) {
        logger.error({ error: err, message: `An error occured` });
        return {success: false};
    }
}
