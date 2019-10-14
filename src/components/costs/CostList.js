import React, { Component } from 'react';
import SaveCost from './SaveCost';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from "react-router-dom"
import moment from "moment"

class CostList extends Component {
//   deleteCost(id) {
//     db.collection("costs")
//       .doc(id)
//       .delete()
//       .then(() => {
//         this.props.getCosts();
//       })
//       .catch((error) => {
//         console.error("Error remove document: ", error);
//       });
//   }

  render() {
    const { auth, costs } = this.props;
    if (auth.isLoaded && !auth.uid) {
      console.log("not auth");
      return <Redirect to="/signin" />
    }

    return(
      <div>
        <SaveCost />
        <h3>自分</h3>
        <div>
          {/* <h3>{difference > 0 ? "貸し" : "借金"}{Math.abs(difference)}円</h3> */}
        </div>
        <table align="center">
          <tbody>
            <tr>
              <th>日時</th>
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
              })
            }
          </tbody>
        </table>
        {/* <div className="partnerCost-list">
          <h3>相手</h3>
          <table align="center">
            <tbody>
              <tr>
                <th>日時</th>
                <th>費用</th>
                <th>カテゴリ</th>
              </tr>
              {
                partnerCosts.map(cost => {
                  return (
                      <tr key={cost.id}>
                        <td>{cost.createdAt}</td>
                        <td>{cost.amount} 円</td>
                        <td>{cost.category}</td>
                      </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    costs: state.firestore.ordered.costs,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: `users/${props.auth.uid}/costs`,
      storeAs: 'costs'
    }
  ])
)(CostList)
