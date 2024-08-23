const express = require('express')
const { uploadGold, getOneGold } = require('../controller/gold')


const router = express.Router()

router.route('/create-gold').post(uploadGold)
router.route('/get-one-gold/:productName').get(getOneGold)



module.exports = {router}


