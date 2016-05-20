'use strict';

const jwt = require('jwt-simple');

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    
    app.post('/token', (req, res) => {
        if(req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            
            Users.findOne({where: {email: email}})
                .then(user => {
                    if(Users.isPassword(user.password, password)) {
                        const payload = {id: user.id};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);
                    };
                })
                .catch(error => res.sendStatus(401));
        } else {
            res.sendStatus(401);
        };
    });
};