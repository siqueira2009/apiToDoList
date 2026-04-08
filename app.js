import http from 'http';

import taskRoutes from './src/routes/taskRoutes.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    taskRoutes(req, res);
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado em localhost:${PORT}`)
})