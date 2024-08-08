
const protectedResourceHandler = async (req, res, modelCallback) => {

    try {
	const data = await modelCallback(req);

	return res.status(200).send({ success: true, data });
    }
    catch (err) {
	console.log(err.message);
	return res.status(400).send({ success: false, error: err.message });
    }
}

const publicResourceHandler = async (res, modelCallback) => {

    try {
	const data = await modelCallback();

	return res.status(200).send({ success: true, data });
    }
    catch (err) {
	console.log(err.message);
	return res.status(400).send({ success: false, error: err.message });
    }
}


module.exports = {
    protectedResourceHandler,
    publicResourceHandler,
}
