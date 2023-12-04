const controller = {};
const pool = require('../database');
const bcrypt = require('bcrypt');

controller.showLogin = async (req, res) => {
    if (req.session.user) {
        res.redirect('/inicio');
    } else {
        res.render('login', { error: '' });
    }
};

controller.login = async (req, res) => {
    const { nombre, contrasena } = req.body;
    const query = "SELECT * FROM admins WHERE nombre = $1";
    const values = [nombre];
    const { rows } = await pool.query(query, values);
    const admin = rows;
    if (admin.length > 0) {
        bcrypt.compare(contrasena, admin[0].contrasena, (err, match) => {
            if (match || (contrasena == admin[0].contrasena)) {
                req.session.regenerate(function (err) {
                    req.session.user = admin[0].id_admin;
                    req.session.save(function (err) {
                        res.redirect('/inicio');
                    })
                });
            } else {
                res.render('login', { error: '* La contraseña es incorrecta' });
            }
        });
    } else {
        res.render('login', { error: '* El usuario no está registrado' });
    }
};

controller.signoff = async (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            res.redirect('/login');
        });
    } else {
        res.render('login', { error: '' });
    }
};

module.exports = controller;