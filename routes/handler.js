const express = require('express')
const { uploadGold, getOneGold, getAllGold, updateGold, deleteOneGold, deleteAllGold } = require('../controller/gold')
const { register, login } = require('../controller/user.controller')
const { isLoggin, isAdmin } = require('../middleware/authenticate')


const router = express.Router()

router.route('/create-gold').post([isLoggin], uploadGold)
router.route('/get-one-gold/:productName').get(getOneGold)
router.route('/get-all-gold').get(getAllGold)
router.route('/update-gold/:productName').patch([isLoggin, isAdmin], updateGold)
router.route('/delete-one-gold/:productName').delete([isLoggin, isAdmin], deleteOneGold)
router.route('/delete-all-gold').delete([isLoggin], deleteAllGold)
router.route('/register').post(register)
router.route('/login').post(login)









module.exports = {router}


