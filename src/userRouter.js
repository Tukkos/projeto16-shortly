import express from 'express';

import { getRanking, getUsersUrls } from './controllers/userController.js';
import { authValidation } from './middlewares/authValidation.js';

const userRouter = express.Router();

userRouter.get(
    '/users/me',
    authValidation,
    getUsersUrls
);

userRouter.get(
    '/ranking',
    getRanking
);

export default userRouter;