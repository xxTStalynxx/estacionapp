const controller = {};
const Admin = require('../models/adminModel.js');
const Noticia = require('../models/newModel.js');

controller.showHome = async (req, res) =>{
    let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    const news = await Noticia.getMainNews();
    res.render('home', { auth, admin, news });
};

module.exports = controller;