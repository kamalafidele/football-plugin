const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

dotenv.config();

const { PORT, HOST, ENV_MODE } = process.env;

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];
const doc = {
  info: {
    version: '1.0.0',
    title: 'FOOTBALL API',
    description: 'FOOTBALL Backend API Documentation',
  },
  host: `${ENV_MODE === 'DEV' ? `${HOST}:${PORT}` : HOST}`,
  basePath: '/api/v1/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [

  ],
  definitions: {
  },
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => console.log('docs generated'));
