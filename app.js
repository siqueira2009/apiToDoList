const http = require('http');

const taskRoutes = require('./src/routes/taskRoutes');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    taskRoutes(req, res);
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado em localhost:${PORT}`)
})