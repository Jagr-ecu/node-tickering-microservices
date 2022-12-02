import {
   NotFoundError,
   requireAuth,
   validateRequest,
   UnauthorizedError,
} from "@jagrfortest/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/tickets";

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title').not().isEmpty().withMessage('Title es requerido'),
    body('price').isFloat({ gt: 0 }).withMessage('Price es requerido y debe ser mayor a 0'),
], async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new UnauthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    await ticket.save();

    res.send(ticket)
});

export { router as updateTicketRouter }