const { dbQuery } = require('../utils/dbConnection');
const { deleteStopsByTravel } = require('./StopModel');
const { deletePromosByTravel } = require('./PromoModel');
const { deletePassengersByTravel } = require('./TravelPassengerModel');


const getTravel = async (req) => {

    const id = req.body.travelId;

    const sqlQuery = `
	SELECT 
	    travels.id AS travel_id, 
	    name, 
	    DATE_FORMAT(start_date, '%d-%m-%Y') AS start_dt, 
	    DATE_FORMAT(end_date, '%d-%m-%Y') AS end_dt, 
	    cost, 
	    promos.id AS promo_id, 
	    DATE_FORMAT(start_time, '%d-%m-%Y %H:%i:%s') AS start_tm, 
	    DATE_FORMAT(end_time, '%d-%m-%Y %H:%i:%s') AS end_tm, 
	    discount 
	FROM travels LEFT OUTER JOIN promos 
	ON travels.id = promos.travels_id 
	WHERE travels.id=${id};
    `;
    const travel = await dbQuery(sqlQuery);

    return travel[0];
}

const getAllTravels = async () => {

    const sqlQuery = `
	SELECT 
	    travels.id AS travel_id, 
	    name, 
	    DATE_FORMAT(start_date, '%d-%m-%Y') AS start_dt, 
	    DATE_FORMAT(end_date, '%d-%m-%Y') AS end_dt, 
	    cost, 
	    promos.id AS promo_id, 
	    DATE_FORMAT(start_time, '%d-%m-%Y %H:%i:%s') AS start_tm, 
	    DATE_FORMAT(end_time, '%d-%m-%Y %H:%i:%s') AS end_tm, 
	    discount 
	FROM travels LEFT OUTER JOIN promos 
	ON travels.id = promos.travels_id;
    `;
    const travels = await dbQuery(sqlQuery);

    return travels[0];
}

const getTravelsByPassenger = async (req) => {

    const passengerId = req.body.profileId;

    const sqlQuery = `
	SELECT 
	    travels.id AS travel_id, 
	    name, 
	    DATE_FORMAT(start_date, '%d-%m-%Y') AS start_dt, 
	    DATE_FORMAT(end_date, '%d-%m-%Y') AS end_dt, 
	    cost, 
	    promos.id AS promo_id, 
	    DATE_FORMAT(start_time, '%d-%m-%Y %H:%i:%s') AS start_tm, 
	    DATE_FORMAT(end_time, '%d-%m-%Y %H:%i:%s') AS end_tm, 
	    discount 
	FROM travels LEFT OUTER JOIN promos 
	ON travels.id = promos.travels_id 
	WHERE travels.id 
	IN (
	    SELECT travels_id 
	    AS id 
	    FROM travel_passenger 
	    WHERE profiles_id=${passengerId}
	);
    `;
    const travels = await dbQuery(sqlQuery);

    return travels[0];
}

/*
const getTravelsByPlace = async (req) => {

    const placeId = req.body.placeId;

    const sqlQuery = `
	SELECT 
	    id, 
	    name, 
	    DATE_FORMAT(start_date, '%d-%m-%Y') AS start_dt, 
	    DATE_FORMAT(end_date, '%d-%m-%Y') AS end_dt, 
	    cost 
	FROM travels 
	WHERE id 
	IN (
	    SELECT travels_id 
	    AS id 
	    FROM travel_place 
	    WHERE profiles_id=${placeId}
	);
    `;
    const travels = await dbQuery(sqlQuery);

    return travels[0];
}

const getTravelsByCity = async (req) => {

    const id = req.body.profileId;

    const sqlQuery = `
	SELECT 
	    id, 
	    name, 
	    DATE_FORMAT(start_date, '%d-%m-%Y') AS start_dt, 
	    DATE_FORMAT(end_date, '%d-%m-%Y') AS end_dt, 
	    cost 
	FROM travels 
	WHERE id 
	IN (
	    SELECT travels_id 
	    AS id 
	    FROM travel_passenger 
	    WHERE profiles_id=${id}
	);
    `;
    const travels = await dbQuery(sqlQuery);

    return travels[0];
}
*/
const createTravel = async (req) => {
    
    const sqlQuery = `
	INSERT INTO travels(
	    name, 
	    start_date, 
	    end_date, 
	    cost
	) VALUES(
	    '${req.body.name}',
	    STR_TO_DATE('${req.body.startDate}','%d-%m-%Y'),
	    STR_TO_DATE('${req.body.endDate}','%d-%m-%Y'),
	    ${req.body.cost}
	);
    `;
    const result = await dbQuery(sqlQuery);

    return result[0];
}

const editTravel = async (req) => {

    const id = req.body.travelId;

    const sqlQuery = `
	UPDATE travels
	SET 
	    name='${req.body.name}', 
	    start_date=STR_TO_DATE('${req.body.startDate}', '%d-%m-%Y'), 
	    end_date=STR_TO_DATE('${req.body.endDate}', '%d-%m-%Y'), 
	    cost=${req.body.cost} 
	WHERE id=${id};
    `;
    const result = await dbQuery(sqlQuery);

    return result[0];
}

const deleteTravel = async (req) => {

    // delete all the promos related to this travel
    const resultDeletePromos = await deletePromosByTravel(req);

    // delete all the stops related to this travel
    const resultDeleteStops = await deleteStopsByTravel(req);

    // delete all the travel-passenger rows related to this travel
    const resultDeletePassengers = await deletePassengersByTravel(req);


    const id = req.body.travelId;
    
    const sqlQuery = `
	DELETE FROM travels
	WHERE id=${id};
    `;
    
    const result = await dbQuery(sqlQuery);
    return result[0];
}


module.exports = {
    getTravel,
    getAllTravels,
    getTravelsByPassenger,
    createTravel,
    editTravel,
    deleteTravel,
}
