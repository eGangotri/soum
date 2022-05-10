class ProductChange {
    constructor() {
        this.states = [new DraftState(), new AvaliableState(), new ReservedState()
            , new DeletedState(), new ExpiredState(), new SoldState(),
             new ReturnedState(), new DeletedDraftState()];
        this.current = this.states[0];
      }
      change() {
        const totalStates = this.states.length;
        let currentIndex = this.states.findIndex(state => state === this.current);
        if (currentIndex + 1 < totalStates) this.current = this.states[currentIndex + 1];
        else this.current = this.states[0];
      }
      sign() {
        return this.current.sign();
      }
}



class ProductState {
    constructor(state) {
      this.state = state;
    }
  }
  
  class AvaliableState extends ProductState {
    constructor() {
      super('avaliable');
    }
  
    sign() {
      return 'STOP';
    }
  }
  
  class ReservedState extends ProductState {
    constructor() {
      super('reserved');
    }
  
    sign() {
      return 'STEADY';
    }
  }
  class DraftState extends ProductState {
      constructor() {
          super('draft');
      }
  
      sign() {
          return 'GO';
      }
  }

  class DeletedState extends ProductState {
    constructor() {
        super('deleted');
    }

    sign() {
        return 'GO';
    }
}

class ExpiredState extends ProductState {
    constructor() {
        super('expired');
    }

    sign() {
        return 'GO';
    }
}
class SoldState extends ProductState {
    constructor() {
        super('sold');
    }

    sign() {
        return 'GO';
    }
}
class ReturnedState extends ProductState {
    constructor() {
        super('returned');
    }

    sign() {
        return 'GO';
    }
}


class DeletedDraftState extends ProductState {
    constructor() {
        super('deleted-draft');
    }

    sign() {
        return 'GO';
    }
}
  
  // usage
  const trafficState = new TrafficState();
  
  console.log(trafficState.sign()); // 'GO'
  trafficState.change();
  
  console.log(trafficState.sign()); // 'STOP'
  trafficState.change();
  
  console.log(trafficState.sign()); // 'STEADY'
  trafficState.change();
  
  console.log(trafficState.sign()); // 'GO'
  trafficState.change();
  
  console.log(trafficState.sign()); // 'STOP'