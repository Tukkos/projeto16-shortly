import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import signInUpRouter from './routes/signInUpRouter.js';
import urlRouter from './routes/urlRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(signInUpRouter);
server.use(urlRouter);
server.use(userRouter);

server.get('/status', (req, res) => {
    res.send('ok');
});

server.listen(4000, () => console.log("Listen on http://localhost:4000"));