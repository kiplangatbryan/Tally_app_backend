const router = require("express").Router();

const {
  createVillage,
  addParticipant,
  fetchVillages,
  editParticipant,
  setCompleted,
  popVillage,
  generate_nth_number
} = require("../controllers/village");

const { clientAuthorization } = require("../utils");

router.post("/createVillage", clientAuthorization, createVillage);
router.post("/addParticipant", clientAuthorization, addParticipant);
router.post("/removeParticipant", clientAuthorization, editParticipant);
router.post("/editParticipant", clientAuthorization, editParticipant);
router.get("/fetchVillages", clientAuthorization, fetchVillages);

router.post("/deleteVillage", clientAuthorization, popVillage);
router.post("/setCompleted", clientAuthorization, setCompleted);
router.get('/generate_nth/:villageId', clientAuthorization, generate_nth_number)


module.exports = router;
