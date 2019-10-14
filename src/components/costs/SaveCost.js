import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCost } from '../../redux/actions/costActions'

class SaveCost extends Component {
  state = {
    amount: "",
    category: "",
  };

  handleSubmit(e) {
    this.props.saveCost(this.state);
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="amount">金額</label>
          <input type="number" id="amount" value={this.state.amount} onChange={e => this.setState({ amount: Number(e.target.value) })} />
        </div>
        <div>
          <label htmlFor="category">カテゴリ</label>
          <input type="text" id="category" value={this.state.category} onChange={e => this.setState({ category: e.target.value })} />
        </div>
        <div>
          <button onClick={e => this.handleSubmit(e)}>記録</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveCost: (cost) => dispatch(saveCost(cost))
  }
}

export default connect(null, mapDispatchToProps)(SaveCost)