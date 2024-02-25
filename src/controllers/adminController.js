const controller = {};
const Admin = require('../models/adminModel.js');
const bcrypt = require('bcrypt');

controller.showProfile = async (req, res) => {
    if (req.session.user) {
        const auth = true;
        const admin = await Admin.getAdmin(req.session.user);
        res.render('profile', { auth, admin, error: '' });
    } else {
        res.render('noauth', {});
    }
};

controller.showAdmins = async (req, res) => {
    if (req.session.user) {
        const auth = true;
        const admin = await Admin.getAdmin(req.session.user);
        const admins = await Admin.getAdmins();
        res.render('admins', { admins, auth, admin, error: '' });
    } else {
        res.render('noauth', {});
    }
};

controller.saveAdmin = async (req, res) => {
    if (req.session.user) {
        let { nombre, contrasena, confirma_contrasena } = req.body;
        const admin = await Admin.getAdmin(req.session.user);
        const auth = true;
        const admins = await Admin.getAdmins();
        let adminRegistrado = false;
        for (let i = 0; i < admins.length; i++){
            if (admins[i].nombre == nombre){
                adminRegistrado = true;
                i = admins.length;
            }
        }
        if (!adminRegistrado){
            if (contrasena == confirma_contrasena) {
                bcrypt.hash(contrasena, 12).then(async hash => {
                    contrasena = hash;
                    const newAdmin = { nombre, contrasena };
                    await Admin.saveAdmin(newAdmin);
                    res.redirect('/admins');
                });
            } else {
                res.render('admins', { admins, auth, admin, error: '* Las contraseñas no coinciden' });
            }
        } else {
            res.render('admins', { admins, auth, admin, error: '* El usuario ya está registrado' });
        }
    } else {
        res.render('noauth', {});
    }
};

controller.editPassword = async (req, res) => {
    if (req.session.user) {
        let { contrasena, nueva_contrasena, confirma_contrasena } = req.body;
        const admin = await Admin.getAdmin(req.session.user);
        const auth = true;
        bcrypt.compare(contrasena, admin.contrasena, (err, match) => {
            if (match || (contrasena == admin.contrasena)) {
                if (nueva_contrasena == confirma_contrasena) {
                    bcrypt.hash(nueva_contrasena, 12).then(async hash => {
                        contrasena = hash;
                        await Admin.updateAdmin(admin.id_admin, contrasena);
                        res.redirect('/perfil');
                    });
                } else {
                    res.render('profile', { auth, admin, error: '* Las contraseñas no coinciden' });
                }
            } else {
                res.render('profile', { auth, admin, error: '* La contraseña es incorrecta' });
            }
        });
    } else {
        res.render('noauth', {});
    }
};

controller.deleteAdmin = async (req, res) => {
    if (req.session.user) {
        const { id_admin } = req.params;
        await Admin.deleteAdmin(id_admin);
        res.redirect('/admins');
    } else {
        res.render('noauth', {});
    }
};

module.exports = controller;