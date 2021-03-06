import React, { Component } from 'react';
import PrettyNumber    from 'react-pretty-number';

import './stats.css';
import * as minimalIcons from '../../fonts/minimal-icons.svg';

const formatBlockNumber = (n) => '#' + ('' + n).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
const formatGas         = (n) => ('' + n).replace(/(\d)(?=(\d{3})+$)/g, "$1,");


class Stats extends Component {
  constructor() {
    super();
    const self = this;
    self.state = {
      clock:   0,
      statNow: Date.now()
    };
    self.timer = null;
    self.updateTime();
  }

  updateTime() {
    const self = this;
    if (self.timer) {
      clearInterval(self.timer);
      self.timer = null;
      self.setState({ clock: 0, statNow: Date.now() });
    }
    self.timer = setInterval(() => {
      let c = self.state.clock;
      c++;
      self.setState({ clock: c });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    let { blockNumber, difficulty, gasLimit, gasUsed, now } = nextProps.store;
    let { clock, statNow } = self.state;
    if (statNow < now) {
      self.updateTime();
    }
  }

  render() {
    const self = this;
    let { blockNumber, difficulty, gasLimit, gasUsed } = self.props.store;
    let { clock } = self.state;
    let clockStyle = null;

    if (clock >= 30)
      clockStyle = {color: "#f74b4b"};
    else if (clock >= 20)
      clockStyle = {color: "#ff8a00"};
    else if (clock >= 10)
      clockStyle = {color: "#ffd162"};

    return (
      <div className="Stats">

        <div className="best-block">
          <span className="icon-block" style={{fontFamily: "minimal-icons"}}></span>
          <div className="info">
            <div className="block-title">Best Block</div>
            <span className="value">{formatBlockNumber(blockNumber)}</span>
          </div>
        </div>

        <hr />

        <div className="last-block" style={clockStyle}>
         <span className="icon-time" style={{fontFamily: "minimal-icons"}}></span>
         <div className="info">
           <div className="block-title">Last Block</div>
           <span className="value">{clock}s ago</span>
         </div>
        </div>

        <hr />

        <div className="gas-limit">
          <span className="icon-gas" style={{fontFamily: "minimal-icons"}}></span>
          <div className="info">
            <div className="block-title">Gas Limit</div>
            <span className="value">{formatGas(gasLimit)}</span>
          </div>
        </div>

        <hr />

        <div className="gas-used">
          <span className="icon-gasprice" style={{fontFamily: "minimal-icons"}}></span>
          <div className="info">
            <div className="block-title">Gas Used</div>
            <span className="value">{formatGas(gasUsed)}</span>
          </div>
        </div>

        <hr />

        <div className="difficulty">
          <span className="icon-difficulty" style={{fontFamily: "minimal-icons"}}></span>
          <div className="info">
            <div className="block-title">Block Difficulty</div>
            <span className="value"><PrettyNumber number={difficulty} /></span>
          </div>
        </div>

      </div>
    );
  }
}

export default Stats;
