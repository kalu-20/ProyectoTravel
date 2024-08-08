const { dbQuery } = require('../utils/dbConnection');


const getCities = async () => {

    const sqlQuery = `
	SELECT * FROM cities;
    `;

    const cities = await dbQuery(sqlQuery);
    return cities[0];
}

module.exports = {
    getCities,
}
