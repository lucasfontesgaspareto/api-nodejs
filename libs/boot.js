module.exports = app => {
    app.db.sequelize.sync().done(() => {
        app.listen(app.get('port'), () => {
            console.log(`NodeJS API - Port: ${app.get('port')}`);
        });    
    });
};