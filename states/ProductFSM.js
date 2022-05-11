import { Product } from './Product.js';
import { mockProduct } from '../simualedData/mock_data_product.js';
import { findIndexFromProductFSM } from '../Utils.js';

import _ from 'lodash';

export class ProductFSM {
    static productsFSMArray = []

    static init() {
        this.fill();
    }

    static fill() {
        if(_.isEmpty(this.productsFSMArray)){
            mockProduct.forEach((_productObj,i) => {
               try{
                const product = new Product(_productObj);
                this.productsFSMArray.push(product);
               }
               catch(e){
                   console.log("error",e);
               }
            });
        }
    }

    static transition(productId,stateFrom, stateTo) {
        const productIndex = findIndexFromProductFSM(stateFrom,productId);
        const productInFSMDB = this.productsFSMArray[productIndex];
        console.log('ProductFSM:',productIndex,productId,stateFrom, stateTo, this.productsFSMArray.length, JSON.stringify(productInFSMDB.productWithState));
        const result = productInFSMDB.transition(stateTo)
        if(result){
            this.productsFSMArray[productIndex].state = stateTo;
        }
        return result;
    }

}