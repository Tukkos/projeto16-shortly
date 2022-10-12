import connection from "../database/db.js";

async function isItUrl(req, res, next) {
    const { url } = req.body;
    // const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const expression = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const regex = new RegExp(expression);

    if (url.match(regex)) {
        console.log("Url verificada");
    } else {
        return res.sendStatus(422);
    };
    next();
};

async function doesUrlExistsByShortUrl(req, res, next) {
    const shortUrl = req.params.shortUrl;

    try {
        const url = await connection.query(`
            SELECT
                url,
                "visitCount"
            FROM urls
            WHERE "shortUrl" = $1;
            `, [shortUrl]
        );
        
        if(url.rows[0] === undefined) {
            return res.sendStatus(404);
        }
        res.locals.url = url.rows[0];
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }

    
};

async function doesUrlExistsById(req, res, next) {
    const id = req.params.id;

    try {
        const url = await connection.query(`
            SELECT *
            FROM urls
            WHERE id = $1
            `, [id]
        );

        if (url.rows[0] === undefined) {
            return res.sendStatus(404);
        }
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function doesUrlMatchUser(req, res, next) {
    const id = req.params.id;
    const session = res.locals.session;

    try {
        const isItFromUser = await connection.query(`
            SELECT
                urls.id AS "urlId",
                users.name AS "userName",
                sessions.token AS "userToken"                
            FROM urls
            JOIN users
                ON urls."userId" = users.id
            JOIN sessions
                ON users.id = sessions."userId"
            WHERE urls.id = $1
            AND sessions.token = $2;
            `, [id, session.token]
        );
        if (isItFromUser.rows[0] === undefined) {
            return res.sendStatus(401);
        }
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { isItUrl, doesUrlExistsByShortUrl, doesUrlExistsById, doesUrlMatchUser };