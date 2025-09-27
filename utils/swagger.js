import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NexTraceWeb API',
            version: '1.0.0',
            description: 'Documentação da API do NexTraceWeb'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            },
            {
                url: 'https://nextraceweb.vercel.app',
                description: 'Servidor de produção'
            }
        ]
    },
    apis: ['./routes/*.js'] // Gera documentação com base nos comentários JSDoc nas rotas
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
