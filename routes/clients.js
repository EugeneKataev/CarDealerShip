import express from 'express';
import clients from '../data/clients.js';
import orders from '../data/orders.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(clients);
});

router.get('/:id', (req, res) => {
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (client) {
        res.json(client);
    } else {
        res.status(404).send('Client not found');
    }
});

router.post('/', (req, res) => {
    const newClient = req.body;
    newClient.id = clients.length ? clients[clients.length - 1].id + 1 : 1;
    clients.push(newClient);
    res.status(201).json(newClient);
});

router.put('/:id', (req, res) => {
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
        clients[index] = req.body;
        clients[index].id = parseInt(req.params.id);  // Ensure the ID remains unchanged
        res.json(clients[index]);
    } else {
        res.status(404).send('Client not found');
    }
});

router.get('/:id/auto', (req, res) => {
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (client) {
        res.json(client.auto);
    } else {
        res.status(404).send('Client not found');
    }
});

router.get('/:id/orders', (req, res) => {
    const clientOrders = orders.filter(o => o.clientId === parseInt(req.params.id));
    if (clientOrders.length) {
        res.json(clientOrders);
    } else {
        res.status(404).send('No orders found for this client');
    }
});

export default router;