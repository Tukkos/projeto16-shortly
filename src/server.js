import express from 'express';
import cors from 'cors';

import userRouter from './routes/authRouter.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouter);

server.get('/status', (req, res) => {
    res.send('ok');
});

server.listen(4000, () => console.log("Listen on http://localhost:4000"));