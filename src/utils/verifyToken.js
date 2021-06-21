const clientModel = require("../models/user");
// const { generateTokenPayload } = "./index";
const jwt = require('jsonwebtoken')

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
    console.log(payload)
		return payload;
        
	}catch (error){
		// eslint-disable-next-line quotes
		defineError(`Cannot decode token error ${error}`,500);
	}
};


exports.verifyJWT = async (req, res, next) => {
  try{
		let token = req.header("Authorization");
		token = token && token.split(" ")[1];

    console.log(token)
		if (!token){
			return res.status(200).json({
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

    const user  = await clientModel.findById(payload.userId)

    if(!user){
      return res.status(200).json({
        success:false,
        message:"UnAuthorized Personnel Only"
      });
      
    }

    return res.status(200).json({
      success:true,
      message:"Authorized user"
    });
		
	}catch(error){
		next(error);
	}
};
