import express from "express";

import { graphqlHTTP } from "express-graphql";
import {schema} from "./Schemas/index.js";
import cors from "cors";
import {router} from './router.js';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger.js';

const PORT = 6969;

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.use('/', router);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, 
  })
);

/**
 * Document APIs on Swagger.
a. REST API and a GraphQL API to GET category list. If the parent_id is given it
should return only the child categories
b. REST API and a GraphQL API to get a list of products by state and transfer the
state.
 */
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
