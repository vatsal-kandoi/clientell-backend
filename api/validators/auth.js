const {isAlphanumeric, isEmail, isEmpty} = require('validator');
const { BadRequest } = require('../responses');

module.exports = {
    signup: (req, res, next) => {
        const {name, email, password}
        if (!(isAlphanumeric(name) || isEmpty(name))) return res.json({...BadRequest, message: 'Enter a proper name'});
        if (!(isEmail(email))) return res.json({...BadRequest, message: 'Enter a proper email'});
        if (!((isAlphanumeric(password) || isEmpty(password))))  return res.json({...BadRequest, message: 'Enter a proper password'});
        next();
    },

    login: (req, res, next) => {
        const {email, password}
        if (!(isEmail(email))) return res.json({...BadRequest, message: 'Enter a proper email'});
        if (!((isAlphanumeric(password) || isEmpty(password))))  return res.json({...BadRequest, message: 'Enter a proper password'});
        next();
    },

    forgotPassword: (req, res, next) => {
        const {email}
        if (!(isEmail(email))) return res.json({...BadRequest, message: 'Enter a proper email'});
        next();
    },

    resetPassword: (req, res, next) => {
        const {token, password}
        if ((isEmpty(token))) return res.json({...BadRequest, message: 'Bad token'});
        if (!((isAlphanumeric(password) || isEmpty(password))))  return res.json({...BadRequest, message: 'Enter a proper password'});
        next();
    }
}