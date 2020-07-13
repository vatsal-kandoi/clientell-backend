const {verify} = require('../utils/jwt');
const logger = require('../../config/winston');
const {RequireRefreshToken, AuthError, Success} = require('../responses');

const generateTokens = require('../utils/refreshToken');

/**
 * @desc Standard Express middleware for checking JSON token, and sending refresh token if expired
 * */
module.exports = async (req, res, next) => {
  const accessToken = req.headers['authorization'];
  if (accessToken == null) return res.status(401).json(AuthError);
  try {
    const token = await verify(accessToken);

    if (token.success != true || token.access != 'user' && (token.type != 'access_token' && token.type != 'refresh_token')) return res.status(401).json(AuthError);
    if (token.success == true && token.type == 'access_token' && token.expires > Date.now()) return res.status(401).json({...AuthError, RequireRefreshToken: true});

    req.body.email = token.email;
    req.body.userId = token.id;
    req.body.access = token.access;

    next();
  } catch (err) {
    logger.info({message: `Invalid access attempt`});
    return res.status(401).json(AuthError);
  }
};
