import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
   "/api/users/signin",
   [
      body("email").isEmail().withMessage("El email debe ser valido"),
      body("password").trim().notEmpty().withMessage("La contraseña es erronea"),
   ],
   validateRequest,
   async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const exisitingUser = await User.findOne({ email });
      if (!exisitingUser) {
         throw new BadRequestError("Credenciales Invalidas");
      }

      const passwordsMatch = await Password.compare(exisitingUser.password, password);
      if (!passwordsMatch) {
         throw new BadRequestError("Credenciales Invalidas");
      }

      // generar jwt
      const userJwt = jwt.sign(
         {
            id: exisitingUser.id,
            email: exisitingUser.email,
         },
         process.env.JWT_KEY!
      );

      //guardar en el objecto de la sesion
      req.session = {
         jwt: userJwt,
      };

      res.status(200).send(exisitingUser);
   }
);

export { router as signInRouter };
