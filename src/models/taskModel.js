// Arquivo responsável pelos modelos

// Modelo de tarefa única
const createTask = (id, title) => {
    return {
        id,
        title,
        completed: false
    };
};

// Modelo de template, que retorna 4 tarefas
const createTemplate = (id) => {
    return [
        {
            id: id,
            title: "Lavar a louça",
            completed: false
        },
        {
            id: id + 1,
            title: "Varrer a casa",
            completed: false
        },
        {
            id: id + 2,
            title: "Fazer lição de PWII",
            completed: false
        },
        {
            id: id + 3,
            title: "Ir ao médico",
            completed: false
        }
    ]
}

export {
    createTask,
    createTemplate
}