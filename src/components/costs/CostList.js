import React, { Component } from 'react';
import SaveCost from './SaveCost';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from "react-router-dom"
import moment from "moment"

class CostList extends Component {

//   saveCost() {
//     if (!this.state.inputCost || this.state.inputCost <= 0) {
//       console.error("INVALID_PARAM")
//       return;
//     }
//     const userId = firebase.auth().currentUser.uid;
//     db.collection("users").doc(userId).collection("costs").add({
//       amount: Number(this.state.inputCost),
//       createdAt: firebase.firestore.Timestamp.now(),
//       category: this.state.inputCategory
//     })
//     .then((docRef) => {
//       this.setState({ inputCost: "" });
//       this.props.onClick();
//     })
//     .catch((error) => {
//       console.error("Error adding document: ", error);
//     });
//   }


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
    console.log("CostList render start");
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
        <hr />
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

// export default connect(
//   ({ firebase: { auth } }) => ({ authExists: !!auth && !!auth.uid })
// )(CostList)

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'costs' }
  ])
)(CostList)
