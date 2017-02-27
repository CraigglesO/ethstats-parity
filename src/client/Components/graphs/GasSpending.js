import React, { Component }   from 'react';
import './graph.css';

const formatValue = (n) => ('' + n).replace(/(\d)(?=(\d{3})+$)/g, "$1,");

class GasSpending extends Component {
  constructor() {
    super();
    this.state = {
      val: null
    }
    this.high = 0;
    this.low  = Infinity;
    this.history = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  }

  mouseOver(e) {
    e.preventDefault();
    let v = e.currentTarget.title;
    this.setState({ val: v });
  }

  mouseLeave(e) {
    e.preventDefault();
    this.setState({ val: null });
  }

  render() {

    const self = this;
    let { history } = this.props;
    if (history.length < 31) {
      history = self.history;
    } else {
      self.high = 0;
      self.low  = Infinity;
      history.forEach((b, i) => {
        if (i === 0) return;
        let n = b.gasUsed.toNumber();
        if (n > self.high)
          self.high = n;
        if (n < self.low)
          self.low = n;
        this.history[i - 1] = n;
      });
    }
    history = this.history.map((n, i) => {
      const self = this;
      let v = formatValue(n);
      if (self.high === self.low || n === 0) {
        n = 1;
        v = 0;
      } else if (n !== 0) {
        n = ( (n-self.low) * 100) / (self.high-self.low);
      }
      let c;
      if (n >= 75)
        c = "#f74b4b";
      else if (n >= 35)
        c = "#f74b4b";
      else if (n >= 15)
        c = "#f74b4b";
      else if (n > 1)
        c = "#f74b4b";
      else
        c = "#10a0de";
      // Return the proper span
      return <span key={i} style={{ height: n + "px", backgroundColor: c }} title={v} onMouseOver={self.mouseOver.bind(self)} />;
    });

    return (
      <div className="GasSpending">
        <div>
          <span className="title">Gas Spending</span>
          <span className="title-value">{this.state.val}</span>
        </div>
        <div className="chart" onMouseLeave={this.mouseLeave.bind(this)}>
          {history}
        </div>
      </div>
    );
  }
}

export default GasSpending;
