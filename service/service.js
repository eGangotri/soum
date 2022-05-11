import { States } from '../states/ProductUtils.js';
import { ProductFSM } from '../states/ProductFSM.js';
import { findIndexFromProductFSM } from '../Utils.js';

export function updateProductState(stateFrom, stateTo, productId) {
  let { valid, _status, index } = validateAndShareIndexOtherwiseErrMsg(stateFrom, stateTo, productId);
  if (valid) {
    _status = transitionState(index, stateFrom, stateTo, productId);
  }
  return {
    status: _status
  }
}

function validateAndShareIndexOtherwiseErrMsg(stateFrom, stateTo, productId) {
  let valid = false;
  let _status = ''
  let index = -1;
  if (stateFrom === stateTo) {
    _status = `Error: stateFrom:${stateFrom} and stateTo:${stateTo} are same`;
  }
  else if (!States.isValidState(stateFrom)) {
    _status = `Error: No such State stateFrom:${stateFrom}`;
  }
  else if (!States.isValidState(stateTo)) {
    _status = `Error: No such State stateTo: ${stateTo}`;
  }
  else {
    index = findIndexFromProductFSM(stateFrom, productId);
    if (index === -1) {
      _status = `Error. Either ProductId(${productId}) doesnt exist or it was not in the stateFrom:${stateFrom}`
    }
    else {
      console.log("validated succesfully");
      valid = true;
    }
  }

  return { valid, _status, index }
}

function transitionState(index, stateFrom, stateTo, productId) {
  let _status = '';

  const transitionSucces = ProductFSM.transition(productId, stateFrom, stateTo)
  console.log(`transitionSucces ${transitionSucces}`)
  if (transitionSucces) {
    _status = `Success: Updating from ${stateFrom} to ${stateTo} for product with Id ${productId}`
  }
  else {
    _status = `Error: Attempting Change of stateFrom:${stateFrom} to stateTo: ${stateTo} is Invalid`;
  }
  return _status;
}
