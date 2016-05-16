module.exports = app => {
    let tasks = app.models.tasks;
    console.log(tasks);
    app.get('/tasks', (req, res) => {
        tasks.findAll({}, (tasks) => {
           res.json({tasks: tasks}); 
        });
    });
};