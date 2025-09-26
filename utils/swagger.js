import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NexTraceWeb API',
      version: '1.0.0',
      description: 'Documentação da API do NexTraceWeb'
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
