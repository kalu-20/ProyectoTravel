const express = require('express');
const router = express.Router();

const {
    createPassengerController,
    deletePassengerController,
} = require('../controllers/travelPassengerController');


router.post('/create', createPassengerController);
router.delete('/delete', deletePassengerController);


module.exports = router;
