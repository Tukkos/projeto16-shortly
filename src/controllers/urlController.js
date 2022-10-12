import connection from "../database/db.js";
import { nanoid } from 'nanoid';

async function shortenUrl(req, res) {
    const { url } = req.body;
    const session = res.locals.session;

    try {
        const shortUrl = nanoid();

        await connection.query(`
            INSERT INTO urls ("userId", url, "shortUrl")
            VALUES ($1, $2, $3)
            `, [session.userId, url, shortUrl]
        );

        const body = {
            shortUrl: shortUrl
        };

        res.status(201).send(body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function getUrlById(req, res) {
    const id = req.params.id;
    try {
        const body = await connection.query(`
            SELECT
                id,
                "shortUrl",
                url
            FROM urls
            WHERE id = $1;
            `, [id]
        );

        if (body.rows[0] === undefined) {
            return res.sendStatus(404);
        };
        res.status(200).send(body.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function redirectToUrl(req, res) {
    const shortUrl = req.params.shortUrl;
    const url = res.locals.url;
    let visitCount;

    try {
        visitCount = url.visitCount;
        visitCount++;

        await connection.query(`
            UPDATE urls
            SET "visitCount" = $1
            WHERE "shortUrl" = $2;
            `, [visitCount, shortUrl]
        );

        res.redirect(url.url);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function deleteUrlById(req, res) {
    const id = req.params.id;

    try {
        await connection.query(`
            DELETE FROM urls
            WHERE id = $1
            `, [id]
        );
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { shortenUrl, getUrlById, redirectToUrl, deleteUrlById };