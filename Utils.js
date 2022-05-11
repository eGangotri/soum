import _ from 'lodash';
import { ProductFSM } from './states/ProductFSM.js';

  export function findIndexFromProductFSM(stateFrom, productId) {
    const productsWithStateList = ProductFSM.productsFSMArray.map(a => a.productWithState);
    console.log(`findIndexFromProductFSM ${productsWithStateList[0]}`)
    return _.findIndex(productsWithStateList,
      (prodFSM) => {
        return prodFSM.product_id === productId && prodFSM.state === stateFrom
      })
  }