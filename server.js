const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const routeHandler = require('./src/routes');
const swaggerFile = require('./swagger_output.json');

const app = express();

dotenv.config();

const { PORT, HOST, ENV_MODE } = process.env;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

app.use('/api/v1/', routeHandler);

app.use((req, res) => res.status(404).json({ error: 'We cannot get what you are looking for!' }));

app.listen(PORT, () => {
  const dynamic_host = `${ENV_MODE === 'DEV' ? `${HOST}:${PORT}` : `${HOST}`}`;

  console.log(`APP RUNNING ON ${dynamic_host}`);
  console.log(`ACCESS API DOCS VIA ${dynamic_host}/api-docs `);
});
