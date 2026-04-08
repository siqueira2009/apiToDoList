const taskController = require('../controllers/taskController');

module.exports = (req, res) => {

    const url = req.url;
    const method = req.method;

    // GET /tasks
    if (url == '/tasks' && method == 'GET') {
        return taskController.listTasks(req, res);
    }

    // POST /tasks
    if (url == '/tasks' && method == 'POST') {
        return taskController.createTask(req, res);
    }

    // GET /tasks/:id
    if (url.startsWith('/tasks') && method == 'GET') {
        return taskController.listTask(req, res);
    }

    // PUT /tasks/:id
    if (url.startsWith('/tasks/') && method == 'PUT') {
        const id = url.split('/')[2];
        return taskController.updateTask(req, res, id);
    }

    // DELETE /tasks/:id
    if (url.startsWith('/tasks/') && method == 'DELETE') {
        const id = url.split('/')[2];
        return taskController.deleteTask(req, res, id);
    }

    // Rota não encontrada
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};