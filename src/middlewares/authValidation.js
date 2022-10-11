import joi from 'joi';
import connection from "../database/db.js";

const userSchema = joi.object({
    name: joi.string().required().max(25),
    email: joi.string().required().max(25),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

async function userSchemaValidation(req, res, next) {
    const validation = userSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };
    next();
};

async function isEmailRepeated(req, res, next) {
    const { email } = req.body;

    const user = await connection.query(`
        SELECT *
        FROM users
        WHERE email = $1
        `, [email]
    );

    if (user.rows[0] != undefined) {
        return res.sendStatus(409);
    }

    next();
};

async function doesPasswordConfirm(req, res, next) {
    const { password, confirmPassword } = req.body;

    if (password != confirmPassword) {
        return res.status(422).send("Os campos password e confirmPassword devem ser iguais.");
    };

    next();
};

export { userSchemaValidation, isEmailRepeated, doesPasswordConfirm };