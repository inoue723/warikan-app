import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore'
import moment from 'moment';

const db = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      partnerId: "",
      email: "",
      partnerEmail: "",
      inputCost: "",
      inputCategory: "",
      myCosts: [],
      partnerCosts: [],
    };
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

  async getCosts() {
    const { userId } = this.props;
    const myCostsData = await db.collection('users').doc(userId)
      .collection("costs")
      .orderBy('createdAt', 'desc')
      .get();
    const user = await db.collection('users').doc(userId).get();
    const partnerId = user.data().partnerId;
    const partnerCostsData = await db.collection('users').doc(partnerId)
      .collection("costs")
      .orderBy("createdAt", "desc")
      .get();

    const myCosts = myCostsData.docs.map(c => {
      return {
        id: c.id,
        amount: c.data().amount,
        createdAt: moment(c.data().createdAt.toDate()).format("YYYY-MM-DD"),
        category: c.data().category
      }
    });
    const partnerCosts = partnerCostsData.docs.map(c => {
      return {
        id: c.id,
        amount: c.data().amount,
        createdAt: moment(c.data().createdAt.toDate()).format("YYYY-MM-DD"),
        category: c.data().category
      }
    });

    this.setState({
      myCosts,
      partnerCosts
    });
  }

  saveCost() {
    if (!this.state.inputCost || this.state.inputCost <= 0) {
      console.error("INVALID_PARAM")
      return;
    }
    const userId = firebase.auth().currentUser.uid;
    db.collection("users").doc(userId).collection("costs").add({
      amount: this.state.inputCost,
      createdAt: firebase.firestore.Timestamp.now(),
      category: this.state.inputCategory
    })
    .then((docRef) => {
      this.setState({ inputCost: "" });
      this.getCosts();
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
        this.getCosts();
      })
      .catch((error) => {
        console.error("Error remove document: ", error);
      });
  }

  render(){
    return(
      <div>
        <h2>Home<button onClick={e => this.handleSignOut()}>Sign Out</button></h2>
        <p>Your Email: {this.props.email}</p>
        <div>
          <button onClick={e => this.getCosts() }>コスト表示</button>
        </div>
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
          <table align="center">
            <tbody>
              <tr>
                <th>日時</th>
                <th>費用</th>
                <th>カテゴリ</th>
              </tr>
              {
                this.state.myCosts.map(cost => {
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
                this.state.partnerCosts.map(cost => {
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
