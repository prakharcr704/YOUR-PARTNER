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

router.get('/login',authController.getLogin);
router.get('/logout',authController.getLogout);
router.post('/validateLogin',authController.postLogin);
/*
router.get('/signup',authController.getSignUp);
router.post('/signup',authController.postSignUp);
/////////////////////////////////////////////////////////
/*you can use routes as  authRoutes.routes*/
exports.routes = router;
/////////////////////////////////////////////////////////
