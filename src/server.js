import express from 'express';
import cors from 'cors';

import userRouter from './routes/authRouter.js';
import urlRouter from './routes/urlRouter.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouter);
server.use(urlRouter);

server.get('/status', (req, res) => {
    res.send('ok');
});

server.listen(4000, () => console.log("Listen on http://localhost:4000"));