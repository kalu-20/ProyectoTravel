const express = require('express');
const router = express.Router();

const {
    getUserController,
    registerUserController,
    loginUserController,
    editUserController,
    deleteUserController,
} = require('../controllers/userController');

const verifyAuthUser = require('../middlewares/authMiddleware');
const verifyAdmin = require('../middlewares/authorizeMiddleware');


router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.put('/edit/:id', verifyAuthUser, editUserController);
router.delete('/delete/:id', verifyAuthUser, deleteUserController);
router.get('/:id', verifyAdmin, getUserController);


module.exports = router;
