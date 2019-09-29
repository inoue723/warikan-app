import React from 'react';
import './App.css';
import './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Route, BrowserRouter as Router , Switch, Redirect } from 'react-router-dom';
import moment from 'moment';

import Navbar from './Navbar';
import SignIn from './SignIn';
// import SignUp from './SignUp';
import Home from './Home';

const db = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: true,
      inputCost: "",
      myCosts: [],
      partnerCosts: [],
    };
  }

  componentDidMount() {
    console.log("App didMount start");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('is login');
        this.setState({
          isLoggedIn: true,
          user
        });
        this.getCosts();
      } else {
        console.log('is not login');
        this.setState({ isLoggedIn: false });
      }
    });

  };

  async getCosts() {
    if (!this.state.user) {
      console.error("this.state.user false");
      return;
    }
    const userId = this.state.user.uid;
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

  render() {
    console.log("App render start");
    const { user, myCosts, partnerCosts } = this.state;
    return (
      <div className="App">
        <Router>
          <Navbar /><hr/>
          <Switch>
            <Route exact path="/" render={() => (
              this.state.isLoggedIn ? (
                <Home
                  user={user}
                  myCosts={myCosts}
                  partnerCosts={partnerCosts}
                />
              ) : (
                <Redirect to="/SignIn" />
              )
            )} />
            <Route path='/SignIn' component={SignIn}/>
            {/* <Route path='/SignUp' component={SignUp}/> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
