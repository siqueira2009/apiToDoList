// Arquivo responsável pela lógica real
import fs from 'fs';
import * as taskModel from '../models/taskModel.js'; // Importa a função de criar tarefa do modelo
const jsonTaskPath = 'src/jsons/tasks.json';

// A variável 'tasks' guarda o Array de objetos presente no arquivo JSON local
// Começa vazio
var tasks;

// Tenta ler os dados do arquivo (para ver se ele existe)
try {
    // Se der certo aqui...
    tasks = JSON.parse(fs.readFileSync(jsonTaskPath, 'utf-8')); //... usamos o JSON.parse() para transformar o Array de objetos JSON em um Array de objetos formato JS
} catch (err) { // Caso dê erro, quer dizer que ele não existe
    // Nesse caso, criamos o arquivo
    fs.writeFileSync(jsonTaskPath, "[]", 'utf-8', (err) => {
        if (err) {
            console.log("Erro ao criar arquivo JSON: " + err);
        } else {
            console.log("Arquivo JSON de tarefas criado com sucesso!");
        }
    });

    tasks = JSON.parse(fs.readFileSync(jsonTaskPath, 'utf-8'));// e depois usamos o JSON.parse() para transformar o Array de objetos JSON em um Array de objetos formato JS
}

let idCounter = tasks.length; // Variável que guarda o ID da última tarefa criada (é acrescentado para cada tarefa ter um ID maior que a da anterior)

// Função que atualiza o JSON local
const updateJSON = () => {
    // Escreve o arquivo
    // Recebe os parâmetros:
    // 1. Local: ./src/jsons/tasks.json
    // 2. Conteúdo: JSON.stringify(), que transforma o Array JS em JSON. Tasks = Array, null = não substitui nada, 2 espaços entre elementos (torna legível)
    // 3. Função callback: função que roda depois que acabar a execução do writeFile()
    fs.writeFile(jsonTaskPath, JSON.stringify(tasks, null, 2), (err) => {
        if (err) console.log('Erro ao editar arquivo JSON: ' + err);
    });
};

// Listar tarefas (GET)
const getTasks = () => tasks; // Retorna o Array de tarefas

// Listar uma tarefa (GET)
const listTask = (id) => {
    const task = tasks.find(t => t.id == id); // Procura a tarefa com o id

    return task; // Retorna a tarefa
}

// Criar tarefa (POST)
const addTask = (title) => {
    const task = taskModel.createTask(idCounter++, title); // Cria uma tarefa usando a função que retorna o modelo da mesma 
    tasks.push(task); // Adiciona ao Array de tarefas
    updateJSON(); // Chama a função de atualizar o JSON local // Chama a função de atualizar o JSON local
    return task;
};

// Criar template de tarefas (POST)
const createTemplate = () => {
    const template = taskModel.createTemplate(idCounter); // Cria um template usando a função que retorna o modelo de template 
    tasks = tasks.concat(template); // Adiciona ao Array de tarefas

    updateJSON(); // Chama a função de atualizar o JSON local
    
    idCounter += 4; // Acresenta 4 na contagem de IDs, pois foram criados 4 tarefas
    return template;
};

// Atualizar tarefa (PUT)
const updateTask = (id, title) => {
    const task = tasks.find(t => t.id == id); // Procura a tarefa com o ID do parâmetro
    if (!task) return false; // Se não existir, retona nulo

    task.title = title; // Atualiza a tarefa com o novo título
    updateJSON(); // Chama a função de atualizar o JSON local
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

    updateJSON(); // Chama a função de atualizar o JSON local
    return task;
};

// Deletar tarefa (DELETE)
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id == id); // Procura a tarefa pelo ID do parâmetro
    if (index == -1) return false; // Se não existir, retorna false

    tasks.splice(index, 1); // Recorta o Array de tarefas
    updateJSON(); // Chama a função de atualizar o JSON local
    return true; // Retorna true se tiver deletado
};

// Deletar todas as tarefas (DELETE)
const deleteTasks = () => {
    tasks = []; // Faz o array ficar vazio
    updateJSON(); // Chama a função de atualizar o JSON local
    return true;
}

// Exporta as funções para ser usada no arquivo de controle
export {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    listTask,
    updateStatus,
    deleteTasks,
    createTemplate
};