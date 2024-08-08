const {
    createPassenger,
    deletePassenger,
} = require('../models/TravelPassengerModel');

const { protectedResourceHandler } = require('./requestHandler');


const createPassengerController = (req, res) => {

    protectedResourceHandler(req, res, createPassenger);
}

const deletePassengerController = (req, res) => {

    protectedResourceHandler(req, res, deletePassenger);
}


module.exports = {
    createPassengerController,
    deletePassengerController,
}
