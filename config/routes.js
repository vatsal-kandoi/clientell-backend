const router = require('express').Router();
const logger = require('./winston');

/** Controllers */
const auth = require('../api/controllers/auth');
const project = require('../api/controllers/projects');
const comment = require('../api/controllers/comment');
const user = require('../api/controllers/user');

/** Validators */
const AuthValidator = require('../api/validators/auth');

/** Responses */
const ServerError = require('../api/responses').ServerError;

const userAuth = require('../api/policies/auth');

/** Authorization routes */
router.post('/auth/login', AuthValidator.login, auth.UserLogin);
router.post('/auth/signup', AuthValidator.signup, auth.UserSignup);

router.use('/project', userAuth);
router.use('/user', userAuth);
router.use('/comment', userAuth);

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
router.post('/project/issue/accept', project.AcceptIssue);
router.post('/project/issue/reject', project.RejectIssue);

router.post('/project/feature/add', project.AddFeature);
router.post('/project/feature/remove', project.RemoveFeature);
router.post('/project/feature/complete', project.MarkFeatureComplete);
router.post('/project/feature/accept', project.MarkFeatureAccepted);

/** User routes and dashboard */
router.post('/user/search', user.SearchUser);
router.get('/user/project', user.GetAllProject);
router.post('/user/project', user.GetProject);
router.post('/user/comments', user.GetComments);

/** Comment routes */
router.post('/project/comment/add', comment.add);
router.post('/project/comment/delete', comment.delete);


router.use('*', (err, req, res, next) => {
    logger.error({error: err, message: 'An error occured'});
    return res.json(ServerError)
});

module.exports = router;
