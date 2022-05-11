import {
  AvailableState, DeletedDraftState, DeletedState, DraftState,
  ExpiredState, ReservedState, ReturnedState, SoldState, TerminatedState
} from "./Product.js"

export class StateFactory {
  static getFactory(state) {
    if (state === States.Draft.name) {
      return new DraftState(state)
    }
    else if (state === States.Available.name) {
      return new AvailableState(state)
    }
    else if (state === States.Reserved.name) {
      return new ReservedState(state)
    }
    else if (state === States.Available.name) {
      return new AvailableState(state)
    }
    else if (state === States.Deleted.name) {
      return new DeletedState(state)
    }
    else if (state === States.Expired.name) {
      return new ExpiredState(state)
    }
    else if (state === States.Sold.name) {
      return new SoldState(state)
    }
    else if (state === States.Returned.name) {
      return new ReturnedState(state)
    }
    else if (state === States.DeletedDraft.name) {
      return new DeletedDraftState(state)
    }
    else if (state === States.Terminated.name) {
      return new TerminatedState(state)
    }
  }
}

//States Enum
export class States {
  static Draft = new States('Draft');
  static Available = new States('Available');
  static Reserved = new States('Reserved');
  static Deleted = new States('Deleted');
  static Expired = new States('Expired');
  static Sold = new States('Sold');
  static Returned = new States('Returned');
  static DeletedDraft = new States('DeletedDraft');
  static Terminated = new States('Terminated');

  static allStates = Object.keys(States)

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `States.${this.name}`;
  }

  static isValidState(_state) {
    return this.allStates.includes(_state);
  }
}