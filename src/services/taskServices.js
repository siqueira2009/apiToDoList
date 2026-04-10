// Arquivo responsável pela lógica real

import createTask from '../models/taskModel.js'; // Importa a função de criar tarefa do modelo

let tasks = []; // Array que guarda as tarefas
let idCounter = 0; // Variável que guarda o ID da última tarefa criada (é acrescentado para cada tarefa ter um ID maior que a da anterior)

// Listar tarefas (GET)
const getTasks = () => tasks; // Retorna o Array de tarefas

// Listar uma tarefa (GET)
const listTask = (id) => {
    const task = tasks.find(t => t.id == id); // Procura a tarefa com o id

    return task; // Retorna a tarefa
}

// Criar tarefa (POST)
const addTask = (title) => {
    const task = createTask(idCounter++, title); // Cria uma tarefa usando a função que retorna o modelo da mesma 
    tasks.push(task); // Adiciona ao Array de tarefas
    return task;
};

// Atualizar tarefa (PUT)
const updateTask = (id, title) => {
    const task = tasks.find(t => t.id == id); // Procura a tarefa com o ID do parâmetro
    if (!task) return false; // Se não existir, retona nulo

    task.title = title; // Atualiza a tarefa com o novo título
    return task;
};

// Atualizar status da tarefa (PUT)
const updateStatus = (id, status) => {
    const task = tasks.find(t => t.id == id); // Procura a tarefa com o ID do parâmetro
    if (!task) return false; // Se não existir, retona nulo

    if (status == 0) {
        task.completed = false;
    } else if (status == 1) {
        task.completed = true;
    } else {
        return false;
    }

    return task;
};

// Deletar tarefa (DELETE)
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id == id); // Procura a tarefa pelo ID do parâmetro
    if (index == -1) return false; // Se não existir, retorna false

    tasks.splice(index, 1); // Recorta o Array de tarefas
    return true; // Retorna true se tiver deletado
};

// Exporta as funções para ser usada no arquivo de controle
export {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    listTask,
    updateStatus,
};