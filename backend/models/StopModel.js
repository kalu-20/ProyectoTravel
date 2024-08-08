const { dbQuery } = require('../utils/dbConnection');


const getStopsByTravel = async (req) => {

    const travelId = req.body.travelId;

    const sqlQuery = `
	SELECT * 
	FROM stops 
	WHERE travels_id=${travelId};
    `;

    const stops = await dbQuery(sqlQuery);
    return stops[0];
}

const createStop = async (req) => {

    const sqlQuery = `
	INSERT INTO 
	stops(
	    stop_order, 
	    days, 
	    travels_id, 
	    cities_id, 
	    places_id
	)
	VALUES(
	    ${req.body.stopOrder}, 
	    ${req.body.days}, 
	    ${req.body.travelId}, 
	    ${req.body.cityId}, 
	    ${req.body.placeId}
	);
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const editStop = async (req) => {

    const id = req.body.stopId;

    const sqlQuery = `
	UPDATE stops 
	SET 
	stop_order=${req.body.stopOrder}, 
	days =${req.body.days}, 
	cities_id =${req.body.cityId}, 
	places_id=${req.body.placeId} 
	WHERE id=${id};
    `;
    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deleteStop = async (req) => {

    const id = req.body.stopId;

    const sqlQuery = `
	DELETE 
	FROM stops 
	WHERE id=${id};
    `;
    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deleteStopsByTravel = async (req) => {

    const travelId = req.body.travelId;

    const sqlQuery = `
	DELETE 
	FROM stops 
	WHERE travels_id=${travelId};
    `;
    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deleteStopsByPlace = async (req) => {

    const placeId = req.body.placeId;

    const sqlQuery = `
	DELETE FROM 
	places 
	WHERE id=${placeId};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}


module.exports = {
    getStopsByTravel,
    createStop,
    editStop,
    deleteStop,
    deleteStopsByTravel,
    deleteStopsByPlace,
}
