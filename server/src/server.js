const express = require('express');
const cors = require('cors');

const connectDB = require('./config/connectDB');
const env = require('./config/environment');
const app = express();
const port = env.PORT;

const apiV1 = require('./routes/v1')

// connect Database
connectDB()
    .then(() => bootServer())
    .catch((err) => console.log(err));

const bootServer = () => {
    // Setup middleware
    app.use(cors({ credentials: true, origin: '*' }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // router
    app.use('/v1', apiV1)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
