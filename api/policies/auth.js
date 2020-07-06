const {verify} = require('../utils/jwt');
const logger = require('../../config/winston');
const {RequireRefreshToken, AuthError, Success} = require('../responses');

const generateTokens = require('../utils/refreshToken');

/**
 * @desc Standard Express middleware for checking JSON token, and sending refresh token if expired
 * */
module.exports = async (req, res, next) => {
  const accessToken = req.headers['authorization'];
  if (accessToken == null) return res.json(AuthError);
  try {
    const token = await verify(accessToken);
    if (token.success != true || token.access != 'user' && (token.type != 'access_token' && token.type != 'refresh_token')) return res.json(AuthError);
    if (token.success == true && token.type != 'access_token' && token.expires > Date.now()) return res.json({...RequireRefreshToken});

    if (token.success == true && token.type == 'refresh_token' && token.expires > Date.now()) return res.json(AuthError)
    else if (token.success == true && token.type == 'refresh_token' && token.expires < Date.now()) {
      let tokens = await generateTokens(token.email, token.id);
      if (tokens.success == false) return res.json(AuthError);
      return res.json({
        success: true,
        code: 201,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token 
      });     
    }

    req.body.email = token.email;
    req.body.userId = token.id;
    req.body.access = token.access;

    next();
  } catch (err) {
    logger.info({message: `Invalid access attempt`});
    return res.json(AuthError);
  }
};
