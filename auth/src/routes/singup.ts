import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken"

import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";

const router = express.Router();


router.post(
   "/api/users/signup",
   [
      body("email").isEmail().withMessage("Email incorrecto"),
      body("password")
         .trim()
         .isLength({ min: 4, max: 20 })
         .withMessage("La contraseña debe ser de 4 a 20 carácteres"),
   ],
   validateRequest,
   async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         throw new BadRequestError('Email ya en uso');
      }

      const user = User.build({ email, password });
      await user.save();

      // generar jwt
      const userJwt = jwt.sign(
         {
         id: user.id,
         email: user.email
         }, 
         process.env.JWT_KEY!
      );

      //guardar en el objecto de la sesion
      req.session = {
         jwt: userJwt
      };

      res.status(201).send(user);
   }
);

export { router as signUpRouter };
