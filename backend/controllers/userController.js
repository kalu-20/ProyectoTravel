const jwt = require('jsonwebtoken');
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const {
    getUser,
    getUserByEmail,
    createUser,
    editUser,
    deleteUser,
} = require('../models/UserModel');

const { protectedResourceHandler } = require('./requestHandler');


const getUserController = (req, res) => {

    req.body.userId = req.params.id;

    protectedResourceHandler(req, res, getUser);
}

const registerUserController = async (req, res) => {

    try {

	const userSigned = await getUserByEmail(req);

    	if (userSigned[0]) {
	    throw new Error('Email already used.');
	}

	protectedResourceHandler(req, res, createUser);
    }
    catch (err) {
	console.log(err.message);
	return res.status(400).send({ success: false, error: err.message });
    }
}

const loginUserController = async (req, res) => {

    try {

	const user = await getUserByEmail(req);

	if (!user[0]) {
	    throw new Error('Invalid email');
	}
	if (user[0].password !== req.body.password) {
	    throw new Error('Invalid credentials');
	}

	const accessToken = jwt.sign(
	    {
		userInfo: {
		    email: req.body.email,
		    type: user[0].type,
		}
	    }, 
	    SECRET_TOKEN, 
	    { expiresIn: '5h' },
	);

	return res
	    .status(200)
	    .send({ 
		success: true, 
		data: user[0], 
		accessToken 
	    });
    }
    catch (err) {
	return res.status(400).send({ success: false, error: err.message });
    }
}

const editUserController = (req, res) => {

    req.body.userId = req.params.id;

    protectedResourceHandler(req, res, editUser);
}

const deleteUserController = (req, res) => {

    req.body.userId = req.params.id;

    protectedResourceHandler(req, res, deleteUser);
}


module.exports = {
    getUserController,
    registerUserController,
    loginUserController,
    editUserController,
    deleteUserController,
}
