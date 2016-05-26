'use strict';

const fs = require('fs');
const https = require('https');

module.exports = app => {
    if(process.env.NODE_ENV !== 'test') {
        const credentials = {
            key: fs.readFileSync('53817531-nodeapi.key', 'utf8'),
            cert: fs.readFileSync('53817531-nodeapi.cert', 'utf8')
        };
        app.db.sequelize.sync().done(() => {
            app
            //https.createServer(credentials, app)
                .listen(app.get('port'), () => {
                    console.log(`NodeJS API - Port: ${app.get('port')}`);
                });    
        });
    };
};
