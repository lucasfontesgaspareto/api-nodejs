'use strict'

const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.json({status: "nodeapi"}));

app.get('/tasks', (req, res) => {
   res.json({
       tasks: [{
           title: "Fazer compras"
       }, {
           title: "Consertar o pc"
       }]
   });
});

app.listen(PORT, () => console.log(`Connection on ${PORT}`));