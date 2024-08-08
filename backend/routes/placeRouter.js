const express = require('express');
const router = express.Router();

const { 
    getPlacesController,
    createPlaceController,
    deletePlaceController
} = require('../controllers/placeController');

const verifyAdmin = require('../middlewares/authorizeMiddleware');


router.get('/', getPlacesController);
router.post('/create', verifyAdmin, createPlaceController);
router.delete('/delete/:id', verifyAdmin, deletePlaceController);


module.exports = router;
