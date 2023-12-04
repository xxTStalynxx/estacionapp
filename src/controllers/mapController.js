const controller = {};
const Mapa = require('../models/mapModel.js');
const Admin = require('../models/adminModel.js');
const helper = require('./helpers/helpers.js');

controller.showMap = async (req, res) => {
    let { anio, mes } = req.body;
    let auth = false;
    let admin = [], anios = [], meses = [], map = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    if (anio === undefined) {
        anio = await Mapa.getYear();
        if (anio != 0) {
            mes = await Mapa.getMonth(anio);
        }
    } 
    if (anio != 0) {
        anios = await Mapa.getYears(anio);
        meses = await Mapa.getMonths(anio, mes);
        map = await Mapa.getMapByYear(anio, mes);
    }
    res.render('map', { map, anios, meses, auth, admin });
};

controller.addMap = async (req, res) => {
    if (req.session.user) {
        const admin = await Admin.getAdmin(req.session.user);
        res.render('mapAdd', { admin, error: '' });
    } else {
        res.render('noauth', {});
    }
};

controller.saveMap = async (req, res) => {
    if (req.session.user) {
        const { anio, mes, descripcion } = req.body;
        const map = await Mapa.getMapByYear(anio, mes);
        const admin = await Admin.getAdmin(req.session.user);
        if (map !== undefined) {
            res.render('mapAdd', { admin, error: '* El mapa de ese mes y año ya existe' });
        }
        else {
            const num_mes = helper.obtenerMes(mes);
            let newMap = { anio, mes, num_mes, descripcion };
            if (typeof req.file !== 'undefined') {
                newMap = {
                    anio, mes, num_mes, descripcion,
                    imagen: '/imageStorage/' + req.file.filename
                };
            }
            await Mapa.saveMap(newMap);
            res.redirect('/mapas');
        }
    } else {
        res.render('noauth', {});
    }
};

controller.searchMap = async (req, res) => {
    if (req.session.user) {
        const { id_mapa } = req.params;
        const map = await Mapa.getMapById(id_mapa);
        const admin = await Admin.getAdmin(req.session.user);
        res.render('mapEdit', { map, admin, error: '' });
    } else {
        res.render('noauth', {});
    }
};

controller.editMap = async (req, res) => {
    if (req.session.user) {
        const { id_mapa } = req.params;
        const { anio, mes, descripcion } = req.body;
        const map = await Mapa.getMapByYear(anio, mes);
        const admin = await Admin.getAdmin(req.session.user);
        if (map !== undefined) {
            res.render('mapEdit', { admin, error: '* El mapa de ese mes y año ya existe' });
        }
        else {
            const num_mes = helper.obtenerMes(mes);
            let newMap = { anio, mes, num_mes, descripcion };
            if (typeof req.file !== 'undefined') {
                newMap = {
                    anio, mes, num_mes, descripcion,
                    imagen: '/imageStorage/' + req.file.filename
                };
                await Mapa.updateMap(id_mapa, newMap);
            } else {
                await Mapa.updateMapWithoutImage(id_mapa, newMap);
            }
            res.redirect('/mapas');
        }
    } else {
        res.render('noauth', {});
    }
};

controller.deleteMap = async (req, res) => {
    if (req.session.user) {
        const { id_mapa } = req.params;
        await Mapa.deleteMap(id_mapa);
        res.redirect('/mapas');
    } else {
        res.render('noauth', {});
    }
};

controller.loadMonths = async (req, res) => {
    const { anio } = req.params;
    const meses = await Mapa.getMonthsByYear(anio);
    res.json(meses);
};

module.exports = controller;