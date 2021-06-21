const clientUser = require("../models/user");

exports.fetchInfo = async (req, res) => {
  const user = await clientUser.findOne({ _id: req.user.userId });
  //   user is not found
  if (user == null) {
    return res.status(200).json({
      success: false,
    });
  }

  console.log(user);

  res.status(200).json({
    success: true,
    data: req.user,
  });
};


