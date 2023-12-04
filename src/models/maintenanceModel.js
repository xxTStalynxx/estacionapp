const pool = require('../database');

class Mantenimiento {
    static async getMaintenances() {
        const query = "SELECT * FROM mantenimiento";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getMaintenance(id_mantenimiento) {
        const query = "SELECT * FROM mantenimiento WHERE id_mantenimiento = $1";
        const values = [id_mantenimiento];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async saveMaintenance(newMaintenance) {
        const { nombre, descripcion, detalle, imagen } = newMaintenance;
        const query = "INSERT INTO mantenimiento (nombre, descripcion, detalle, imagen) VALUES ($1, $2, $3, $4)";
        const values = [nombre, descripcion, detalle, imagen];
        await pool.query(query, values);
    }

    static async updateMaintenance(id_mantenimiento, newMaintenance) {
        const { nombre, descripcion, detalle, imagen } = newMaintenance;
        const query = "UPDATE mantenimiento SET nombre = $1, descripcion = $2, detalle = $3, imagen = $4 WHERE id_mantenimiento = $5";
        const values = [nombre, descripcion, detalle, imagen, id_mantenimiento];
        await pool.query(query, values);
    }

    static async updateMaintenanceWithoutImage(id_mantenimiento, newMaintenance) {
        const { nombre, descripcion, detalle } = newMaintenance;
        const query = "UPDATE mantenimiento SET nombre = $1, descripcion = $2, detalle = $3 WHERE id_mantenimiento = $4";
        const values = [nombre, descripcion, detalle, id_mantenimiento];
        await pool.query(query, values);
    }

    static async deleteMaintenance(id_mantenimiento) {
        const query = "DELETE FROM mantenimiento WHERE id_mantenimiento = $1";
        const values = [id_mantenimiento];
        await pool.query(query, values);
    }
}

module.exports = Mantenimiento;