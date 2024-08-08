const {
    getProfile,
    getProfileByUser,
    createProfile,
    editProfile,
    deleteProfile,
} = require('../models/ProfileModel');

const { protectedResourceHandler } = require('./requestHandler');


const getProfileController = (req, res) => {

    req.body.profileId = req.params.id;

    protectedResourceHandler(req, res, getProfile);
}

const getProfileByUserController = (req, res) => {

    protectedResourceHandler(req, res, getProfileByUser);
}

const createProfileController = (req, res) => {

    protectedResourceHandler(req, res, createProfile);
}

const editProfileController = (req, res) => {

    req.body.profileId = req.params.id;

    protectedResourceHandler(req, res, editProfile);
}

const deleteProfileController = (req, res) => {

    req.body.profileId = req.params.id;

    protectedResourceHandler(req, res, deleteProfile);
}


module.exports = {
    getProfileController,
    getProfileByUserController,
    createProfileController,
    editProfileController,
    deleteProfileController,
}
