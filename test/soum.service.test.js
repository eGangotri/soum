import { validateAndShareIndexOtherwiseErrMsg } from '../service/service.js';
import { ProductFSM } from '../states/ProductFSM';


beforeEach(() => {
  ProductFSM.init();
});

afterEach(() => {
  ProductFSM.destroy();
});


describe("Service Testing", () => {

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

