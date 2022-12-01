import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from '@jagrfortest/common'

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/singup";
import { signOutRouter } from "./routes/signout";
import { isPropertyAccessChain } from "typescript";

const app = express();
app.set('trust proxy', true);
app.use(json());
// set req.session
app.use(
    cookieSession({
        signed: false,
        //"secure: true" cookies solo van a ser compartidas cuando alguien hace una request a 
        //nuestro servidor en una conexion https no http
        secure: process.env.NODE_ENV !== 'test'
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

export { app };