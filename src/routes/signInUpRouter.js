import express from 'express';

import { signIn, signUp } from '../controllers/signInUpController.js';
import { doesPasswordConfirm, isEmailRepeated, signInSchemaVallidation, signUpSchemaValidation } from '../middlewares/signInUpValidation.js';

const signInUpRouter = express.Router();

signInUpRouter.post(
    '/signup',
    signUpSchemaValidation,
    isEmailRepeated,
    doesPasswordConfirm,
    signUp
);

signInUpRouter.post(
    '/signin',
    signInSchemaVallidation,
    isEmailRepeated,
    signIn
);

export default signInUpRouter;