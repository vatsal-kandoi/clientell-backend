const express = require('express');
const router = express.Router();

const logger = require('./winston');

/** Controllers */
const auth = require('../api/controllers/auth');
const project = require('../api/controllers/projects');
const comment = require('../api/controllers/comment');
const user = require('../api/controllers/user');

/** Validators */
const AuthValidator = require('../api/validators/auth');
const CreateValidator = require('../api/validators/create-options');
const DeleteValidator = require('../api/validators/delete-options');
const UpdateValidator = require('../api/validators/update-options');

/** Responses */
const ServerError = require('../api/responses').ServerError;

const userAuth = require('../api/policies/auth');

/** Authorization routes */
router.post('/auth/login', AuthValidator.login, auth.UserLogin);
router.post('/auth/signup', AuthValidator.signup, auth.UserSignup);
router.post('/auth/refresh',auth.UserGenerateRefreshToken);
router.post('/auth/resetpassword', AuthValidator.resetPassword ,auth.UserResetPassword);
router.post('/auth/forgotpassword', AuthValidator.forgotPassword,auth.UserForgotPassword);

router.use('/project', userAuth);
router.use('/user', userAuth);
router.use('/comment', userAuth);

/** Project routes */
router.post('/project/create', CreateValidator.project, project.AddProject);
router.post('/project/delete', DeleteValidator.project, project.DeleteProject);
router.post('/project/close', UpdateValidator.closeProject, project.CloseProject);

router.post('/project/link/add', CreateValidator.link,project.AddLink);
router.post('/project/link/remove', DeleteValidator.link, project.RemoveLink);

router.post('/project/user/add', UpdateValidator.addUser ,project.AddUser);
router.post('/project/user/remove', UpdateValidator.deleteUser, project.RemoveUser);

router.post('/project/issue/add', CreateValidator.issue, project.AddIssue);
router.post('/project/issue/remove', DeleteValidator.issue, project.RemoveIssue);
router.post('/project/issue/open', UpdateValidator.openIssue, project.OpenIssue);
router.post('/project/issue/close', UpdateValidator.closeIssue, project.CloseIssue);
router.post('/project/issue/accept', UpdateValidator.acceptIssue, project.AcceptIssue);
router.post('/project/issue/reject', UpdateValidator.rejectIssue, project.RejectIssue);

router.post('/project/feature/add', CreateValidator.feature, project.AddFeature);
router.post('/project/feature/remove', DeleteValidator.feature ,project.RemoveFeature);
router.post('/project/feature/complete', UpdateValidator.markCompleteFeature ,project.MarkFeatureComplete);
router.post('/project/feature/accept', UpdateValidator.acceptFeature ,project.MarkFeatureAccepted);

/** User routes and dashboard */
router.post('/user/search', user.SearchUser);
router.get('/user/project', user.GetAllProject);
router.post('/user/project', user.GetProject);
router.post('/user/comments', user.GetComments);
router.get('/user/overview', user.GetOverview);

/** Comment routes */
router.post('/project/comment/add', CreateValidator.comment ,comment.add);
router.post('/project/comment/delete', DeleteValidator.comment, comment.delete);


router.use('*', (err, req, res, next) => {
    logger.error({error: err, message: 'An error occured'});
    return res.json(ServerError)
});

module.exports = router;
