import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/singup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
    //si la funcion no fuera async no requeriria next y solo se enviaria el error: throw new Error
    next(new NotFoundError());
});

app.use(errorHandler);

const start = async () => {
    if(!process.env.JWY_KEY){
        throw new Error('JWT_KEY debe ser definido');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('conectando a mongo db');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log('Auth en puerto 3000');
    });
};

start();