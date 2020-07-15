const {isAlphanumeric, isEmail, isEmpty} = require('validator');
const { BadRequest } = require('../responses');

module.exports = {
    signup: (req, res, next) => {
        const {name, email, password} = req.body;
        if (isEmpty(name)) return res.json({...BadRequest, message: 'Enter a proper name'});
        if (!isEmail(email)) return res.json({...BadRequest, message: 'Enter a proper email'});
        if (isEmpty(password))  return res.json({...BadRequest, message: 'Enter a proper password'});
        next();
    },

    login: (req, res, next) => {
        const {email, password} = req.body;
        if (!isEmail(email)) return res.json({...BadRequest, message: 'Enter a proper email'});
        if (isEmpty(password))  return res.json({...BadRequest, message: 'Enter a proper password'});
        next();
    },

    forgotPassword: (req, res, next) => {
        const {email} = req.body;
        if (!isEmail(email)) return res.json({...BadRequest, message: 'Enter a proper email'});
        next();
    },

    resetPassword: (req, res, next) => {
        const {token, password} = req.body;
        if ((isEmpty(token))) return res.json({...BadRequest, message: 'Bad token'});
        if (!((isAlphanumeric(password) || isEmpty(password))))  return res.json({...BadRequest, message: 'Enter a proper password'});
        next();
    }
}