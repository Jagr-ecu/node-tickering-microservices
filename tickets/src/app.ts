import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from '@jagrfortest/common'

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

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
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res, next) => {
    //si la funcion no fuera async no requeriria next y solo se enviaria el error: throw new Error
    next(new NotFoundError());
});

app.use(errorHandler);

export { app };