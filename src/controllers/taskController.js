// Arquivo responsável por controlar o que cada rota faz
// Tem as funções que são chamadas em cada rota

import * as taskService from '../services/taskServices.js' // Importa as funções responsáveis pelos serviços 

// Função para ler body
// Ela faz com que body, que chega em 'chunks', seja construído de parte em parte que chega
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

// Listar tarefas (GET)
const listTasks = (req, res) => {
    const tasks = taskService.getTasks(); // Chama o serviço de listar tarefas

    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
};

// Listar uma tarefa (GET)
const listTask = (req, res, id) => {
    const task = taskService.listTask(id); // Chama o serviço de listar uma tarefa

    // Caso retorne false, mostra que a tarefa não foi encontrada
    if (!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Tarefa não encontrada!' }
        ));
    }

    res.end(JSON.stringify(task));
};

// Controle de criar tarefa (POST)
const createTask = async (req, res) => {
    const body = await getRequestBody(req);

    const task = taskService.addTask(body.title); // Chama o serviço de adicionar tarefa

    res.statusCode = 201;
    res.end(JSON.stringify(task));
};

// Criar um template com várias tarefas (POST)
const createTemplate = async (req, res) => {
    const template = taskService.createTemplate(); // Chama o serviço de criar templates

    res.statusCode = 201;
    res.end(JSON.stringify(template));
}

// Atualizar tarefa (PUT)
const updateTask = async (req, res, id) => {
    const body = await getRequestBody(req);

    const task = taskService.updateTask(id, body.title); // Chama o serviço de atualizar tarefas

    // Caso retorne false, mostra que a tarefa não foi encontrada
    if (!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Não encontrada' }
        ));
    }

    res.end(JSON.stringify(task));
};

// Atualizar status de tarefa (PUT)
const updateStatus = async (req, res, id, status) => {
    const task = taskService.updateStatus(id, status); // Chama o serviço de atualizar status de tarefas

    // Caso retorne false, mostra que a tarefa não foi encontrada
    if (!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Não encontrada' }
        ));
    }

    res.end(JSON.stringify(task));
};

// Deletar tarefa (DELETE)
const deleteTask = (req, res, id) => {
    const success = taskService.deleteTask(id); // Chama o serviço de deletar tarefas

    // Caso retorne false, mostra que a tarefa não foi encontrada
    if (!success) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Não encontrada' }
        ));
    }

    res.end(JSON.stringify({ message: `Tarefa com id ${id} removida com sucesso!` }));
};

// Deletar todas as tarefas (DELETE)
const deleteTasks = (req, res) => {
    const success = taskService.deleteTasks(); // Chama o serviço de deletar todas as tarefas

        // Caso retorne false, mostra que ocorreu um erro
    if (!success) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Ocorreu um erro!' }
        ));
    }

    res.end(JSON.stringify({ message: 'Todas as tarefas foram removidas com sucesso!' }));
}

// Exporta todas as funções de controle para que possa ser usado no arquivo de rotas
export {
    listTasks,
    listTask,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
    deleteTasks,
    createTemplate
};