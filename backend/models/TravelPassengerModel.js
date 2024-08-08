const { dbQuery } = require('../utils/dbConnection');


const createPassenger = async (req) => {

    const sqlQuery = `
	INSERT INTO travel_passenger(
	    travels_id,
	    profiles_id
	) VALUES(
	    ${req.body.travelId},
	    ${req.body.profileId}
	);
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deletePassenger = async (req) => {

    const profileId = req.body.profileId;
    const travelId = req.body.travelId;

    const sqlQuery = `
	DELETE FROM travel_passenger 
	WHERE profiles_id=${profileId} 
	AND travels_id=${travelId};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deletePassengersByProfile = async (req) => {

    const profileId = req.body.profileId;

    const sqlQuery = `
	DELETE FROM travel_passenger 
	WHERE profiles_id=${profileId};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deletePassengersByTravel = async (req) => {

    const travelId = req.body.travelId;

    const sqlQuery = `
	DELETE FROM travel_passenger 
	WHERE travels_id=${travelId};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}


module.exports = {
    createPassenger,
    deletePassenger,
    deletePassengersByProfile,
    deletePassengersByTravel,
}
