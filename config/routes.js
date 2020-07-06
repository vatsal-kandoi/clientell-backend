const router = require('express').Router();
const logger = require('./winston');

/** Controllers */
const auth = require('../api/controllers/auth');

/** Validators */
const AuthValidator = require('../api/validators/auth');

/** Responses */
const ServerError = require('../api/responses').ServerError;

const userAuth = require('../api/policies/userAuthPolicy');

/** Authorization routes */
router.post('/auth/login', AuthValidator.login, auth.login);
router.post('/auth/signup', AuthValidator.signup, auth.signup);

router.use("*", userAuth);

router.use("*", (err, req, res, next) => {
    logger.error({error: err, message: "An error occured"});
    return res.json(ServerError)
});

module.exports = router;
