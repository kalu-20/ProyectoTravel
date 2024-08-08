const { getCities } = require('../models/CityModel');

const { publicResourceHandler } = require('./requestHandler');


const getCitiesController = (req, res) => {

    publicResourceHandler(res, getCities);
}


module.exports = {
    getCitiesController,
}
