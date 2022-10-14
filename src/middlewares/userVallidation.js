import connection from "../database/db.js";

async function getUsersById(req, res, next) {
    const session = res.locals.session;

    try {
        const user = await connection.query(`
            SELECT *
            FROM users
            WHERE id = $1
            `, [session.userId]
        );

        if(!user) {
            return res.sendStatus(404);
        };

        res.locals.user = user.rows[0];
    } catch (error) {
        res.status(500).send(error.message);
    }
    next();
};

export { getUsersById };