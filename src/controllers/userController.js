import connection from "../database/db.js";

async function getUsersUrls(req, res) {
    const session = res.locals.session;

    try {
        const user = await connection.query(`
        SELECT
            users.id,
            users.name,
            SUM("visitCount") AS "visitCount"
        FROM users
        JOIN urls
            ON users.id = urls."userId"
        WHERE users.id = $1
        GROUP BY
            users.id;
            `, [session.userId]
        );

        if(!user) {
            return res.sendStatus(404);
        };

        const urlsShorten = await connection.query(`
            SELECT 
                id,
                "shortUrl",
                url,
                "visitCount"
            FROM urls
            WHERE "userId" = $1;
            `, [session.userId]
        );

        const body = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: user.rows[0].visitCount,
            shortenedUrls: urlsShorten.rows
        };

        res.status(200).send(body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function getRanking(req, res) {
    // const ranking = [];

    try {
        // const users = await connection.query(`
        //     SELECT *
        //     FROM users;`
        // );

        // for (let i = 0; i < users.rows.length; i++) {
        //     const urlsShorten = await connection.query(`
        //         SELECT 
        //             id,
        //             "shortUrl",
        //             url,
        //             "visitCount"
        //         FROM urls
        //         WHERE "userId" = $1;
        //         `, [users.rows[i].id]
        //     );

        //     const userVisitCount = urlsShorten.rows.map(counts => counts.visitCount).reduce((a, b) => a + b, 0);

        //     const body = {
        //         id: users.rows[i].id,
        //         name: users.rows[i].name,
        //         linksCount: urlsShorten.rows.length,
        //         visitCount: userVisitCount
        //     };
        //     ranking.push(body);
        // };

        // ranking.sort((a,b) => a.visitCount < b.visitCount ? 1 : a.visitCount > b.visitCount ? -1 : 0);
        // const top10 = ranking.slice(0, 10);

        const top10 = await connection.query(`
            SELECT
                users.id,
                users.name,
                COUNT(urls.id) AS "linksCount",
                COALESCE(SUM("visitCount"), 0) AS "visitCount"
            FROM users
            LEFT JOIN urls
                ON users.id = urls."userId"
            GROUP BY
                users.id
            ORDER BY
                "visitCount" DESC
            LIMIT 10;`
        );
        
        res.status(200).send(top10.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { getUsersUrls, getRanking };