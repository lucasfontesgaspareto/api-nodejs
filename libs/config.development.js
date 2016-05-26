'use strict';

const logger = require('./logger.js');

module.exports = {
    database: 'nodeapi',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'nodeapi.sqlite',
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: "APP_TEST",
    jwtSession: {
        session: false
    }
};
