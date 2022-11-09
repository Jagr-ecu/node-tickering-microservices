import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signUpRouter } from "./routes/singUp";
import { signOutRouter } from "./routes/signOut";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/NotFoundError";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
    //si la funcion no fuera async no requeriria next y solo se enviaria el error: throw new Error
    next(new NotFoundError());
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Auth en Puerto 3000');
});