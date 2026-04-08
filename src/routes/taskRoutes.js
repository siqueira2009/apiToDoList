// Essa arquivo é responsável por criar as rotas da API

import * as taskController from '../controllers/taskController.js'; // Importa as funções de controle

export default (req, res) => { // Exporta as 

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
        const id = url.split('/')[2]
        return taskController.listTask(req, res, id);
    }

    // PUT /tasks/:id
    if (url.startsWith('/tasks/') && method == 'PUT') {
        const id = url.split('/')[2];
        return taskController.updateTask(req, res, id);
    }

    // PUT /tasks/:id/:status
    if (url.startsWith('/tasks/') && method == "PUT") {
        const id = url.split("/")[2];
        const status = url.split("/")[3];
        return taskController.changeStatus(req, res, id, status);
    }

    // DELETE /tasks/:id
    if (url.startsWith('/tasks/') && method == 'DELETE') {
        const id = url.split('/')[2];
        return taskController.changeStatus(req, res, id);
    }

    // Rota não encontrada
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};