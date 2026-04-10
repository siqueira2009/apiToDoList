// Arquivo responsável pelos modelos

const createTask = (id, title) => {
    return {
        id,
        title,
        completed: false
    };
}; 

export default createTask;