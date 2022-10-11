import express from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { doesPasswordConfirm, isEmailRepeated, signInSchemaVallidation, signUpSchemaValidation } from '../middlewares/authValidation.js';

const userRouter = express.Router();

userRouter.get(
    '/signup',
    signUpSchemaValidation,
    isEmailRepeated,
    doesPasswordConfirm,
    signUp
);

userRouter.get(
    '/signin',
    signInSchemaVallidation,
    isEmailRepeated,
    signIn
);

export default userRouter;