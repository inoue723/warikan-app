import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCost } from '../../redux/actions/costActions'
import _ from "lodash"
import { emitFlashMessage } from "../../redux/actions/flashMessageActions"
import moment from "moment"
import { compose } from 'redux'
import Categories from "./Categories";

class SaveCost extends Component {
  state = {
    paymentDate: moment().format("YYYY-MM-DD"),
    amount: "",
    category: "",
    showCategories: false
  };

  handleSelectCategory(e) {
    this.setState({
      category: e.target.innerText,
      showCategories: false
    })
  }

  handleSubmit(e) {
    e.preventDefault();

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
    const { paymentDate, amount, category, showCategories, error } = this.state;
    const { cost } = this.props;

    return (
      <div className="container save-cost-panel">
        { cost && cost.isTrying && <div className="progress"><div className="indeterminate"></div></div> }
        { error && <div className="card-panel lime lighten-2"><span className="white-text">{ error }</span></div> }
        <form>
          <div>
            <label htmlFor="paymentDate">日付</label>
            <input type="date" id="paymentDate" value={paymentDate} onChange={e => this.submit({ paymentDate: e.target.paymentDate })} />
          </div>
          <div>
            <label htmlFor="amount">金額</label>
            <input type="number" id="amount" value={amount} onChange={e => this.setState({ amount: e.target.value })} />
          </div>
          <div className="category-box">
            <label htmlFor="category">カテゴリ</label>
            <input type="text" id="category" value={category} onChange={e => this.setState({ category: e.target.value })}/>
            <button type="button" className="blue-grey lighten-2 btn" onClick={e => this.setState({ showCategories: !showCategories })}>
              { showCategories ? "非表示" : "選択" }
            </button>
          </div>
          <Categories showCategories={showCategories} handleSelectCategory={e => this.handleSelectCategory(e)}/>
          <div>
            <button type="submit" className="waves-effect red lighten-2 btn" onClick={e => this.handleSubmit(e)}>記録</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cost: state.cost,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveCost: (cost) => dispatch(saveCost(cost)),
    emitFlashMessage: (message, messageType) => dispatch(emitFlashMessage(message, messageType))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SaveCost)
