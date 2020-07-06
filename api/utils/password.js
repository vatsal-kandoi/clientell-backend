const bcrypt = require('bcrypt');
const { verify } = require('jsonwebtoken');

module.exports = {
    /** Hash password */
    hash: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return reject(err);
                return resolve(hash);
            });
        })
    },

    /** Verify password */
    verify: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, res) {
                if (err) return reject(err);
                if (res) return resolve(true);
                return resolve(false);
            });
        })
    }
}