/////////////////////////////////////////////////////////
/*include modules*/
const express = require('express');



/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/*include controllers*/
const clientController = require('../controllers/client');


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/*link routers*/
const router = express.Router();
router.get('/',clientController.getHomepage);


/////////////////////////////////////////////////////////
module.exports = router;
