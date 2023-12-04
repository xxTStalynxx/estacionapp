const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

const server = express();
const router = require('./routes/router');

// settings
server.set('port', process.env.PORT || 4000);
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

// middlewares
server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));
server.use(session({
    secret: 'ThIs Is SeCrEt',
    resave: false,
    saveUninitialized: true
}));

// routes
server.use('/', router);
server.use(express.static(path.join(__dirname, 'public')));

server.listen(server.get('port'), () =>{
    console.log('Server is running');
});