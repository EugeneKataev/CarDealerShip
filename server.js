import express from 'express';
import bodyParser from 'body-parser';

import itemsRoutes from './routes/items.js';
import clientsRoutes from './routes/clients.js';
import autosRoutes from './routes/autos.js';
import ordersRoutes from './routes/orders.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/items', itemsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/auto', autosRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});