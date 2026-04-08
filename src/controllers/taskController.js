const taskService = require('../services/taskServices');

// Função auxiliar para ler body
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            resolve(JSON.parse(body));
        });
    });
};

// Criar tarefa
const createTask = async (req, res) => {
    const body = await getRequestBody(req);

    const task = taskService.addTask(body.title);

    res.statusCode = 201;
    res.end(JSON.stringify(task));
};

// Listar tarefas
const listTasks = (req, res) => {
    const tasks = taskService.getTasks();

    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
};

// Atualizar tarefa
const updateTask = async (req, res, id) => {
    const body = await getRequestBody(req);

    const task = taskService.updateTask(id, body.title);

    if (!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Não encontrada' }
        ));
    }

    res.end(JSON.stringify(task));
};

// Deletar tarefa
const deleteTask = (req, res, id) => {
    const success = taskService.deleteTask(id);

    if (!success) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Não encontrada' }
        ));
    }

    res.end(JSON.stringify({ message: 'Removida' }));
};

// Listar 1
const listTask = (req, res, id) => {
    const task = taskService.listTask(id);

    if (!success) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Tarefa não encontrada!' }
        ));
    }

    res.end(JSON.stringify(task));
};

module.exports = {
    createTask,
    listTasks,
    updateTask,
    deleteTask
};