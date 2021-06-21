const { clientAuthorization } = require("../utils");
const { verifyJWT } = require("../utils/verifyToken");


const router = require("express").Router();

const {
  fetchInfo,
} = require("../controllers/client");

router.get("/fetchInfo", clientAuthorization, fetchInfo);
router.get('/verifyToken', verifyJWT)

module.exports = router