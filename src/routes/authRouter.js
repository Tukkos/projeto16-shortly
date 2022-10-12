import express from 'express';

import { signIn, signUp } from '../controllers/authController.js';
import { doesPasswordConfirm, isEmailRepeated, signInSchemaVallidation, signUpSchemaValidation } from '../middlewares/signInUpValidation.js';

const userRouter = express.Router();

userRouter.post(
    '/signup',
    signUpSchemaValidation,
    isEmailRepeated,
    doesPasswordConfirm,
    signUp
);

userRouter.post(
    '/signin',
    signInSchemaVallidation,
    isEmailRepeated,
    signIn
);

export default userRouter;