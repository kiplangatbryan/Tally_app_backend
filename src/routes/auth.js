const router = require("express").Router();


const { 
	validateLoginReq,
	validateRegistrationReq, 
	valPassword, 
	valEmail,
	messages 
} = require("../utils/validator");


const { 
	login,
	registration, 
	forgotPassword 
} = require("../controllers/auth");




router.post('/login', validateLoginReq, messages, login)
router.post('/register', validateRegistrationReq,messages, registration)



module.exports = router