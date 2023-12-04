const controller = {};
const Mantenimiento = require('../models/maintenanceModel.js');
const Admin = require('../models/adminModel.js');

controller.showMaintenance = async (req, res) => {
    let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    const maintenance = await Mantenimiento.getMaintenances();
    res.render('maintenance', { maintenance, auth, admin });
};

controller.addMaintenance = async (req, res) => {
    if (req.session.user) {
        const admin = await Admin.getAdmin(req.session.user);
        res.render('maintenanceAdd', { admin });
    } else {
        res.render('noauth', {});
    }
};

controller.saveMaintenance = async (req, res) => {
    if (req.session.user) {
        const { nombre, descripcion, detalle } = req.body;
        let newMaintenance = { nombre, descripcion, detalle };
        if (typeof req.file !== 'undefined') {
            newMaintenance = {
                nombre, descripcion, detalle,
                imagen: '/imageStorage/' + req.file.filename
            };
        }
        await Mantenimiento.saveMaintenance(newMaintenance);
        res.redirect('/mantenimiento');
    } else {
        res.render('noauth', {});
    }
};

controller.searchMaintenance = async (req, res) => {
    if (req.session.user) {
        const { id_mantenimiento } = req.params;
        const maintenance = await Mantenimiento.getMaintenance(id_mantenimiento);
        const admin = await Admin.getAdmin(req.session.user);
        res.render('maintenanceEdit', { maintenance, admin });
    } else {
        res.render('noauth', {});
    }
};

controller.editMaintenance = async (req, res) => {
    if (req.session.user) {
        const { id_mantenimiento } = req.params;
        const { nombre, descripcion, detalle } = req.body;
        let newMaintenance = { nombre, descripcion, detalle };
        if (typeof req.file !== 'undefined') {
            newMaintenance = {
                nombre, descripcion, detalle,
                imagen: '/imageStorage/' + req.file.filename
            };
            await Mantenimiento.updateMaintenance(id_mantenimiento, newMaintenance);
        } else{
            await Mantenimiento.updateMaintenanceWithoutImage(id_mantenimiento, newMaintenance);
        }
        res.redirect('/mantenimiento');
    } else {
        res.render('noauth', {});
    }
};

controller.deleteMaintenance = async (req, res) => {
    if (req.session.user) {
        const { id_mantenimiento } = req.params;
        await Mantenimiento.deleteMaintenance(id_mantenimiento);
        res.redirect('/mantenimiento');
    } else {
        res.render('noauth', {});
    }
};

module.exports = controller;