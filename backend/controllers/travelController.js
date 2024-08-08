const {
    getTravel,
    getAllTravels,
    getTravelsByPassenger,
    createTravel,
    editTravel,
    deleteTravel,
} = require('../models/TravelModel');

const { 
    protectedResourceHandler,
    publicResourceHandler,
} = require('./requestHandler');


const getTravelController = (req, res) => {

    req.body.travelId = req.params.id;

    protectedResourceHandler(req, res, getTravel);
}

const getAllTravelsController = (req, res) => {

    publicResourceHandler(res, getAllTravels);
}

const getTravelsByPassengerController = (req, res) => {

    protectedResourceHandler(req, res, getTravelsByPassenger);
}

const createTravelController = (req, res) => {

    protectedResourceHandler(req, res, createTravel);
}

const editTravelController = (req, res) => {

    req.body.travelId = req.params.id;

    protectedResourceHandler(req, res, editTravel);
}

const deleteTravelController = (req, res) => {

    req.body.travelId = req.params.id;

    protectedResourceHandler(req, res, deleteTravel);
}


module.exports = {
    getTravelController,
    getAllTravelsController,
    getTravelsByPassengerController,
    createTravelController,
    editTravelController,
    deleteTravelController,
}
