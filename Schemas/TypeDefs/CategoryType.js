import graphql from "graphql";
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

//A category may belong to one parent category. A category has category_id, category_name and parent_id


export const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    category_id: { type: GraphQLInt },
    parent_id: { type: GraphQLInt },
    category_name: { type: GraphQLString }
  }),
});

