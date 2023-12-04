const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    /*host: "smtp.gmail.com",  //Configurar
    port: 465,
    secure: true,*/
    service: "gmail",
    auth: {
        user: "estalinmorocho18@gmail.com",
        pass: "jncxiuorzmeuisxh"
    }
});

module.exports = transporter;