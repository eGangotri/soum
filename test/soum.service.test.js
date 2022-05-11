import { validateAndShareIndexOtherwiseErrMsg,transitionState,updateProductState } from '../service/service.js';
import { ProductFSM } from '../states/ProductFSM';
import { StateFactory } from '../states/ProductUtils.js';


beforeEach(() => {
  ProductFSM.init();
});

afterEach(() => {
  ProductFSM.destroy();
});

describe("Service Testing - validateAndShareIndexOtherwiseErrMsg", () => {
  beforeEach(() => {
    ProductFSM.init();
  });
  
  afterEach(() => {
    ProductFSM.destroy();
  });
  
  test('validateAndShareIndexOtherwiseErrMsg test invalid stateFrom', () => {
    const { valid, _status, index } = validateAndShareIndexOtherwiseErrMsg("nonExistentStateFrom", "Sold", 1);
    expect(valid).toBe(false);
  });
  
  test('validateAndShareIndexOtherwiseErrMsg test invalid stateTo', () => {
    const { valid, _status, index } = validateAndShareIndexOtherwiseErrMsg("Sold", "nonExistentStateTo", 1);
    expect(valid).toBe(false);
  });

  test('validateAndShareIndexOtherwiseErrMsg test stateFrom and stateTo same value', () => {
    const { valid, _status, index } = validateAndShareIndexOtherwiseErrMsg("Sold", "Sold", 1);
    expect(valid).toBe(false);
  });
  
  test('validateAndShareIndexOtherwiseErrMsg test ProductId with a Wrong From-State', () => {
    const { valid, _status, index } = validateAndShareIndexOtherwiseErrMsg("Draft", "Deleted", 1);
    expect(valid).toBe(false);
  });

  test('validateAndShareIndexOtherwiseErrMsg test ProductId with Correct State But Invalid To-State', () => {
    const { valid, _status, index } = validateAndShareIndexOtherwiseErrMsg("Returned", "Available", 1);
    expect(valid).toBe(false);
  });

  test('validateAndShareIndexOtherwiseErrMsg test ProductId with Correct To-State and transitionable From-State', () => {
    const { valid, _status, index } = validateAndShareIndexOtherwiseErrMsg("Returned", "Deleted", 1);
    expect(valid).toBe(true);
  });
});



describe("Service Testing - updateProductState", () => {
  
  test('updateProductState test valid stateFrom and in-transitionable stateTo', () => {
    const _status = updateProductState("Returned", "Available", 1)
    expect(_status.status).toBe("Error: stateFrom:Returned to stateTo: Available is not a valid transition state");
  });

});


describe("Service Testing - transitionState", () => {

  test('transitionState test valid stateFrom and in-transitionable stateTo', () => {
    ProductFSM.productsFSMArray[0].state = "Returned"
    ProductFSM.productsFSMArray[0].currentState = StateFactory.getFactory("Returned");
    const _status = transitionState(0,"Returned", "Available", 1)
    expect(_status).toBe("Error: Attempting Change of stateFrom:'Returned' to stateTo: 'Available' for product with Id:(1) is Invalid");
  });
  
  test('transitionState test valid stateFrom and transitionable stateTo', () => {
    ProductFSM.productsFSMArray[0].state = "Returned"
    ProductFSM.productsFSMArray[0].currentState = StateFactory.getFactory("Returned");
    const _status = transitionState(0, "Returned", "Draft", 1);
    expect(_status).toBe("Success: Updating from stateFrom:'Returned' to stateTo: 'Draft' for product with Id:(1)");
  });

});