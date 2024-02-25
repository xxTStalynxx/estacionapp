const pool = require('../database');

class Admin {
    static async getAdmins() {
        const query = "SELECT * FROM admins";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getAdmin(id_admin) {
        const query = "SELECT * FROM admins WHERE id_admin = $1";
        const values = [id_admin];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async saveAdmin(newAdmin) {
        const { nombre, contrasena } = newAdmin;
        const query = "INSERT INTO admins (nombre, contrasena) VALUES ($1, $2)";
        const values = [nombre, contrasena];
        await pool.query(query, values);
    }

    static async updateAdmin(id_admin, contrasena) {
        const query = "UPDATE admins SET contrasena = $1 WHERE id_admin = $2";
        const values = [contrasena, id_admin];
        await pool.query(query, values);
    }

    static async deleteAdmin(id_admin) {
        const query = "DELETE FROM admins WHERE id_admin = $1";
        const values = [id_admin];
        await pool.query(query, values);
    }
}

module.exports = Admin;