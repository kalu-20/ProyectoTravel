const mysql = require('mysql2/promise');
const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} = process.env;


const pool = mysql
    .createPool(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);


const dbQuery = async (sql) => {

    try {
	const connection = await pool.getConnection();

	const data = await connection.query(sql);
	connection.release();

	return data;
    }
    catch (err) {
	console.log(`DB Error: ${err.message}`)
    }

}


module.exports = {
    dbQuery,
}
