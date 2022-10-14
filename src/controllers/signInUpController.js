import connection from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

async function signUp(req, res) {
    const { name, email, password } = req.body;
    const isRepeated = res.locals.isRepeated;

    if (isRepeated === true) {
        return res.sendStatus(409);
    };

    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        await connection.query(`
            INSERT INTO users (name, email, "passwordHash")
            VALUES ($1, $2, $3);
            `, [name, email, passwordHash]
        );
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function signIn(req, res) {
    const { email, password } = req.body;
    const isRepeated = res.locals.isRepeated;
    const user = res.locals.user.rows[0];

    try {
        if (isRepeated === false) {
            return res.status(401).send("Usuário não encontrado, login ou senha incorretos");
        };

        if (user.email != email) {
            return res.status(401).send("Usuário não encontrado, login ou senha incorretos");
        };

        if (user && bcrypt.compareSync(password, user.passwordHash)) {
            const token = uuid();

            const session = await connection.query(`
                SELECT *
                FROM sessions
                WHERE "userId" = $1
                `, [user.id]
            );

            if (!session.rows[0]) {
                await connection.query(`
                    INSERT INTO sessions ("userId", token)
                    VALUES ($1, $2);
                    `, [user.id, token]
                );
            } else {
                await connection.query(`
                    UPDATE sessions
                    SET token = $1,
                        "createdAt" = NOW()
                    WHERE "userId" = $2
                    `, [token, user.id]
                )
            };            

            const body = {
                token: token
            }
            
            res.status(200).send(body);
        } else {
            res.status(401).send("Usuário não encontrado, login ou senha incorretos");
        };
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { signUp, signIn };