const express = require('express')
const { uploadGold } = require('../controller/gold')


const router = express.Router()

router.route('/create-gold').post(uploadGold)


module.exports = {router}


