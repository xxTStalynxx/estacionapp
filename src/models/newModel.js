const pool = require('../database');

class Noticia {
    static async getNews(num_pagina, size) {
        const query = "SELECT id_noticia, titulo, imagen, EXTRACT(YEAR FROM fecha) AS anio, to_char(fecha, 'MONTH') AS mes, EXTRACT(DAY FROM fecha) AS dia FROM noticias ORDER BY fecha DESC LIMIT " + size + "OFFSET " + (num_pagina - 1) * size;
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getRecentNews() {
        const query = "SELECT id_noticia, titulo, imagen, EXTRACT(YEAR FROM fecha) AS anio, to_char(fecha, 'MONTH') AS mes, EXTRACT(DAY FROM fecha) AS dia FROM noticias ORDER BY fecha DESC LIMIT 5 OFFSET 0";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getMainNews() {
        const query = "SELECT id_noticia, titulo, imagen FROM noticias ORDER BY fecha DESC LIMIT 2 OFFSET 0";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getTotalNews() {
        const query = "SELECT COUNT(id_noticia) AS total FROM noticias";
        const { rows } = await pool.query(query);
        return rows[0].total;
    }

    static async getNew(id_noticia) {
        const query = "SELECT id_noticia, titulo, contenido, imagen, EXTRACT(YEAR FROM fecha) AS anio, to_char(fecha, 'MONTH') AS mes, EXTRACT(DAY FROM fecha) AS dia FROM noticias WHERE id_noticia = $1";
        const values = [id_noticia];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async saveNew(newNew) {
        const { titulo, contenido, imagen } = newNew;
        const query = "INSERT INTO noticias (titulo, contenido, imagen) VALUES ($1, $2, $3)";
        const values = [titulo, contenido, imagen];
        await pool.query(query, values);
    }

    static async updateNew(id_noticia, newNew) {
        const { titulo, contenido, imagen } = newNew;
        const query = "UPDATE noticias SET titulo = $1, contenido = $2, imagen = $3 WHERE id_noticia = $4";
        const values = [titulo, contenido, imagen, id_noticia];
        await pool.query(query, values);
    }

    static async updateNewWithoutImage(id_noticia, newNew) {
        const { titulo, contenido } = newNew;
        const query = "UPDATE noticias SET titulo = $1, contenido = $2 WHERE id_noticia = $3";
        const values = [titulo, contenido, id_noticia];
        await pool.query(query, values);
    }

    static async deleteNew(id_noticia) {
        const query = "DELETE FROM noticias WHERE id_noticia = $1";
        const values = [id_noticia];
        await pool.query(query, values);
    }
}

module.exports = Noticia;