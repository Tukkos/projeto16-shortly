import connection from "../database/db.js";


async function authValidation(req, res, next) {
    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");

    if(!token) {
        return res.status(401).send("Token inválido.");
    };

    const session = await connection.query(`
        SELECT *
        FROM sessions
        WHERE token = $1
        `, [token]
    );

    if (!session.rows[0]) {
        return res.status(401).send("Sessão não encontrada, favor relogar.");
    };

    res.locals.session = session.rows[0];
    next();
}

export { authValidation };