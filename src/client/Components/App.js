import React, { Component }   from 'react';
import { Bond, TimeBond }     from 'oo7';
import styles                 from '../style.css';

import Stats from "./figures/stats";

import {
  BlockTime,
  Difficulty,
  GasLimit,
  GasSpending,
  Transactions,
  UncleCount
} from "./graphs";

class App extends Component {

  constructor() {
    super();
    const self = this;
    self.state = {
      blockNumber: null,
      difficulty:  0,
      gasLimit:    0,
      gasUsed:     0,
      history:     [],
      now:         Date.now(),
    };
    self.parity = parity.bonds;
    self.time   = null;
  }

  componentDidMount() {
    const self = this;
    // HISTORY
    self.parity.blockNumber.then(self.history.bind(self));
    // Update every new blockNumber
    self.parity.blockNumber.tie((b) => {
      self.setState({ blockNumber: b });
      return null;
    });
    // Update every new block
    self.parity.block.tie(self.update.bind(self));
  }

  history(b) {
    const self = this;
    // console.log("HISTORY");
    for (let i = 1; i < 31; i++) {
      // Grab blocks async
      self.parity.blocks[b - i].then((block) => {
        let history = self.state.history;
        history.unshift(block);
        // Ensure proper block order:
        history = history.sort((a,b) => {
          let a_num = a.number.toNumber();
          let b_num = b.number.toNumber();
          if (a_num < b_num)
            return -1;
          if (a_num > b_num)
            return 1;
          return 0;
        });
        // Update state
        self.setState({
          history: history
        });
        return null;
      });
    }
  }

  update(b) {
    const self     = this;
    let history    = self.state.history;
    let difficulty = b.difficulty.toNumber();
    let gasLimit   = b.gasLimit.toNumber();
    let gasUsed    = b.gasUsed.toNumber();
    while (history.length > 31)
      history.shift();
    history.push(b);
    self.setState({ history, difficulty, gasLimit, gasUsed, now: Date.now() });
    // console.log("Blocks:", history);
    return null;
  }

  render() {
    let Store = this.state;
    let { history } = this.state;

    return (
      <div className="App">
        <div className="standard-stats">
          <Stats store={Store} />
        </div>
        <div className="graphs">
          <div className="col-md-6"><BlockTime    history={history} /></div>
          <div className="col-md-6"><Transactions history={history} /></div>
          <div className="col-md-6"><GasLimit     history={history} /></div>
          <div className="col-md-6"><GasSpending  history={history} /></div>
          <div className="col-md-6"><Difficulty   history={history} /></div>
          <div className="col-md-6"><UncleCount   history={history} /></div>
        </div>
      </div>
    );
  }
}

export default App;
