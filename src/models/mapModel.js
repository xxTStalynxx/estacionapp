const pool = require('../database');

class Mapa {
    static async getMapById(id_mapa) {
        const query = "SELECT * FROM mapas WHERE id_mapa = $1";
        const values = [id_mapa];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async getMapByYear(anio, mes) {
        const query = "SELECT * FROM mapas WHERE anio = $1 AND mes = $2";
        const values = [anio, mes];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async getYear() {
        const query = "SELECT DISTINCT anio FROM mapas ORDER BY anio ASC";
        const { rows } = await pool.query(query);
        if(rows.length > 0){
            return rows[0].anio;
        } else{
            return 0;
        }
        
    }

    static async getMonth(anio) {
        const query = "SELECT mes FROM mapas WHERE anio = $1 ORDER BY num_mes ASC";
        const values = [anio];
        const { rows } = await pool.query(query, values);
        return rows[0].mes;
    }

    static async getYears(anio) {
        const query = "SELECT DISTINCT anio FROM mapas WHERE anio <> $1 ORDER BY anio ASC";
        const values = [anio];
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async getMonths(anio, mes) {
        const query = "SELECT mes FROM mapas WHERE anio = $1 AND mes <> $2 ORDER BY num_mes ASC";
        const values = [anio, mes];
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async getMonthsByYear(anio) {
        const query = "SELECT mes FROM mapas WHERE anio = $1 ORDER BY num_mes ASC";
        const values = [anio];
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async saveMap(newMap) {
        const { anio, mes, num_mes, descripcion, imagen } = newMap;
        const query = "INSERT INTO mapas (anio, mes, num_mes, descripcion, imagen) VALUES ($1, $2, $3, $4, $5)";
        const values = [anio, mes, num_mes, descripcion, imagen];
        await pool.query(query, values);
    }

    static async updateMap(id_mapa, newMap) {
        const { anio, mes, num_mes, descripcion, imagen } = newMap;
        const query = "UPDATE mapas SET anio = $1, mes = $2, num_mes = $3, descripcion = $4, imagen = $5 WHERE id_mapa = $6";
        const values = [anio, mes, num_mes, descripcion, imagen, id_mapa];
        await pool.query(query, values);
    }

    static async updateMapWithoutImage(id_mapa, newMap) {
        const { anio, mes, num_mes, descripcion } = newMap;
        const query = "UPDATE mapas SET anio= $1, mes = $2, num_mes = $3, descripcion = $4 WHERE id_mapa = $5";
        const values = [anio, mes, num_mes, descripcion, id_mapa];
        await pool.query(query, values);
    }

    static async deleteMap(id_mapa) {
        const query = "DELETE FROM mapas WHERE id_mapa = $1";
        const values = [id_mapa];
        await pool.query(query, values);
    }
}

module.exports = Mapa;