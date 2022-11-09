import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";

import { ResquestValidationError } from "../errors/RequestValidationError";

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
   (req: Request, res: Response) => {
      //valida si hay errores segun validacion de body de arreglo anterior (email, password)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ResquestValidationError(errors.array());
      }

      const { email, password } = req.body;

      console.log('creando un usuario');
      throw new DatabaseConnectionError();

      res.send({
        email,
        password
      })

   }
);

export { router as signUpRouter };
