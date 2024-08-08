const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const userRouter = require('./routes/userRouter');
const profileRouter = require('./routes/profileRouter');
const travelRouter = require('./routes/travelRouter');
const passengerRouter = require('./routes/travelPassengerRouter');
const stopRouter = require('./routes/stopRouter');
const promoRouter = require('./routes/promoRouter');
const cityRouter = require('./routes/cityRouter');
const placeRouter = require('./routes/placeRouter');

const verifyAuthUser = require('./middlewares/authMiddleware');

const PORT = 3000;
const corsOptions = {
    origin: /^http:\/\/(localhost|127.0.0.\d{1,3})(:\d+){0,1}$/,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(express.static(path.join(__dirname, 'dist')));


app.use(cors(corsOptions))
app.use(express.json());

app.use('/api/cities', cityRouter);
app.use('/api/places', placeRouter);
app.use('/api/users', userRouter);
app.use('/api/travels', travelRouter);
app.use('/api/stops', stopRouter);
app.use('/api/promos', promoRouter);

app.use('/api/profiles', verifyAuthUser, profileRouter);
app.use('/api/passengers', verifyAuthUser, passengerRouter);


app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}.`)
});
