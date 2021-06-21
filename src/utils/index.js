const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path  = require('path')
const dotenv = require('dotenv')

// import config file
dotenv.config({path: path.join(__dirname,"../config/config.env")});


const defineError = (message,code)=>{
	const error = Error(`${message}`);
	error.status = code;
	return error;
};


const generateTokenPayload = async function (token){
	try{

		const payload = jwt.verify(token, process.env.SECRETORKEY);
		return payload;
        
	}catch (error){
		// eslint-disable-next-line quotes
		defineError(`Cannot decode token error ${error}`,500);
	}
};

exports.clientAuthorization = async (req,res,next) =>{
	try{
		let token = req.header("Authorization");
		token = token && token.split(" ")[1];
		if (!token){
			return res.status(200).json({
				status:403,
				success:false,
				message:"UnAuthorized Personnel Only"
			});
		}
		const payload = await generateTokenPayload(token);
	
		if (!payload){
			return res.status(200).json({
				status:403,
				success:false,
				message:"UnAuthorized Personnel Only"
			});
		}
		req.user = payload;
		next();
	}catch(error){
		next(error);
	}
};

exports.hashPassword  = async (plain,res)=>{
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(plain,salt);
		return hash;
	} catch (error) {
		return res.status(500).json({
			success:false,
			error:error
		});
	}
    
};

exports.generateTokenPayload  = generateTokenPayload