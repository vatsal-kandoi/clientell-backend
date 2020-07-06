const router = require('express').Router();
const logger = require('./winston');

/** Controllers */
const auth = require('../api/controllers/auth');
const project = require('../api/controllers/projects');
const comment = require('../api/controllers/comment');

/** Validators */
const AuthValidator = require('../api/validators/auth');

/** Responses */
const ServerError = require('../api/responses').ServerError;

const userAuth = require('../api/policies/userAuthPolicy');

/** Authorization routes */
router.post('/auth/login', AuthValidator.login, auth.UserLogin);
router.post('/auth/signup', AuthValidator.signup, auth.UserSignup);

router.use('*', userAuth);

/** Project routes */
router.post('/project/create', project.AddProject);
router.post('/project/delete', project.DeleteProject);
router.post('/project/close', project.CloseProject);

router.post('/project/link/add', project.AddLink);
router.post('/project/link/remove', project.RemoveLink);

router.post('/project/user/add', project.AddUser);
router.post('/project/user/remove', project.RemoveUser);

router.post('/project/issue/add', project.AddIssue);
router.post('/project/issue/remove', project.RemoveIssue);
router.post('/project/issue/open', project.OpenIssue);
router.post('/project/issue/close', project.CloseIssue);

router.post('/project/feature/add', project.AddFeature);
router.post('/project/feature/remove', project.RemoveFeature);



/** Comment routes */
router.post('/comment/add', comment.add);
router.post('/comment/delete', comment.delete);


router.use('*', (err, req, res, next) => {
    logger.error({error: err, message: 'An error occured'});
    return res.json(ServerError)
});

module.exports = router;
