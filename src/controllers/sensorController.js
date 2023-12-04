const controller = {};
const Sensor = require('../models/sensorModel.js');
const Admin = require('../models/adminModel.js');

controller.showSensors = async (req, res) => {
    let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    const sensors = await Sensor.getSensors();
    res.render('sensor', { sensors, auth, admin });
};

controller.addSensor = async (req, res) => {
    if (req.session.user) {
        const admin = await Admin.getAdmin(req.session.user);
        res.render('sensorAdd', { admin });
    } else {
        res.render('noauth', {});
    }
};

controller.saveSensor = async (req, res) => {
    if (req.session.user) {
        const { nombre, descripcion } = req.body;
        let newSensor = { nombre, descripcion };
        if (typeof req.file !== 'undefined') {
            newSensor = {
                nombre, descripcion,
                imagen: '/imageStorage/' + req.file.filename
            };
        }
        await Sensor.saveSensor(newSensor);
        res.redirect('/sensores');
    } else {
        res.render('noauth', {});
    }
};

controller.searchSensor = async (req, res) => {
    if (req.session.user) {
        const { id_sensor } = req.params;
        const sensor = await Sensor.getSensor(id_sensor);
        const admin = await Admin.getAdmin(req.session.user);
        res.render('sensorEdit', { sensor, admin });
    } else {
        res.render('noauth', {});
    }
};

controller.editSensor = async (req, res) => {
    if (req.session.user) {
        const { id_sensor } = req.params;
        const { nombre, descripcion } = req.body;
        let newSensor = { nombre, descripcion };
        if (typeof req.file !== 'undefined') {
            newSensor = {
                nombre, descripcion,
                imagen: '/imageStorage/' + req.file.filename
            };
            await Sensor.updateSensor(id_sensor, newSensor);
        } else{
            await Sensor.updateSensorWithoutImage(id_sensor, newSensor);
        }
        res.redirect('/sensores');
    } else {
        res.render('noauth', {});
    }
};

controller.deleteSensor = async (req, res) => {
    if (req.session.user) {
        const { id_sensor } = req.params;
        await Sensor.deleteSensor(id_sensor);
        res.redirect('/sensores');
    } else {
        res.render('noauth', {});
    }
};

module.exports = controller;