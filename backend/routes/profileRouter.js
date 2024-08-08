const express = require('express');
const router = express.Router();

const {
    getProfileController,
    getProfileByUserController,
    createProfileController,
    editProfileController,
    deleteProfileController,
} = require('../controllers/profileController');

const verifyAdmin = require('../middlewares/authorizeMiddleware');


router.post('/create', createProfileController);
router.post('/', getProfileByUserController);
router.put('/edit/:id', editProfileController);
router.delete('/delete/:id', deleteProfileController);
router.get('/:id', verifyAdmin, getProfileController);


module.exports = router;
