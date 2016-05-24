module.exports = {
    database: 'nodeapi',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'nodeapi.sqlite',
        define: {
            underscored: true
        }
    },
    jwtSecret: "APP_TEST",
    jwtSession: {
        session: false
    }
};