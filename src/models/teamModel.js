const pool = require('../database');

class Equipo {
    static async getTeam() {
        const query = "SELECT * FROM equipo ORDER BY id_miembro ASC";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getMember(id_miembro) {
        const query = "SELECT * FROM equipo WHERE id_miembro = $1";
        const values = [id_miembro];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async saveMember(newMember) {
        const { nombre, cargo, correo, foto } = newMember;
        const query = "INSERT INTO equipo (nombre, cargo, correo, foto) VALUES ($1, $2, $3, $4)";
        const values = [nombre, cargo, correo, foto];
        await pool.query(query, values);
    }

    static async updateMember(id_miembro, newMember) {
        const { nombre, cargo, correo, foto } = newMember;
        const query = "UPDATE equipo SET nombre = $1, cargo = $2, correo = $3, foto = $4 WHERE id_miembro = $5";
        const values = [nombre, cargo, correo, foto, id_miembro];
        await pool.query(query, values);
    }

    static async updateMemberWithoutImage(id_miembro, newMember) {
        const { nombre, cargo, correo } = newMember;
        const query = "UPDATE equipo SET nombre = $1, cargo = $2, correo = $3 WHERE id_miembro = $4";
        const values = [nombre, cargo, correo, id_miembro];
        await pool.query(query, values);
    }

    static async deleteMember(id_miembro) {
        const query = "DELETE FROM equipo WHERE id_miembro = $1";
        const values = [id_miembro];
        await pool.query(query, values);
    }
}

module.exports = Equipo;