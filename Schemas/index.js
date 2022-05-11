import graphql from "graphql";
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

import { mockCategory } from "../simualedData/mock_data_category.js";
import { ProductFSM } from '../states/ProductFSM.js';


import { CategoryType } from "./TypeDefs/CategoryType.js";
import { ProductType, UpdateProductType } from "./TypeDefs/ProductType.js";

import { updateProductState } from '../service/service.js'
import _ from 'lodash';

//a. REST API and a GraphQL API to GET category list. If the parent_id is given it should return only the child categories
//b. REST API and a GraphQL API to get a list of products by state and transfer the state.

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getCategory: {
      type: new GraphQLList(CategoryType),
      args: { parent_id: { type: GraphQLInt } },
      resolve(parent, args) {
        const parentId = args.parent_id;
        if(parentId){
          const filteredByParentId = _.filter(mockCategory, function(cat) { return cat.parent_id === args.parent_id; });
          return filteredByParentId
        }
        else return mockCategory;
      },
    },
    getProduct: {
      type: new GraphQLList(ProductType),
      args: { state: { type: GraphQLString } },
      resolve(parent, args) {
        const state = args.state;
        const productsWithStateList = ProductFSM.productsFSMArray.map(a => a.productWithState);
        if(state){
          const filteredByState = _.filter(productsWithStateList, function(prod) { return prod.state === args.state; });
          return filteredByState
        }
        else {
          return productsWithStateList;
        }
      },
    },
  },
});


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    updateProductState: {
      type: UpdateProductType,
      args: {
        stateFrom: { type: GraphQLString },
        stateTo: { type: GraphQLString },
        productId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const {stateFrom,stateTo,productId} = args;
        const success = updateProductState(stateFrom,stateTo,productId)
        console.log("Mutation:updateProductState JSON.stringify(args):",JSON.stringify(args), `success ${JSON.stringify(success)}`);
        return success;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
