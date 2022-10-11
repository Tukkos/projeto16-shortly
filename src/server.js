import express from 'express';

const server = express();
server.use(express.json());

server.get('/status', (req, res) => {
    res.send('ok');
})

server.listen(4000, () => console.log("Listen on http://localhost:4000"));