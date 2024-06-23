/**
 * @swagger
 * tags:
 *   - name: Items
 *     description: API для управления товарами
 */

import express from 'express';
import items from '../data/items.js';

const router = express.Router();

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Получить список товаров
 *     tags:
 *       - Items
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает список товаров.
 *       '404':
 *         description: Товары не найдены.
 */
router.get('/', (req, res) => {
    res.json(items);
});

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Получить информацию о товаре по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает информацию о товаре.
 *       '404':
 *         description: Товар не найден.
 */
router.get('/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Создать новый товар
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               compatibleMarks:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *             example:
 *               name: Стекло
 *               description: Описание товара
 *               compatibleMarks: BMW
 *               price: 200
 *               quantity: 3
 *     responses:
 *       '201':
 *         description: Товар успешно создан.
 */
router.post('/', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Обновить информацию о товаре по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               compatibleMarks:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *             example:
 *               name: Стекло для BMW
 *               description: Описание товара
 *               compatibleMarks: BMW
 *               price: 250
 *               quantity: 5
 *     responses:
 *       '200':
 *         description: Информация о товаре успешно обновлена.
 *       '404':
 *         description: Товар не найден.
 */
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

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Удалить товар по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     responses:
 *       '204':
 *         description: Товар успешно удален.
 *       '404':
 *         description: Товар не найден.
 */
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