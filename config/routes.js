const express = require('express');
const router = express.Router();

const logger = require('./winston');
const auth = require('../api/controllers/auth');
const user = require('../api/controllers/user');
const course = require('../api/controllers/course');
const video = require('../api/controllers/videos');

const ServerError = require('../api/responses').ServerError;
const userAuth = require('../api/policies/userAuthPolicy');

router.use("*", (req, res) => {

});

router.post('/auth/login', auth.login);

router.use('/user', userAuth);
router.post('/user/course', user.addCourse);
router.delete('/user/course', user.removeCourse);

router.get('/user/dashboard', user.dashboard)

router.post('/user/search/add', user.addSearch);
router.post('/user/search/user', user.findUser);

router.use('/course', userAuth);
router.post('/course', course.getCourse);
router.post('/course/star', course.star)

router.post('/course/videos/add', video.add);
router.delete('/course/videos/add', video.delete);

router.post('/course/video/note/add', video.addNote);
router.post('/course/video/note/delete', video.deleteNote);
router.post('/course/video/note/fetch', video.getNote);

router.use("*", (err, req, res, next) => {
    logger.error({error: err, message: "An error occured"});
    return res.json(ServerError)
});
module.exports = router;
