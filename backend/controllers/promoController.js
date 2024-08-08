const {
    getAllPromos,
    getPromo,
    createPromo,
    editPromo,
    deletePromo,
    deletePromosByTravel,
} = require('../models/PromoModel');

const { 
    protectedResourceHandler,
    publicResourceHandler,
} = require('./requestHandler');


const getAllPromosController = (req, res) => {

    publicResourceHandler(res, getAllPromos);
}

const getPromoController = (req, res) => {

    req.body.promoId = req.params.id;

    protectedResourceHandler(req, res, getPromo);
}

const createPromoController = (req, res) => {

    protectedResourceHandler(req, res, createPromo);
}

const editPromoController = (req, res) => {

    req.body.promoId = req.params.id;

    protectedResourceHandler(req, res, editPromo);
}

const deletePromoController = (req, res) => {

    req.body.promoId = req.params.id;

    protectedResourceHandler(req, res, deletePromo);
}

const deletePromosByTravelController = (req, res) => {

    protectedResourceHandler(req, res, deletePromosByTravel);
}


module.exports = {
    getAllPromosController,
    getPromoController,
    createPromoController,
    editPromoController,
    deletePromoController,
    deletePromosByTravelController,
}
