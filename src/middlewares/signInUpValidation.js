import joi from 'joi';
import connection from "../database/db.js";

const signUpSchema = joi.object({
    name: joi.string().required().max(25),
    email: joi.string().required().max(25),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

async function signUpSchemaValidation(req, res, next) {
    const validation = signUpSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    };
    next();
};

async function isEmailRepeated(req, res, next) {
    const { email } = req.body;
    let isRepeated = false;

    const user = await connection.query(`
        SELECT *
        FROM users
        WHERE email = $1
        `, [email]
    );

    if (user.rows[0] != undefined) {
        isRepeated = true;
    };
    
    res.locals.isRepeated = isRepeated;
    res.locals.user = user;
    next();
};

async function doesPasswordConfirm(req, res, next) {
    const { password, confirmPassword } = req.body;

    if (password != confirmPassword) {
        return res.status(422).send("Os campos password e confirmPassword devem ser iguais.");
    };

    next();
};


const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

async function signInSchemaVallidation(req, res, next) {
    const validation = signInSchema.validate(req.body, {abortEarly: false});
    if(validation.error) {
        const error = validation.error.details.map(details => details.message);
        return res.status(422).send(error);
    }
    next();
};

export { signUpSchemaValidation, isEmailRepeated, doesPasswordConfirm, signInSchemaVallidation };