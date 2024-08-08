const { dbQuery } = require('../utils/dbConnection');
const { deletePassengersByProfile } = require('./TravelPassengerModel');


const getProfile = async (req) => {

    const id = req.body.profileId;

    const sqlQuery = `
	SELECT * 
	FROM profiles 
	WHERE id=${id};
    `;

    const profile = await dbQuery(sqlQuery);
    return profile[0];
}

const getProfileByUser = async (req) => {

    const userEmail = req.body.email;

    const sqlQuery = `
	SELECT * 
	FROM profiles 
	WHERE users_id=(
	    SELECT id 
	    FROM users 
	    WHERE email='${userEmail}'
	);
    `;

    const profile = await dbQuery(sqlQuery);
    return profile[0];
}

const createProfile = async (req) => {

    const sqlQuery = `
	INSERT INTO profiles(
	    name,
	    dni,
	    phone,
	    users_id,
	    cities_id 
	) VALUES(
	    '${req.body.name}',
	    '${req.body.dni}',
	    '${req.body.phone}',
	    ${req.body.userId},
	    ${req.body.cityId}
	);
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const editProfile = async (req) => {

    const id = req.body.profileId;

    const sqlQuery = `
	UPDATE profiles 
	SET 
	    name='${req.body.name}',
	    dni='${req.body.dni}',
	    phone='${req.body.phone}',
	    users_id=${req.body.userId},
	    cities_id=${req.body.cityId} 
	WHERE id=${id};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deleteProfile = async (req) => {

    // delete all the travel_passenger related to this profile
    const resultDeletePassengers = await deletePassengersByProfile(req);

    const id = req.body.profileId;

    const sqlQuery = `
	DELETE FROM profiles 
	WHERE id=${id};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}


module.exports = {
    getProfile,
    getProfileByUser,
    createProfile,
    editProfile,
    deleteProfile,
}
