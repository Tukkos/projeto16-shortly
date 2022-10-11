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

    try {
        if (isRepeated === false) {
            return res.status(401).send("Usuário não encontrado, login ou senha incorretos");
        };

        const user = await connection.query(`
            SELECT *
            FROM users
            WHERE email = $1
            `, [email]
        );

        if (user && bcrypt.compareSync(password, user.rows[0].passwordHash)) {
            const token = uuid();

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