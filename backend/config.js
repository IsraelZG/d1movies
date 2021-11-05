const dotenv = require('dotenv');
dotenv.config({ path: '../env/.env' });
module.exports = {
    port: process.env.SERVER_PORT,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS,
    db_schema: process.env.DB_SCHEMA,
    endpoint: process.env.API_URL,
    apikey: process.env.API_KEY,
};