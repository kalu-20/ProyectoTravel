const jwt = require('jsonwebtoken');
const SECRET_TOKEN = process.env.SECRET_TOKEN;


const verifyAdmin = async (req, res, next) => {

    try {

	const authHeader = req.headers.Authorization || req.headers.authorization;

	if (!authHeader?.startsWith('Bearer ')) {
	    throw new Error('Invalid token');
	}

	const token = authHeader.split(' ')[1];
	const { userInfo } = jwt.verify(token, SECRET_TOKEN);

	if (userInfo.type !== 'admin') {
	    throw new Error('Unauthorized');
	}

	next();
    }
    catch (err) {
	res.status(400).send({ success: false, error: err.message });
	next(err);
    }
}


module.exports = verifyAdmin;
