const {User, Project} = require('../../models');
const logger = require('./winston');

const {ServerError, Success} = require('../../responses');



module.exports = {
    /**
     * @desc Express create feature endpoint
     * @endpoint /api/project/feature/add
     */
    add: async (req, res) => {
        try {
            return res.json(Success)
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },

    /**
     * @desc Express remove feature endpoint
     * @endpoint /api/project/feature/remove
     */
    remove: async (req, res) => {
        try {
            return res.json(Success);
        } catch (err) {
            logger.error({error: err, message: 'An error occured'});
            return res.json(ServerError);
        }
    },
}