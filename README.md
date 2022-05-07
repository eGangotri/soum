## Start
yarn install
yarn run start



Please refer to the below state diagram of the product Entity.

Product Entity
A Product has below fields:
-	Product Name, Product Price, Images (One of this will be the main image) A product belongs to one category.
A category may belong to one parent category. A category has category_id, category_name and parent_id


diagram.png

You are required to:

1.	Document APIs on Swagger.
a.	REST API and a GraphQL API to GET category list. If the parent_id is given it should return only the child categories
b.	REST API and a GraphQL API to get a list of products by state and transfer the state.
2.	Design a proper class structure for handling the product state changes. You may use a matching design pattern (e.g. State Design Pattern). Proper exceptions should be thrown if there is an attempt to make invalid states. (e.g. draftProduct->sold() should not be allowed)
3.	Implement unit testing for above APIs
4.	Develop the REST and GraphQL APIs for above.
