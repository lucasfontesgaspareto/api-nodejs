module.exports = app => {
    app.listen(app.get('port'), () => {
        console.log(`NodeJS API - Port: ${app.get('port')}`);
    });
};