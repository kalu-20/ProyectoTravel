const { getPlaces, createPlace, deletePlace } = require('../models/PlaceModel');

const { publicResourceHandler, protectedResourceHandler } = require('./requestHandler');


const getPlacesController = (req, res) => {

    publicResourceHandler(res, getPlaces);
}

const createPlaceController = (req, res) => {

    protectedResourceHandler(req, res, createPlace);
}

const deletePlaceController = (req, res) => {

    req.body.placeId = req.params.id;

    protectedResourceHandler(req, res, deletePlace);
}   


module.exports = {
    getPlacesController,
    createPlaceController,
    deletePlaceController,
}
