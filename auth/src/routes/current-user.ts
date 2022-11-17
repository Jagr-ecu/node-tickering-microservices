import express from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    //el middleware si no encuetra sesion entonces envia undefined, por eso se pone || null
    //en caso de que sea undefined se lo transforma a null
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };