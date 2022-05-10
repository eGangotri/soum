import graphql, { GraphQLFloat, GraphQLList } from "graphql";
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

//-	Product Name, Product Price, Images (One of this will be the main image) A product belongs to one category.

export const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    product_id: { type: GraphQLInt },
    category_id: { type: GraphQLInt },
    product_price: { type: GraphQLFloat },
    product_image: { type: new GraphQLList(GraphQLString) },
    product_name: { type: GraphQLString },
    state: { type: GraphQLString }
  }),
});

export const UpdateProductType = new GraphQLObjectType({
  name: "UpdateProduct",
  fields: () => ({
    stateFrom: { type: GraphQLString },
    stateTo: { type: GraphQLString },
    product_id: { type: GraphQLInt }
  }),
});



