import fetch from "node-fetch";
import {URL} from '../consts.js';

export async function updateProductState() {

}

export async function getCategory(parentId) {
  const fitVariable = parentId ? `(parent_id: ${parentId})` : "";
  const jsonQuery = {
    query: `{  getCategory${fitVariable} {category_id,parent_id,category_name  }}`,
    variables: null,
  };
  const data = await fetchFromGraphQL(jsonQuery);
  return data;
}

export async function getProduct(state) {
  const fitVariable = state ? `(state: "${state}")` : "";
  const jsonQuery = {
    query: `{   getProduct${fitVariable} { product_id,category_id,product_price,product_image,product_name,state  } }`,
    variables: null,
  };
  const data = await fetchFromGraphQL(jsonQuery);
  return data;
}

async function fetchFromGraphQL(jsonObj) {
  const response = await fetch(`${URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(jsonObj),
  });
  const data = await response.json();
  console.log("data returned:", data);
  return data;
}
