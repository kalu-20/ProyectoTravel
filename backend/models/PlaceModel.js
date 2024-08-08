const { dbQuery } = require('../utils/dbConnection');

const { deleteStopsByPlace } = require('./StopModel');


const getPlaces = async () => {

    const sqlQuery = `
	SELECT * FROM places;
    `;

    const places = await dbQuery(sqlQuery);
    return places[0];
}

const createPlace = async (req) => {

    const sqlQuery = `
	INSERT INTO places(
	    name, 
	    address, 
	    img_url, 
	    cities_id, 
	    category
	) VALUES(
	    '${req.body.name}', 
	    '${req.body.address}', 
	    '${req.body.imgUrl}', 
	    ${req.body.cityId}, 
	    '${req.body.category}'
	);
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deletePlace = async (req) => {

    // delete the associated stops
    const deleteStops = await deleteStopsByPlace(req);

    const id = req.body.placeId;

    const sqlQuery = `
	DELETE FROM 
	places 
	WHERE id=${id};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}


module.exports = {
    getPlaces,
    createPlace,
    deletePlace,
}
