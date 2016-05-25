'use strict';

const jwt = require('jwt-simple');

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    
    /**
     * @api {post} /token Token autentico
     * @apiGroup Credencial
     * @apiParam {String} email Email deusuário
     * @apiParam {String} passwod Senha de usuário
     * @apiParamExample {json} Entrada
     *      {
     *          "email": "john@connor.net",
     *          "password": "123456"
     *      }
     * @apiSuccess {String} token Token de usuário autenticação
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          "token": "xyz.abc.123.hgf"
     *      }
     * @apiErrorExample {json} Erro de autenticação
     *      HTTP/1.1 401 Unauthorized
     */
    app.post('/token', (req, res) => {
        if(req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            Users.findOne({
                where: {
                    email: email
                }
            })
                .then(user => {
                    if(Users.isPassword(user.password, password)) {
                        const payload = {
                            id: user.id
                        };
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