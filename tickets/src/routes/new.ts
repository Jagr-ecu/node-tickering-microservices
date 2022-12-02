import { requireAuth, validateRequest } from '@jagrfortest/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('El titulo es requerido'),
    body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0')
], validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();

    res.status(201).send(ticket);
});

export { router as createTicketRouter }