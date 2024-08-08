const express = require('express');
const router = express.Router();

const {
    getAllPromosController,
    getPromoController,
    createPromoController,
    editPromoController,
    deletePromoController,
    deletePromosByTravelController,
} = require('../controllers/promoController');

const verifyAdmin = require('../middlewares/authorizeMiddleware');


router.get('/:id', getPromoController);
router.get('/', getAllPromosController);
router.post('/create', verifyAdmin, createPromoController);
router.put('/edit/:id', verifyAdmin, editPromoController);
router.delete('/delete/:id', verifyAdmin, deletePromoController);
router.delete('/delete', verifyAdmin, deletePromosByTravelController);


module.exports = router;
