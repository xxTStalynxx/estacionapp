const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/imageStorage'),
    filename: (_req, file, cb) => (
        cb(null, Date.now() + '_' + file.originalname)
    )
});

const upload = multer({ 
    storage,
    limits: {fileSize: 5000000},
    fileFilter: (_req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo seleccionado debe ser una imágen");
    }
}).single('image');

//Llamando a los controladores
const homeController = require('../controllers/homeController.js');
const stationController = require('../controllers/stationController.js');
const sensorController = require('../controllers/sensorController.js');
const teamController = require('../controllers/teamController.js');
const maintenanceController = require('../controllers/maintenanceController.js');
const loginController = require('../controllers/loginController.js');
const mapController = require('../controllers/mapController.js');
const contactController = require('../controllers/contactController.js');
const newController = require('../controllers/newController.js');
const adminController = require('../controllers/adminController.js');

//Rutas para Inicio
router.get('/inicio', homeController.showHome);

//Rutas para Login
router.get('/login', loginController.showLogin);
router.post('/login', loginController.login);
router.get('/signoff', loginController.signoff);

//Rutas para Admins
router.get('/perfil', adminController.showProfile);
router.get('/admins', adminController.showAdmins);
router.post('/admins/add', adminController.saveAdmin);
router.post('/perfil/edit', adminController.editPassword);
router.get('/admins/delete/:id_admin', adminController.deleteAdmin);

//Rutas para Estaciones
router.get('/estaciones', stationController.showStations);
router.get('/estaciones/add', stationController.addStation);
router.post('/estaciones/save', upload, stationController.saveStation);
router.get('/estaciones/:id_estacion', stationController.searchStation);
router.post('/estaciones/edit/:id_estacion', upload, stationController.editStation);
router.get('/estaciones/delete/:id_estacion', stationController.deleteStation);

//Rutas para Sensores
router.get('/sensores', sensorController.showSensors);
router.get('/sensores/add', sensorController.addSensor);
router.post('/sensores/save', upload, sensorController.saveSensor);
router.get('/sensores/:id_sensor', sensorController.searchSensor);
router.post('/sensores/edit/:id_sensor', upload, sensorController.editSensor);
router.get('/sensores/delete/:id_sensor', sensorController.deleteSensor);

//Rutas para Equipo
router.get('/equipo', teamController.showTeam);
router.get('/equipo/add', teamController.addMember);
router.post('/equipo/save', upload, teamController.saveMember);
router.get('/equipo/:id_miembro', teamController.searchMember);
router.post('/equipo/edit/:id_miembro', upload, teamController.editMember);
router.get('/equipo/delete/:id_miembro', teamController.deleteMember);

//Rutas para Mantenimiento
router.get('/mantenimiento', maintenanceController.showMaintenance);
router.get('/mantenimiento/add', maintenanceController.addMaintenance);
router.post('/mantenimiento/save', upload, maintenanceController.saveMaintenance);
router.get('/mantenimiento/:id_mantenimiento', maintenanceController.searchMaintenance);
router.post('/mantenimiento/edit/:id_mantenimiento', upload, maintenanceController.editMaintenance);
router.get('/mantenimiento/delete/:id_mantenimiento', maintenanceController.deleteMaintenance);

//Rutas para Mapas
router.get('/mapas', mapController.showMap);
router.post('/mapas', mapController.showMap);
router.get('/mapas/add', mapController.addMap);
router.post('/mapas/save', upload, mapController.saveMap);
router.get('/mapas/:id_mapa', mapController.searchMap);
router.post('/mapas/edit/:id_mapa', upload, mapController.editMap);
router.get('/mapas/delete/:id_mapa', mapController.deleteMap);
router.get('/mapas/load/:anio', mapController.loadMonths);

//Rutas para Contacto
router.get('/contacto', contactController.showContact);
router.post('/contacto', contactController.sendEmail);

//Rutas para Noticias
router.get('/noticias/:num_pagina', newController.showNews);
router.get('/noticias/view/:id_noticia', newController.viewNew);
router.get('/noticias/add/new', newController.addNew);
router.post('/noticias/save', upload, newController.saveNew);
router.get('/noticias/edit/:id_noticia', newController.searchNew);
router.post('/noticias/edit/:id_noticia', upload, newController.editNew);
router.get('/noticias/delete/:id_noticia', newController.deleteNew);

module.exports = router;