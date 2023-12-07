const controller = {};
const Admin = require('../models/adminModel.js');
const transporter = require('./helpers/mail.js');

controller.showContact = async (req, res) => {
    let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    res.render('contact', { auth, admin, ok: 2 });
};

controller.sendEmail = async (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    let auth = false;
    let admin = [];
    const mailOptions = {
        from: `<${nombre}> <${correo}>`,
        to: "estaciones.espoch@espoch.edu.ec",
        subject: asunto,
        text: mensaje
    };
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    let ok, message;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error !== null) {
            ok = 0;
            message = "No se ha podido enviar el correo";
        } else {
            ok = 1;
            message = "El correo ha sido enviado";
        }
        res.render('contact', { auth, admin, message, ok });
    });
};

module.exports = controller;