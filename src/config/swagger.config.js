import swaggerJSDoc from "swagger-jsdoc";

export const swaggerConfig = () => {
  return swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API - Rei do Acolchoado',
        version: '1.0.0',
        description: 'Documentação da API',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor Local',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ['src/routes/*.js'],
  });
};
