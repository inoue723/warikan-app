import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCost } from '../../redux/actions/costActions'
import _ from "lodash"
import { emitFlashMessage } from "../../redux/actions/flashMessageActions"

class SaveCost extends Component {
  state = {
    amount: "",
    category: "",
  };

  handleSubmit(e) {
    let { amount, category } = this.state;

    amount = Number(amount);

    if (!_.isInteger(amount) || amount <= 0) {
      this.props.emitFlashMessage("数値を正しく入力してください", "warning");
      return;
    }
  
    this.props.saveCost({ amount, category });
  }

  render() {
    const { amount, category, error } = this.state;
    const { cost } = this.props;

    return (
      <div>
        { cost && cost.isTrying && <div className="progress"><div className="indeterminate"></div></div> }
        { error && <div className="card-panel lime lighten-2"><span className="white-text">{ error }</span></div> }
        <div>
          <label htmlFor="amount">金額</label>
          <input type="number" id="amount" value={amount} onChange={e => this.setState({ amount: e.target.value })} />
        </div>
        <div>
          <label htmlFor="category">カテゴリ</label>
          <input type="text" id="category" value={category} onChange={e => this.setState({ category: e.target.value })} />
        </div>
        <div>
          <button className="waves-effect red lighten-2 btn" onClick={e => this.handleSubmit(e)}>記録</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cost: state.cost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveCost: (cost) => dispatch(saveCost(cost)),
    emitFlashMessage: (message, messageType) => dispatch(emitFlashMessage(message, messageType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveCost)
