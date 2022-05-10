import fetch from "node-fetch";
import { URL } from "../consts.js";
import _ from "lodash";

export async function getCategoryFromGraphAPI(parentId) {
  const fitVariable = parentId ? `(parent_id: ${parentId})` : "";
  const jsonQuery = {
    query: `{  
      getCategory${fitVariable} {
        category_id,parent_id,category_name  
      }
    }`,
    variables: null,
  };
  const data = await fetchFromGraphQL(jsonQuery);
  return data;
}

export async function getProductFromGraphAPI(state) {
  const fitVariable = state ? `(state: "${state}")` : "";
  const jsonQuery = {
    query: `{   
      getProduct${fitVariable} {
         product_id,category_id,product_price,product_image,product_name,state  
        } 
      }`,
    variables: null,
  };
  const data = await fetchFromGraphQL(jsonQuery);
  return data;
}

export async function updateProductStateFromGraphAPI(
  stateFrom,
  stateTo,
  productId
) {



  const fitVariable =
    `stateFrom: "${stateFrom}",stateTo: "${stateTo}",productId: ${productId}`;
  const jsonQuery = {
    query:
      `mutation {
        updateProductState(${fitVariable}) {
          status
        }  
      }`,
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
