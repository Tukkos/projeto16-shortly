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

export { shortenUrl };