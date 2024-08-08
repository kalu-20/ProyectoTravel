const {
    getStopsByTravel,
    createStop,
    editStop,
    deleteStop,
    deleteStopsByTravel,
} = require('../models/StopModel');

const { protectedResourceHandler } = require('./requestHandler');


const getStopsByTravelController = (req, res) => {

    protectedResourceHandler(req, res, getStopsByTravel);
}

const createStopController = (req, res) => {

    protectedResourceHandler(req, res, createStop);
}

const editStopController = (req, res) => {

    req.body.stopId = req.params.id;

    protectedResourceHandler(req, res, editStop);
}

const deleteStopController = (req, res) => {

    req.body.stopId = req.params.id;

    protectedResourceHandler(req, res, deleteStop);
}

const deleteStopsByTravelController = (req, res) => {

    protectedResourceHandler(req, res, deleteStopsByTravel);
}


module.exports = {
    getStopsByTravelController,
    createStopController,
    editStopController,
    deleteStopController,
    deleteStopsByTravelController,
}
