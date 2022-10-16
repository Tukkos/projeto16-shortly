import express from 'express';
import cors from 'cors';

import signInUpRouter from './routes/signInUpRouter.js';
import urlRouter from './routes/urlRouter.js';
import userRouter from './routes/userRouter.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(signInUpRouter);
server.use(urlRouter);
server.use(userRouter);

server.get('/status', (req, res) => {
    res.send('ok');
});

server.listen(4000, () => console.log("Server running on port " + process.env.PORT));