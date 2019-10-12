import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCost } from '../../redux/actions/costActions'

class SaveCost extends Component {
  state = {
    inputCost: "",
    inputCategory: "",
  };

  handleSubmit(e) {
      this.props.saveCost(this.state);
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="amount">金額</label>
          <input type="number" id="amount" value={this.state.inputCost} onChange={e => this.setState({ inputCost: e.target.value })} />
        </div>
        <div>
          <label htmlFor="category">カテゴリ</label>
          <input type="text" id="category" value={this.state.inputCategory} onChange={e => this.setState({ inputCategory: e.target.value })} />
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