const express = require('express')
const { uploadGold, getOneGold, getAllGold } = require('../controller/gold')


const router = express.Router()

router.route('/create-gold').post(uploadGold)
router.route('/get-one-gold/:productName').get(getOneGold)
router.route('/get-all-gold').get(getAllGold)




module.exports = {router}


