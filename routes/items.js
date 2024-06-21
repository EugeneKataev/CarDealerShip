import express from 'express';
import items from '../data/items.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(items);
});

router.get('/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

router.post('/', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
        items[index] = req.body;
        items[index].id = parseInt(req.params.id);  // Ensure the ID remains unchanged
        res.json(items[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

router.delete('/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

export default router;