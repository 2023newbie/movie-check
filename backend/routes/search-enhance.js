const express = require('express');

const searchEnhanceController = require('../controllers/search-enhance')

const router = express.Router()

router.get('/', searchEnhanceController)

module.exports = router