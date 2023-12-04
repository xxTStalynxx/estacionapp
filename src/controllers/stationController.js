const controller = {};
const Estacion = require('../models/stationModel.js');
const Admin = require('../models/adminModel.js');

controller.showStations = async (req, res) => {
    let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    const stations = await Estacion.getStations();
    res.render('station', { stations, auth, admin });
};

controller.addStation = async (req, res) => {
    if (req.session.user) {
        const admin = await Admin.getAdmin(req.session.user);
        res.render('stationAdd', { admin });
    } else {
        res.render('noauth', {});
    }
};

controller.saveStation = async (req, res) => {
    if (req.session.user) {
        const { nombre, parroquia, canton, latitud, longitud, altura } = req.body;
        let newStation = { nombre, parroquia, canton, latitud, longitud, altura };
        if (typeof req.file !== 'undefined') {
            newStation = {
                nombre, parroquia, canton, latitud, longitud, altura,
                imagen: '/imageStorage/' + req.file.filename
            };
        }
        await Estacion.saveStation(newStation);
        res.redirect('/estaciones');
    } else {
        res.render('noauth', {});
    }
};

controller.searchStation = async (req, res) => {
    if (req.session.user) {
        const { id_estacion } = req.params;
        const station = await Estacion.getStation(id_estacion);
        const admin = await Admin.getAdmin(req.session.user);
        res.render('stationEdit', { station, admin });
    } else {
        res.render('noauth', {});
    }
};

controller.editStation = async (req, res) => {
    if (req.session.user) {
        const { id_estacion } = req.params;
        const { nombre, parroquia, canton, latitud, longitud, altura } = req.body;
        let newStation = { nombre, parroquia, canton, latitud, longitud, altura };
        if (typeof req.file !== 'undefined') {
            newStation = {
                nombre, parroquia, canton, latitud, longitud, altura,
                imagen: '/imageStorage/' + req.file.filename
            };
            await Estacion.updateStation(id_estacion, newStation);
        } else{
            await Estacion.updateStationWithoutImage(id_estacion, newStation);
        }
        res.redirect('/estaciones');
    } else {
        res.render('noauth', {});
    }
};

controller.deleteStation = async (req, res) => {
    if (req.session.user) {
        const { id_estacion } = req.params;
        await Estacion.deleteStation(id_estacion);
        res.redirect('/estaciones');
    } else {
        res.render('noauth', {});
    }
};

module.exports = controller;