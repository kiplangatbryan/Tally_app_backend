const router = require("express").Router();
const authRoutes = require('./auth')
const villageRoutes = require('./village')
const userRoutes = require('./user')


router.use(authRoutes)
router.use(villageRoutes)
router.use(userRoutes)




module.exports = router