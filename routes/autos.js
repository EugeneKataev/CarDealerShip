import express from 'express';
import autos from '../data/autos.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(autos);
});

router.get('/:id', (req, res) => {
    const auto = autos.find(a => a.id === parseInt(req.params.id));
    if (auto) {
        res.json(auto);
    } else {
        res.status(404).send('Auto not found');
    }
});

router.post('/', (req, res) => {
    const newAuto = req.body;
    newAuto.id = autos.length ? autos[autos.length - 1].id + 1 : 1;
    autos.push(newAuto);
    res.status(201).json(newAuto);
});

router.put('/:id', (req, res) => {
    const index = autos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        autos[index] = req.body;
        autos[index].id = parseInt(req.params.id);  // Ensure the ID remains unchanged
        res.json(autos[index]);
    } else {
        res.status(404).send('Auto not found');
    }
});

router.delete('/:id', (req, res) => {
    const index = autos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        autos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Auto not found');
    }
});

export default router;