import express from "express";

import { graphqlHTTP } from "express-graphql";
import {schema} from "./Schemas/index.js";
import cors from "cors";
import {router} from './router.js';
import {PORT} from './consts.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
