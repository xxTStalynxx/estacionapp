const controller = {};
const Equipo = require('../models/teamModel.js');
const Admin = require('../models/adminModel.js');

controller.showTeam = async (req, res) => {
    let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    const team = await Equipo.getTeam();
    res.render('team', { team, auth, admin });
};

controller.addMember = async (req, res) => {
    if (req.session.user) {
        const admin = await Admin.getAdmin(req.session.user);
        res.render('teamAdd', { admin });
    } else {
        res.render('noauth', {});
    }
};

controller.saveMember = async (req, res) => {
    if (req.session.user) {
        const { nombre, cargo, correo } = req.body;
        let newMember = { nombre, cargo, correo };
        if (typeof req.file !== 'undefined') {
            newMember = {
                nombre, cargo, correo,
                foto: '/imageStorage/' + req.file.filename
            };
        }
        await Equipo.saveMember(newMember);
        res.redirect('/equipo');
    } else {
        res.render('noauth', {});
    }
};

controller.searchMember = async (req, res) => {
    if (req.session.user) {
        const { id_miembro } = req.params;
        const member = await Equipo.getMember(id_miembro);
        const admin = await Admin.getAdmin(req.session.user);
        res.render('teamEdit', { member, admin });
    } else {
        res.render('noauth', {});
    }
};

controller.editMember = async (req, res) => {
    if (req.session.user) {
        const { id_miembro } = req.params;
        const { nombre, cargo, correo } = req.body;
        let newMember = { nombre, cargo, correo };
        if (typeof req.file !== 'undefined') {
            newMember = {
                nombre, cargo, correo,
                foto: '/imageStorage/' + req.file.filename
            };
            await Equipo.updateMember(id_miembro, newMember);
        } else{
            await Equipo.updateMemberWithoutImage(id_miembro, newMember);
        }
        res.redirect('/equipo');
    } else {
        res.render('noauth', {});
    }
};

controller.deleteMember = async (req, res) => {
    if (req.session.user) {
        const { id_miembro } = req.params;
        await Equipo.deleteMember(id_miembro);
        res.redirect('/equipo');
    } else {
        res.render('noauth', {});
    }
};

module.exports = controller;