'use strict';

const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./logger.js');
const compression = require('compression');
const helmet = require('helmet');

let upload = multer();

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(morgan('common', {
       stream: {
           write: (message) => {
               logger.info(message);
           }
       } 
    }));
    app.use(cors({
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(app.auth.initialize());
    app.use(upload.array(), (req, res, next) => {
        delete req.body.id;
        next();  
    });
    app.use(express.static('public'));
};