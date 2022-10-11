import express from 'express';
import { signUp } from '../controllers/authController.js';
import { doesPasswordConfirm, isEmailRepeated, userSchemaValidation } from '../middlewares/authValidation.js';

const userRouter = express.Router();

userRouter.get(
    '/signup',
    userSchemaValidation,
    isEmailRepeated,
    doesPasswordConfirm,
    signUp
);

export default userRouter;