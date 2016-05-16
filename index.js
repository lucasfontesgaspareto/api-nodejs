'use strict'

const express = require('express');
const consign = require('consign');

let app = express();

consign()
    .include('models')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);