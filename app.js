// Arquivo responsável pela inicialização da API

import http from 'http';

import taskRoutes from './src/routes/taskRoutes.js';

// Cria o servidor
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Configura o cabeçalho

    taskRoutes(req, res); // Chama as condições de rotas
});

const PORT = 3000; // Define a porta

// Faz o servidor ouvir a porta
server.listen(PORT, () => {
    console.log(`Servidor iniciado em localhost:${PORT}`)
})