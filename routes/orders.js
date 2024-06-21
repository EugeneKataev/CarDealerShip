import express from 'express';
import orders from '../data/orders.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(orders);
});

router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

router.post('/', (req, res) => {
    const newOrder = req.body;
    newOrder.id = orders.length ? orders[orders.length - 1].id + 1 : 1;
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

export default router;