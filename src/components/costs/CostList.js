import React, { Component } from 'react';
import SaveCost from './SaveCost';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

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

  render(){
    console.log("Home render start");
    return(
      <div>
        <SaveCost />
        <h1>costList</h1>
        {/* <div className="myCost-list">
          <h3>自分</h3>
          <div>
            <h3>{difference > 0 ? "貸し" : "借金"}{Math.abs(difference)}円</h3>
          </div>
          <table align="center">
            <tbody>
              <tr>
                <th>日時</th>
                <th>費用</th>
                <th>カテゴリ</th>
              </tr>
              {
                myCosts.map(cost => {
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
        </div>
        <hr />
        <div className="partnerCost-list">
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
  console.log(state);
  return {
    projects: state.firestore.ordered.projects
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'costs' }
  ])
)(CostList)
