import React, { Component } from 'react';
import SaveCost from './SaveCost';
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from "react-router-dom"
import moment from "moment"

class CostList extends Component {
  calcDiffrence(myCosts, partnerCosts) {
    let myTotalCost = 0;
    if (myCosts.length > 0) {
      myTotalCost = myCosts.reduce((acc, current) => acc + current.amount, 0);
    }

    let partnerTotalCost = 0;
    if (partnerCosts.length > 0) {
      partnerTotalCost = partnerCosts.reduce((acc, current) => acc + current.amount, 0);
    }

    return myTotalCost - partnerTotalCost;
  }

  concatCosts(myCosts, partnerCosts) {
    const costs = myCosts.concat(partnerCosts);
    costs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    return costs;
  }

  render() {
    const { auth, myCosts, partnerCosts } = this.props;

    if (auth.isLoaded && !auth.uid) {
      console.log("not auth");
      return <Redirect to="/signin" />
    }

    if (!isLoaded(this.props.myCosts) || !isLoaded(this.props.partnerCosts)) {
      return <h2 className="center-align">is loading...</h2>
    }

    const difference = this.calcDiffrence(myCosts, partnerCosts);
    const costs = this.concatCosts(myCosts, partnerCosts);

    return(
      <div className="container">
        <SaveCost />
        <div>
          <h3>{difference > 0 ? "貸し" : "借金"}{Math.abs(difference)}円</h3>
        </div>
        <table align="center">
          <tbody>
            <tr>
              {/* TODO: 支払日は今のところcreatedAtを見てるので、カラムを作って、記録するときに入力できるようにする */}
              <th>支払日</th>
              <th>費用</th>
              <th>カテゴリ</th>
            </tr>
            { costs && costs.map(cost => {
              return (
                <tr key={cost.id}>
                  <td>{moment(cost.createdAt.toDate()).format("YYYY-MM-DD")}</td>
                  <td>{cost.amount} 円</td>
                  <td>{cost.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.profile.isLoaded) return [];
    return [
      {
        collection: `users/${props.auth.uid}/costs`,
        storeAs: 'myCosts'
      },
      {
        collection: `users/${props.profile.partnerId}/costs`,
        storeAs: 'partnerCosts'
      }
  ]}),
  connect((state) => {
    return {
      myCosts: state.firestore.ordered.myCosts,
      partnerCosts: state.firestore.ordered.partnerCosts
    }
  })
)(CostList)
