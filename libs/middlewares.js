'use strict';

const bodyParser = require('body-parser');
const multer = require('multer');

let upload = multer();

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(app.auth.initialize());
    app.use(upload.array(), (req, res, next) => {
        delete req.body.id;
        next();  
    });
};