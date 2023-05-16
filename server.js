const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const routeHandler = require('./src/routes');
const swaggerFile = require('./swagger_output.json');

const app = express();

dotenv.config();

const { PORT, HOST } = process.env;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use('/api/v1/', routeHandler);

app.use((req, res) => res.status(404).json({ error: 'We cannot get what you are looking for!' }));

app.listen(PORT, () => {
  console.log(`APP RUNNING ON ${HOST}:${PORT}`);
  console.log(`ACCESS API DOCS VIA ${HOST}:${PORT}/api-docs `);
});