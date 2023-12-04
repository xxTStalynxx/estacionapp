const pool = require('../database');

class Sensor {
    static async getSensors() {
        const query = "SELECT * FROM sensores";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getSensor(id_sensor) {
        const query = "SELECT * FROM sensores WHERE id_sensor = $1";
        const values = [id_sensor];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async saveSensor(newSensor) {
        const { nombre, descripcion, imagen } = newSensor;
        const query = "INSERT INTO sensores (nombre, descripcion, imagen) VALUES ($1, $2, $3)";
        const values = [nombre, descripcion, imagen];
        await pool.query(query, values);
    }

    static async updateSensor(id_sensor, newSensor) {
        const { nombre, descripcion, imagen } = newSensor;
        const query = "UPDATE sensores SET nombre = $1, descripcion = $2, imagen = $3 WHERE id_sensor = $4";
        const values = [nombre, descripcion, imagen, id_sensor];
        await pool.query(query, values);
    }

    static async updateSensorWithoutImage(id_sensor, newSensor) {
        const { nombre, descripcion } = newSensor;
        const query = "UPDATE sensores SET nombre = $1, descripcion = $2 WHERE id_sensor = $3";
        const values = [nombre, descripcion, id_sensor];
        await pool.query(query, values);
    }

    static async deleteSensor(id_sensor) {
        const query = "DELETE FROM sensores WHERE id_sensor = $1";
        const values = [id_sensor];
        await pool.query(query, values);
    }
}

module.exports = Sensor;