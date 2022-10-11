import connection from "../database/db.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

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

export { signUp };