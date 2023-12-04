const controller = {};
const Noticia = require('../models/newModel.js');
const Admin = require('../models/adminModel.js');

controller.showNews = async (req, res) => {
    let auth = false;
    let admin = [];
    const { num_pagina } = req.params;
    let size = 12;
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    const news = await Noticia.getNews(num_pagina, size);
    const total = await Noticia.getTotalNews();
    size = Math.ceil(total/size);
    res.render('new', { news, size, num_pagina, auth, admin });
};

controller.addNew = async (req, res) => {
    if (req.session.user) {
        const admin = await Admin.getAdmin(req.session.user);
        res.render('newAdd', { admin, error: '' });
    } else {
        res.render('noauth', {});
    }
};

controller.saveNew = async (req, res) => {
    if (req.session.user) {
        const { titulo, contenido } = req.body;
        if (contenido.length > 0) {
            let newNew = { titulo, contenido };
            if (typeof req.file !== 'undefined') {
                newNew = {
                    titulo, contenido,
                    imagen: '/imageStorage/' + req.file.filename
                };
            }
            await Noticia.saveNew(newNew);
            res.redirect('/noticias/1');
        }
        else {
            const admin = await Admin.getAdmin(req.session.user);
            res.render('newAdd', { admin, error: '* Agregue el contenido de la noticia' });
        }
    } else {
        res.render('noauth', {});
    }
};

controller.viewNew = async (req, res) => {
    let auth = false;
    let admin = [];
    const { id_noticia } = req.params;
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    }
    const _new = await Noticia.getNew(id_noticia);
    const recent_news = await Noticia.getRecentNews();
    res.render('newView', { _new, recent_news, auth, admin });
};

controller.searchNew = async (req, res) => {
    if (req.session.user) {
        const { id_noticia } = req.params;
        const _new = await Noticia.getNew(id_noticia);
        const admin = await Admin.getAdmin(req.session.user);
        res.render('newEdit', { _new, admin });
    } else {
        res.render('noauth', {});
    }
};

controller.editNew = async (req, res) => {
    if (req.session.user) {
        const { id_noticia } = req.params;
        const { titulo, contenido } = req.body;
        let newNew = { titulo, contenido };
        if (typeof req.file !== 'undefined') {
            newNew = {
                titulo, contenido,
                imagen: '/imageStorage/' + req.file.filename
            };
            await Noticia.updateNew(id_noticia, newNew);
        } else{
            await Noticia.updateNewWithoutImage(id_noticia, newNew);
        }
        res.redirect('/noticias/1');
    } else {
        res.render('noauth', {});
    }
};

controller.deleteNew = async (req, res) => {
    if (req.session.user) {
        const { id_noticia } = req.params;
        await Noticia.deleteNew(id_noticia);
        res.redirect('/noticias/1');
    } else {
        res.render('noauth', {});
    }
};

module.exports = controller;