const { Pool } = require('pg');
const { database } = require('./confDB');

const pool = new Pool(database); //Pool de conexiones

const conectarDB = async () => {
    try {
        await pool.connect();
        console.log("Database is connected");
    } catch (error) {
        console.error(`Connection error: ${error.message}`);
    }
};

module.exports = pool;