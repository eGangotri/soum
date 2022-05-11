import { States, StateFactory } from './ProductUtils.js';

export class Product {
  constructor(_productWithState) {
    this.states = [new DraftState(), new AvailableState(), new ReservedState()
      , new DeletedState(), new ExpiredState(), new SoldState(),
    new ReturnedState(), new DeletedDraftState(), new TerminatedState()];
    this.productWithState = _productWithState;
    this.currentState = _productWithState.state ? StateFactory.getFactory(_productWithState.state) : this.states[0];
  }

  transition(stateTo) {
    console.log(`this.productWithState.state ${this.productWithState.state} 
    transition(${stateTo}) ${JSON.stringify(this.currentState)}`);

    try {
      const nextState = this.currentState.transition(stateTo);
      if (nextState) {
        this.productWithState.state = stateTo;
        this.currentState = nextState;
        return true
      }
      else {
        return false;
      }
    }
    catch (e) {
      console.log(e)
    }
  }
}

export class ProductState {
  constructor(state) {
    this.state = state;
  }

  transition(validNextStates, stateTo) {
    return validNextStates.includes(stateTo)
      ? StateFactory.getFactory(stateTo) : null
  }

  toString() {
    return state
  }
}


export class DraftState extends ProductState {
  constructor() {
    super(States.Draft.name);
  }

  validNextStates = [States.Available.name,
  States.DeletedDraft.name
  ]

  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}


export class AvailableState extends ProductState {
  constructor() {
    super(States.Available.name);
  }

  validNextStates = [States.Expired.name,
  States.DeletedDraft.name,
  States.Reserved.name
  ]
  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}

export class ReservedState extends ProductState {
  constructor() {
    super(States.Reserved.name);
  }
  validNextStates = [States.Sold.name,
  States.Available.name
  ]
  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}

export class DeletedState extends ProductState {
  constructor() {
    super(States.Deleted.name);
  }

  validNextStates = [States.Terminated.name]
  transition(stateTo) {
    return super.transition(stateTo);
  }
}

export class ExpiredState extends ProductState {
  constructor() {
    super(States.Expired.name);
  }

  validNextStates = [States.Terminated.name,
  States.Available.name];

  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}

export class SoldState extends ProductState {
  constructor() {
    super(States.Sold.name);
  }

  validNextStates = [States.Returned.name,
  States.Terminated.name];
  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}

export class ReturnedState extends ProductState {
  constructor() {
    super(States.Returned.name);
  }

  validNextStates = [States.Deleted.name, States.Draft.name]
  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}

export class DeletedDraftState extends ProductState {
  constructor() {
    super(States.DeletedDraft.name);
  }
  validNextStates = [States.Terminated.name]

  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}

export class TerminatedState extends ProductState {
  constructor() {
    super(States.Terminated.name);
  }
  validNextStates = []
  transition(stateTo) {
    return super.transition(this.validNextStates, stateTo);
  }
}

