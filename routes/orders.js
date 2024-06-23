/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: API для управления заказами
 */

import express from 'express';
import orders from '../data/orders.js';

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Получить список заказов
 *     tags:
 *       - Orders
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает список заказов.
 *       '404':
 *         description: Заказы не найдены.
 */
router.get('/', (req, res) => {
    res.json(orders);
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Получить информацию о заказе по ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заказа
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает информацию о заказе.
 *       '404':
 *         description: Заказ не найден.
 */
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Создать новый заказ
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               autoId:
 *                 type: integer
 *               itemsId:
 *                 type: array
 *                 items:
 *                   type: integer
 *               date:
 *                 type: string
 *                 format: date
 *             example:
 *               clientId: 1
 *               autoId: 10
 *               itemsId: [22, 31, 13]
 *               date: 2024-06-21
 *     responses:
 *       '201':
 *         description: Заказ успешно создан.
 */
router.post('/', (req, res) => {
    const newOrder = req.body;
    newOrder.id = orders.length ? orders[orders.length - 1].id + 1 : 1;
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

export default router;