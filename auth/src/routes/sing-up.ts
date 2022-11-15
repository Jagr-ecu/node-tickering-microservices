import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { BadRequestError } from "../errors/bad-request-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { ResquestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";

const router = express.Router();

router.get(
   "/api/users/signup",
   [
      body("email").isEmail().withMessage("Email incorrecto"),
      body("password")
         .trim()
         .isLength({ min: 4, max: 20 })
         .withMessage("La contraseña debe ser de 4 a 20 carácteres"),
   ],
   async (req: Request, res: Response) => {
      //valida si hay errores segun validacion de body de arreglo anterior (email, password)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ResquestValidationError(errors.array());
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         throw new BadRequestError('Email ya en uso');
      }

      const user = User.build({ email, password });
      await user.save();

      res.status(201).send(user);
   }
);

export { router as signUpRouter };
