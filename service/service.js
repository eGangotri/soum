
import _ from 'lodash';
import { mockProduct } from "../simualedData/mock_data_product.js";

export async function updateProductState(stateFrom,stateTo,productId){
    const index = _.findIndex(mockProduct, function(prod) { return prod.product_id === productId; });
    console.log('updateProductState: ', stateFrom,stateTo,productId);
    let success = mockProduct[index];
    if(index>=0){
      mockProduct[index].state = stateTo
      const alteredProduct = _.find(mockProduct, function(prod) { return prod.product_id === productId; });
      console.log(`alteredProduct : ${JSON.stringify(alteredProduct)}`);
      success = alteredProduct //.state === stateTo
    }
    const status = `: Updating from ${stateFrom} to for ${stateTo} product with Id ${productId}`
    return success;//(success?'Success':'Error') + status;
  }