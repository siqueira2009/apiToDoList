// Essa arquivo é responsável por criar as rotas da API

import * as taskController from '../controllers/taskController.js'; // Importa todas as funções de controle

// Exporta a função com as condições que verifica as rotas (URLs e métodos) 
export default (req, res) => {

    const url = req.url;
    const method = req.method;

    // GET /tasks = lista todas as tarefas
    if (url == '/tasks' && method == 'GET') {
        return taskController.listTasks(req, res); // Chama o controle de listar tarefas
    }

    // POST /tasks = adiciona uma tarefa
    if (url == '/tasks' && method == 'POST') {
        return taskController.createTask(req, res); // Chama o controle de criar tarefas
    }

    // POST /tasks/template = cria um template de tarefas
    if (url.startsWith('/tasks/') && method == 'POST') {
        return taskController.createTemplate(req, res); // Chama o controle de criar um template com 4 tarefas
    }

    // GET /tasks/:id = pega uma tarefa específica
    if (url.startsWith('/tasks/') && method == 'GET') {
        const id = url.split('/')[2]
        return taskController.listTask(req, res, id); // Chama o controle de listar uma tarefa
    }

    // PUT /tasks/:id ou /tasks/:id/:status = atualiza uma tarefa específica
    if (url.startsWith('/tasks/') && method == 'PUT') {
        const id = url.split('/')[2];
        const status = url.split('/')[3];

        if (status == null || status == undefined) {
            return taskController.updateTask(req, res, id); // Chama o controle de atualizar uma tarefa
        } else {
            return taskController.updateStatus(req, res, id, status); // Chama o controle de atualizar o status de uma tarefa
        }
    }

    // DELETE /tasks/:id = deleta uma tarefa específica
    if (url.startsWith('/tasks/') && method == 'DELETE') {
        const id = url.split('/')[2];
        return taskController.deleteTask(req, res, id); // Chama o controle de deletar tarefas
    }

    // DELETE /tasks = deleta todas as tarefas
    if (url.startsWith('/tasks') && method == 'DELETE') {
        return taskController.deleteTasks(req, res);
    }

    // Rota não encontrada, ou seja, nenhuma condição foi atendida
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};