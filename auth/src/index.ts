import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signUpRouter } from "./routes/singUp";
import { signOutRouter } from "./routes/signOut";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Auth en Puerto 3000');
});