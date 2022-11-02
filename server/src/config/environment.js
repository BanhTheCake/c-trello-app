require('dotenv').config()

const env = {
    PORT: process.env.PORT,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
}

module.exports = env
