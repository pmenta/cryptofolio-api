const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

app.use(express.json());

app.use(cors);

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => console.log('🔥 Server started at http://localhost:3001'));
