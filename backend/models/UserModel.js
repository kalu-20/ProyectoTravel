const { dbQuery } = require('../utils/dbConnection');
const { deleteProfile } = require('./ProfileModel');


const getUser = async (req) => {

    const id = req.body.userId;

    const sqlQuery = `
	SELECT * 
	FROM users 
	WHERE id=${id};
    `;
    
    const user = await dbQuery(sqlQuery);
    return user[0];
}

const getUserByEmail = async (req) => {

    const email = req.body.email;

    const sqlQuery = `
	SELECT * 
	FROM users 
	WHERE email='${email}';
    `;
    
    const user = await dbQuery(sqlQuery);
    return user[0];
}

const createUser = async (req) => {

    const sqlQuery = `
	INSERT INTO users(
	    email,
	    password,
	    type
	) VALUES(
	    '${req.body.email}',
	    '${req.body.password}',
	    '${req.body.type}'
	);
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const editUser = async (req) => {

    const id = req.body.userId;

    const sqlQuery = `
	UPDATE users 
	SET
	    email='${req.body.email}',
	    password='${req.body.password}',
	    type='${req.body.type}' 
	WHERE id=${id};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}

const deleteUser = async (req) => {

    // delete the associated profile if profileId provided
    if (req.body.profileId) {
	const resultDeleteProfile = await deleteProfile(req);
    }

    const id = req.body.userId;

    const sqlQuery = `
	DELETE FROM users
	WHERE id=${id};
    `;

    const result = await dbQuery(sqlQuery);
    return result[0];
}


module.exports = {
    getUser,
    getUserByEmail,
    createUser,
    editUser,
    deleteUser,
}
