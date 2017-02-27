import { observable }              from "mobx";
import { Bond, TimeBond }          from 'oo7';
import { setupBonds, abiPolyfill } from "oo7-parity";
// import Web3 from 'web3';
//
// const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


const MAX_SIZE = 40;

class Store {
  @observable clock;
  @observable now;
  @observable blockNumber;
  @observable blocks;

  constructor() {
    const self = this;

    // Setup:
    self.clock       = 0;
    self.now         = 0;
    self.blockNumber = 0;
    self.blocks      = [];
    self.parity      = parity.bonds;

    self.time        = new TimeBond().tie(self.updateTime.bind(self));

    console.log("parity", self.parity);
    // HISTORY
    self.parity.blockNumber.then(self.history.bind(self));

    // Update every new blockNumber
    self.parity.blockNumber.tie((b) => {self.blockNumber = b; return null});
    // Update every new block
    self.parity.block.tie(self.update.bind(self));
  }

  history(b) {
    const self = this;
    for (let i = 1; i < 40; i++){
      self.parity.blocks[b - i].then((block) => {
        self.blocks.unshift(block);
        return null;
      });
    }
  }

  update(b) {
    const self       = this;
    self.blocks.shift();
    self.blocks.push(b);
    return null;
  }

  updateTime(t) {
    this.clock++;
    this.now = t;
  }

}

export default new Store();
