import React, { Component }   from 'react';
import './graph.css';

const formatValue = (n) => ('' + n).replace(/(\d)(?=(\d{3})+$)/g, "$1,");

class GasLimit extends Component {
  constructor() {
    super();
    this.state = {
      val: null
    }
    this.high = 0;
    this.low  = Infinity;
    this.history = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  }

  mouseOver(e) {
    e.preventDefault();
    let v = e.currentTarget.title;
    if (v === "1") return;
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
        let n = b.gasLimit.toNumber();
        if (n > self.high)
          self.high = n;
        if (n < self.low)
          self.low = n;
        if (n === 0)
          n = 1;
        this.history[i - 1] = n;
      });
    }
    // console.log("HISTORY", this.history);
    history = this.history.map((n, i) => {
      const self = this;
      let v = formatValue(n);
      if (n !== 1)
        n = ( (n-self.low) * 100) / (self.high-self.low);
      if (n < 1)
        n = 1;
      // Return the proper span
      return <span key={i} style={{ height: n + "px" }} title={v} onMouseOver={self.mouseOver.bind(self)} />;
    });

    return (
      <div className="GasLimit">
        <div>
          <span className="title">Gas Limit</span>
          <span className="title-value">{this.state.val}</span>
        </div>
        <div className="chart" onMouseLeave={this.mouseLeave.bind(this)}>
          {history}
        </div>
      </div>
    );
  }
}

export default GasLimit;
