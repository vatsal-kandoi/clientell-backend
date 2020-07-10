const {Project, Issue} = require('../../models');
const logger = require('../../../config/winston');

const {ServerError, Success, AuthError} = require('../../responses');

module.exports = {
    /**
     * @desc Express close issue endpoint
     * @endpoint /api/project/issue/open
     */
    close: async (req, res) => {
        try {
            const {userId, projectId, issueId} = req.body;

            const project = await Project.findOne({_id: projectId, users: { $elemMatch: {user: userId, access: 'developer'}}}); 
            if (project == null) return res.json(AuthError);
            
            await Issue.findOneAndUpdate({_id: issueId}, {closed: {value: true, by: userId}});

            return res.json(Success);
        } catch(err) {
            logger.error({error: err, message: "An error occured"});
            return res.json(ServerError);
        }
    },
    
    /**
     * @desc Express open issue endpoint
     * @endpoint /api/project/issue/open
     */
    open: async (req, res) => {
        try {
            const {userId, projectId, issueId} = req.body;

            const project = await Project.findOne({_id: projectId, users: { $elemMatch: {user: userId, access: 'developer'}}}); 
            if (project == null) return res.json(AuthError);
            
            await Issue.findOneAndUpdate({_id: issueId}, {closed: {value: false, by: null}});

            return res.json(Success);
        } catch(err) {
            logger.error({error: err, message: "An error occured"});
            return res.json(ServerError);
        }
    },
    /**
     * @desc Express accept issue endpoint
     * @endpoint /api/project/issue/accept
     */
    accept: async (req, res) => {
        try {
            const {userId, projectId, issueId} = req.body;

            const project = await Project.findOne({_id: projectId, users: { $elemMatch: {user: userId, access: {"$in": ['client', 'admin']}}}}); 
            if (project == null) return res.json(AuthError);
            
            await Issue.findOneAndUpdate({_id: issueId}, {accepted: {value: true, by: userId}});

            return res.json(Success);
        } catch(err) {
            logger.error({error: err, message: "An error occured"});
            return res.json(ServerError);
        }
    },
    
    /**
     * @desc Express reject issue endpoint
     * @endpoint /api/project/issue/reject
     */
    reject: async (req, res) => {
        try {
            const {userId, projectId, issueId} = req.body;

            const project = await Project.findOne({_id: projectId, users: { $elemMatch: {user: userId, access: {"$in": ['client', 'admin']}}}}); 
            if (project == null) return res.json(AuthError);
            
            await Issue.findOneAndUpdate({_id: issueId}, {accepted: {value: false, by: null}});

            return res.json(Success);
        } catch(err) {
            logger.error({error: err, message: "An error occured"});
            return res.json(ServerError);
        }
    }

}