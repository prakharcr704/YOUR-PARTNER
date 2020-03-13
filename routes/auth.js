/////////////////////////////////////////////////////////
/*include Dependencies*/
const express = require('express');
/////////////////////////////////////////////////////////
/*include controllers*/
const authController = require('../controllers/auth');
/////////////////////////////////////////////////////////
/*instances used*/
const router = express.Router();
/////////////////////////////////////////////////////////
/*linking routers*/

router.get('/signup',authController.getSignUp);
router.get('/login',authController.getLogin);
router.get('/logout',authController.getLogout);
router.post('/validateLogin',authController.postLogin);
router.post('/signup',authController.postSignUp);
router.get('/forgotPassword',authController.getForgotPassword);
router.post('/forgotPassword',authController.postForgotPassword);
/////////////////////////////////////////////////////////
/*you can use routes as  authRoutes.routes*/
exports.routes = router;
/////////////////////////////////////////////////////////
