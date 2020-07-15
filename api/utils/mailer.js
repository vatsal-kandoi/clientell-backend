const nodemailer = require('nodemailer');
/**
 * @desc Send a system email
 * @param {string} to Email to be sent to
 * @param {sting} data Message to be sent 
 */
module.exports = async (to, data) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                    user: 'cayla38@ethereal.email',
                    pass: 'GAnRreUzJVkWKh2nA4'
            }
        });
        let info = await transporter.sendMail({
            from: 'cayla38@ethereal.email',
            to: to,
            subject: "Password reset link",
            text: data
        });
        
        return true;
    } catch (err) {
        return false;
    }
};
