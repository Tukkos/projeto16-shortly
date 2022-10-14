import connection from "../database/db.js";

async function getUsersUrls(req, res) {
    const user = res.locals.user;

    try {
        const urlsShorten = await connection.query(`
            SELECT 
                id,
                "shortUrl",
                url,
                "visitCount"
            FROM urls
            WHERE "userId" = $1;
            `, [user.id]
        );

        const userVisitCount = urlsShorten.rows.map(counts => counts.visitCount).reduce((a, b) => a + b, 0);

        const body = {
            id: user.id,
            name: user.name,
            visitCount: userVisitCount,
            shortenedUrls: urlsShorten.rows
        };

        res.status(200).send(body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function getRanking(req, res) {
    const ranking = [];

    try {
        const users = await connection.query(`
            SELECT *
            FROM users;`
        );

        for (let i = 0; i < users.rows.length; i++) {
            const urlsShorten = await connection.query(`
                SELECT 
                    id,
                    "shortUrl",
                    url,
                    "visitCount"
                FROM urls
                WHERE "userId" = $1;
                `, [users.rows[i].id]
            );

            const userVisitCount = urlsShorten.rows.map(counts => counts.visitCount).reduce((a, b) => a + b, 0);

            const body = {
                id: users.rows[i].id,
                name: users.rows[i].name,
                linksCount: urlsShorten.rows.length,
                visitCount: userVisitCount
            };
            ranking.push(body);
        };

        ranking.sort((a,b) => a.visitCount < b.visitCount ? 1 : a.visitCount > b.visitCount ? -1 : 0);
        const top10 = ranking.slice(0, 10);
        
        res.status(200).send(top10);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { getUsersUrls, getRanking };