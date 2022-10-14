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

export { getUsersUrls };