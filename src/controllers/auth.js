// import clientUser
const clientUser = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config({ path:  "../../config/config.env" });

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(req.body)

    const userDetails = await clientUser.findOne({ email: email });

    if (!userDetails) {
      return res.status(200).json({
         success: false,
        message: "UnAuthorized",
      });
    }
    const validate = await userDetails.isValidated(password);

    if (!validate) {
      return res.status(200).json({
        success: false,
        message: "Enter the right credentials",
      });
    }

    let payload = {
      data: userDetails,
    };

    payload = Object.assign(payload, {
      userId: userDetails._id,
      email: userDetails.email,
    });
    const jwtToken = await jwt.sign(payload, process.env.SECRETORKEY, {
      expiresIn: "3000min",
    });
    return res.json({
      success: true,
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.registration = async (req, res, next) => {
  try {
    const body = req.body;

    console.log(req.body)


    const emailFound = await clientUser.find({ email: body.email });

    if (emailFound.length !== 0) {
      return res.status(200).json({
        success: false,
        message: "details already in use",
      });
    }

    const userDetails = await clientUser.create(body);
    let payload = {
      data: userDetails,
    };

    payload = Object.assign(payload, {
      userId: userDetails._id,
      email: userDetails.email,
    });

    const token = jwt.sign(payload, process.env.SECRETORKEY, {
      expiresIn: "3000mins",
    });

    return res.status(200).json({
      message: "User registered",
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// exports.forgotPassword = async (req, res, next) => {
//   try {
//     const email = req.body.email;
//     // send mail to confirm

//     let user = await getModel(req.originalUrl);
//     let userDetails;
//     if (user == "userAdmin") {
//       userDetails = await userAdmin.findOne({ email: email });
//     } else if (user == "CustomerUser") {
//       userDetails = await CustomerUser.findOne({ email: email });
//     } else if (user == "clientUser") {
//       userDetails = await clientUser.findOne({ email: email });
//     }
//     if (!userDetails) {
//       return res.status(401).json({
//         status: 401,
//         message: "UnAuthorized",
//       });
//     }
//     const token = await generateCode();
//     await codeModel.create({ email, token });
//     sendMail({
//       to: "email",
//       subject: "Forgot Password",
//       html: `dear ${userDetails.firstName} your account has been added \n
//             click <a Enter the code ${token} to verify your account`,
//     });
//     return res.status(200).json({
//       success: true,
//       code: token,
//       message: "email sent",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
