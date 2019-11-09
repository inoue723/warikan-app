import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from "react-router-dom"
import moment from "moment"
import CostChart from "./CostChart"

class CostList extends Component {
  concatCosts(myCosts, partnerCosts) {
    const costs = myCosts.concat(partnerCosts);
    costs.sort((a, b) => b.paymentDate.toDate() - a.paymentDate.toDate());
    return costs;
  }

  render() {
    const { auth, myCosts, partnerCosts } = this.props;

    if (auth.isLoaded && !auth.uid) {
      console.log("not auth");
      return <Redirect to="/signin" />
    }

    if (!isLoaded(this.props.myCosts) || !isLoaded(this.props.partnerCosts)) {
      return (
        <div className="row">
          <div><br /><br /><br /></div>
          <div className="col s12 center">
            <div className="preloader-wrapper big active ">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const costs = this.concatCosts(myCosts, partnerCosts);

    return(
      <div className="container">
        <CostChart
          myCosts={myCosts}
          partnerCosts={partnerCosts}
        />
        <table align="center">
          <tbody>
            <tr>
              <th>支払日</th>
              <th>カテゴリ</th>
              <th>費用</th>
            </tr>
            { costs && costs.map(cost => {
              return (
                <tr key={cost.id}>
                  <td>{moment(cost.paymentDate.toDate()).format("YYYY-MM-DD")}</td>
                  <td>{cost.category}</td>
                  <td className="right-align">{cost.amount.toLocaleString()} 円</td>
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
        storeAs: 'myCosts',
        orderBy: ['createdAt', 'desc']
      },
      {
        collection: `users/${props.profile.partnerId}/costs`,
        storeAs: 'partnerCosts',
        orderBy: ['createdAt', 'desc']
      }
  ]}),
  connect((state) => {
    return {
      myCosts: state.firestore.ordered.myCosts,
      partnerCosts: state.firestore.ordered.partnerCosts
    }
  })
)(CostList)
