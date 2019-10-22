import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCost } from '../../redux/actions/costActions'
import _ from "lodash"
import { emitFlashMessage } from "../../redux/actions/flashMessageActions"
import moment from "moment"

class SaveCost extends Component {
  state = {
    paymentDate: moment().format("YYYY-MM-DD"),
    amount: "",
    category: "",
  };

  handleSubmit(e) {
    let { paymentDate, amount, category } = this.state;

    amount = Number(amount);

    if (!_.isInteger(amount) || amount <= 0) {
      this.props.emitFlashMessage("数値を正しく入力してください", "warning");
      return;
    }

    paymentDate = moment(this.state.paymentDate).toDate();

    this.props.saveCost({ paymentDate, amount, category });
    this.setState({ paymentDate: moment().format("YYYY-MM-DD"), amount: "", category: "" });
  }

  render() {
    const { paymentDate, amount, category, error } = this.state;

    const { cost } = this.props;


    return (
      <div>
        { cost && cost.isTrying && <div className="progress"><div className="indeterminate"></div></div> }
        { error && <div className="card-panel lime lighten-2"><span className="white-text">{ error }</span></div> }
        <div>
          <label htmlFor="paymentDate">日付</label>
          <input type="date" id="paymentDate" value={paymentDate} onChange={e => this.setState({ paymentDate: e.target.value })} />
        </div>
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
