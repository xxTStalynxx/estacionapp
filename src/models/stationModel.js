const pool = require('../database');

class Estacion {
    static async getStations() {
        const query = "SELECT * FROM estaciones";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getStation(id_estacion) {
        const query = "SELECT * FROM estaciones WHERE id_estacion = $1";
        const values = [id_estacion];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async saveStation(newStation) {
        const { nombre, parroquia, canton, latitud, longitud, altura, imagen } = newStation;
        const query = "INSERT INTO estaciones (nombre, parroquia, canton, latitud, longitud, altura, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7)";
        const values = [nombre, parroquia, canton, latitud, longitud, altura, imagen];
        await pool.query(query, values);
    }

    static async updateStation(id_estacion, newStation) {
        const { nombre, parroquia, canton, latitud, longitud, altura, imagen } = newStation;
        const query = "UPDATE estaciones SET nombre = $1, parroquia = $2, canton = $3, latitud = $4, longitud = $5, altura = $6, imagen = $7 WHERE id_estacion = $8";
        const values = [nombre, parroquia, canton, latitud, longitud, altura, imagen, id_estacion];
        await pool.query(query, values);
    }

    static async updateStationWithoutImage(id_estacion, newStation) {
        const { nombre, parroquia, canton, latitud, longitud, altura } = newStation;
        const query = "UPDATE estaciones SET nombre = $1, parroquia = $2, canton = $3, latitud = $4, longitud = $5, altura = $6 WHERE id_estacion = $7";
        const values = [nombre, parroquia, canton, latitud, longitud, altura, id_estacion];
        await pool.query(query, values);
    }

    static async deleteStation(id_estacion) {
        const query = "DELETE FROM estaciones WHERE id_estacion = $1";
        const values = [id_estacion];
        await pool.query(query, values);
    }
}

module.exports = Estacion;