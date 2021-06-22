const Village = require("../models/village");

exports.createVillage = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.user.userId);

    let data = { ...req.body, participants: [], userId: req.user.userId };

    const village = await Village.create(data);

    return res.status(200).json({
      msg: `successfully created village ${village.name}`,
    });
  } catch (err) {
    next(err);
  }
};


exports.updateVillage  = async (req, res, next)=>{
    const { villageId, data } = req.body

    try{
      const village = await Village.findOne({
        _id: villageId,
      });

      village.locality = data.locality,
      village.name  = data.name

      await village.save();

      return res.status(200).json({
        success: true,
        msg: 'village updated!'
      })
    }
    catch(err){
      next(err)
    }
  

}

exports.addParticipant = async (req, res, next) => {
  try {
    // fetch the village and update
    const { participant, villageId } = req.body;
    const village = await Village.findOne({
      _id: villageId,
    });

    const { participants } = village;

    village.participants = [participant, ...participants];

    await village.save();

    return res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.editParticipant = async (req, res, next) => {
  // give me the whole body
  try {
    // fetch the village and update
    const { participants, villageId } = req.body;
    console.log(participants, villageId);
    const village = await Village.findOne({
      _id: villageId,
    });

    if (!village) {
      console.log("no vilage was found");
    }

    village.participants = participants;

    await village.save();

    return res.status(200).json({
      msg: "successfully updated",
    });
  } catch (err) {
    next(err);
  }
};

exports.fetchVillages = async (req, res, next) => {
  try {
    const data = await Village.find({ userId: req.user.userId });

    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.generate_nth_number = async (req, res, next) => {
  const { villageId } = req.params;

  try {
    const dataObj = await Village.findOne({ _id: villageId });

    const { participants } = dataObj;

    const nth_indexes = generate_nth(participants);

    res.status(200).json({
      success: true,
      data: nth_indexes,
      village: dataObj,
    });
  } catch (err) {
    next(err);
  }
};

// nth number value generation algorithm
const generate_nth = (participants) => {
  const nth_value = Math.ceil(participants.length / 20);

  console.log(nth_value);
  let nth_no_values = [];

  for (let i = nth_value; i < participants.length; i += nth_value) {
    nth_no_values.push(i);
  }

  return nth_no_values;
};

exports.popVillage = async (req, res, next) => {
  try {
    // fetch the village and update
    const { villageId } = req.body;
    const village = await Village.deleteOne({
      _id: villageId,
    });

    console.log(village);

    return res.status(200).json({
      success: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.setCompleted = async (req, res, next) => {
  try {
    const { completed, villageId } = req.body;

    const village = await Village.findOne({ _id: villageId });

    village.completed = completed;

    await village.save();

    return res.status(200).json({
      success: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.fetchSingle = async (req, res, next) => {
  try {
    const { villageId } = req.params;

    const dataObj = await Village.findOne({ _id: villageId });

    res.status(200).json({
      success: true,
      data: dataObj,
    });
  } catch (err) {
    next(err);
  }
};
