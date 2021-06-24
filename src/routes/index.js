const router = require("express").Router();
const authRoutes = require('./auth')
const villageRoutes = require('./village')
const userRoutes = require('./user')
const { safBack, confirmation, validation} = require('../controllers/saf')

router.use(authRoutes)
router.use(villageRoutes)
router.use(userRoutes)

router.get('/', (req, res)=>{
    return res.status(200).json({
        msg: 'server is running'
    })
})

router.post('/callback', safBack)
router.post('/confirmation', confirmation)
router.post('/validation', validation)



module.exports = router