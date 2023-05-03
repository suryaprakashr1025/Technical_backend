const express = require('express')
const {createAdmin,loginAdmin} = require("../controller/adminController")
const router = express.Router()


router.post("/createAdmin",createAdmin)
router.post("/loginAdmin",loginAdmin)

module.exports = router