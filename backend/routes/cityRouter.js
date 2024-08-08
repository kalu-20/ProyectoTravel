const express = require('express');
const router = express.Router();

const { getCitiesController } = require('../controllers/cityController');


router.get('/', getCitiesController);


module.exports = router;
