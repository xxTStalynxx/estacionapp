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
}

module.exports = Admin;