import express from 'express';

import { shortenUrl } from '../controllers/urlController.js';
import { authValidation } from '../middlewares/authValidation.js';
import { isItUrl } from '../middlewares/urlVallidation.js';

const urlRouter = express.Router();

urlRouter.get(
    '/url/shorten',
    authValidation,
    isItUrl,
    shortenUrl
);

export default urlRouter;