/////////////////////////////////////////////////////////
/*include Dependencies*/
const express = require('express');
/////////////////////////////////////////////////////////
/*include controllers*/
const userController = require('../controllers/user');
/////////////////////////////////////////////////////////
/*instances used*/
const router = express.Router();
/////////////////////////////////////////////////////////
/*linking routers*/
router.get('/',userController.getHomepage);
router.get('/about',userController.getAboutpage);
router.get('/services',userController.getServicespage);
router.get('/contact',userController.getContactpage);
router.get('/delete',userController.getDelete);
router.get('/edit-profile',userController.getEdit);
router.post('/edit-profile',userController.postEdit);
router.get('/first-step',userController.getFirstStep);
router.post('/first-step',userController.postFirstStep);
/////////////////////////////////////////////////////////
/*you can use routes as  authRoutes.routes*/
exports.routes = router;
/////////////////////////////////////////////////////////
