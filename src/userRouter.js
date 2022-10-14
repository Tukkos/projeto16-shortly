import express from 'express';

import { getRanking, getUsersUrls } from './controllers/userController.js';
import { authValidation } from './middlewares/authValidation.js';
import { getUsersById } from './middlewares/userVallidation.js';

const userRouter = express.Router();

userRouter.get(
    '/users/me',
    authValidation,
    getUsersById,
    getUsersUrls
);

userRouter.get(
    '/rankings',
    getRanking
);

export default userRouter;