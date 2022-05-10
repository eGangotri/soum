
import _ from 'lodash';
import { mockProduct } from "../simualedData/mock_data_product.js";

export function updateProductState(stateFrom,stateTo,productId){
    const index = _.findIndex(mockProduct,
       function(prod) { 
         return prod.product_id === productId && prod.state === stateFrom 
    });
    const originalProduct = _.find(mockProduct, function(prod) { return prod.product_id === productId; });
    console.log(`originalProduct: originalProduct${JSON.stringify(originalProduct)}} `);

    console.log(`updateProductState: stateFrom:${stateFrom}, stateTo:${stateTo}, productId:${productId}} `);

    let _status = '';
    if(index>=0){
      _status= transitionState(index, stateFrom, stateTo, productId);
    }
    else{
      _status = `Error. Either ProductId(${productId}) doesnt exist or it was not in the state:${stateFrom}`
    }
    return {
      status: _status
    }
}

function transitionState(index, stateFrom, stateTo,productId){
  mockProduct[index].state = stateTo;
  const alteredProduct = _.find(mockProduct, function(prod) { return prod.product_id === productId; });
  console.log(`alteredProduct : ${JSON.stringify(alteredProduct)}`);
  let _status = '';
  if(alteredProduct.state === stateTo){
    _status = `Success: Updating from ${stateFrom} to ${stateTo} for product with Id ${productId}`
  }
  else {
    _status = `Error: Updating from ${stateFrom} to ${stateTo} for product with Id ${productId}`
  }
  return _status
}