import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore'

const db = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCost: "",
      inputCategory: "",
    };
  }

  componentDidMount() {
    console.log("Home didMount start");
  }

  handleSignOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          userEmail: "",
          myCosts: []
        });
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
  }

  saveCost() {
    if (!this.state.inputCost || this.state.inputCost <= 0) {
      console.error("INVALID_PARAM")
      return;
    }
    const userId = firebase.auth().currentUser.uid;
    db.collection("users").doc(userId).collection("costs").add({
      amount: Number(this.state.inputCost),
      createdAt: firebase.firestore.Timestamp.now(),
      category: this.state.inputCategory
    })
    .then((docRef) => {
      this.setState({ inputCost: "" });
      this.props.onClick();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }


  deleteCost(id) {
    db.collection("costs")
      .doc(id)
      .delete()
      .then(() => {
        this.props.getCosts();
      })
      .catch((error) => {
        console.error("Error remove document: ", error);
      });
  }

  render(){
    console.log("Home render start");
    const { user, myCosts, partnerCosts, difference } = this.props;
    return(
      <div>
        <h2>Home<button onClick={e => this.handleSignOut()}>Sign Out</button></h2>
        <p>Your Email: {user && user.email}</p>
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
            <button onClick={e => this.saveCost()}>記録</button>
          </div>
        </div>
        <hr />
        <div className="myCost-list">
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
        </div>
      </div>
    )
  }
}

export default Home;
