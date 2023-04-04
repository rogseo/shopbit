require('dotenv').config();

const swell = require('swell-node').init(process.env.STORE_ID, process.env.SECRET_KEY);

module.exports = swell;
