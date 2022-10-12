import express from 'express';

import { deleteUrlById, getUrlById, redirectToUrl, shortenUrl } from '../controllers/urlController.js';
import { authValidation } from '../middlewares/authValidation.js';
import { doesUrlExistsById, doesUrlExistsByShortUrl, doesUrlMatchUser, isItUrl } from '../middlewares/urlVallidation.js';

const urlRouter = express.Router();

urlRouter.post(
    '/urls/shorten',
    authValidation,
    isItUrl,
    shortenUrl
);

urlRouter.get(
    '/urls/:id',
    getUrlById
);

urlRouter.get(
    '/urls/open/:shortUrl',
    doesUrlExistsByShortUrl,
    redirectToUrl
);

urlRouter.delete(
    '/urls/:id',
    authValidation,
    doesUrlExistsById,
    doesUrlMatchUser,
    deleteUrlById
);

export default urlRouter;