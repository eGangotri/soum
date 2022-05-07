import graphql from "graphql";
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

import { mockData } from "../simualedData/MOCK_DATA.js";
import { mockCategory } from "../simualedData/mock_data_category.js";
import { mockProduct } from "../simualedData/mock_data_product.js";

import { CategoryType } from "./TypeDefs/CategoryType.js";
import { ProductType } from "./TypeDefs/ProductType.js";
import { UserType } from "./TypeDefs/UserType.js";

//a. REST API and a GraphQL API to GET category list. If the parent_id is given it should return only the child categories
//b. REST API and a GraphQL API to get a list of products by state and transfer the state.

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return mockData;
      },
    },
    getCategory: {
      type: new GraphQLList(CategoryType),
      args: { parent_id: { type: GraphQLInt } },
      resolve(parent, args) {
        return mockCategory;
      },
    },
    getProduct: {
      type: new GraphQLList(ProductType),
      args: { state: { type: GraphQLString } },
      resolve(parent, args) {
        return mockProduct;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
