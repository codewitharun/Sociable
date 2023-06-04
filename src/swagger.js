import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sociable API",
      version: "1.0.0",
      description: "Private API ",
    },
    servers: [
      {
        url: "http://localhost:3001/api/",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API routes
  // apis: ["./index.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swagger(app) {
  app.use("/api-docs/v3", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
