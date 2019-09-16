import React from 'react';
import './App.css';
import './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
// import Routes from './Routes';
import { Route, BrowserRouter as Router , Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isLoggedIn: true,
      partnerUserId: "",
      email: "",
      password: "",
      userEmail: "",
      partnerEmail: "",
      inputCost: "",
      myCosts: [],
      partnerCosts: [],
    };
  }

  componentDidMount() {
    // console.log(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('is login');
        this.setState({
          isLoggedIn: true,
          user
        });
        // this.getCosts(user.id);
      } else {
        console.log('is not login');
        this.setState({ isLoggedIn: false });
      }
    });
  };

  // handleSignUp(e) {
  //   e.preventDefault()

  //   const { email, password } = this.state;
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       console.log(user);
  //       this.setState({ email: "", password: "" })
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       var errorMessage = error.message;
  //       console.log(errorMessage);
  //     });
  // }

  // invitePartner() {
  //   db.collection("")
  // }

  // getPartner() {
  //   db.collection('')
  // }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar /><hr/>
          <Switch>
            <Route exact path="/" render={() => (
              this.state.isLoggedIn ? (
                <Home
                  email={this.state.user.email}
                  userId={this.state.user.uid}
                />
              ) : (
                <Redirect to="/SignIn" />
              )
            )} />
            <Route path='/SignIn' component={SignIn}/>
            <Route path='/SignUp' component={SignUp}/>
          </Switch>
        </Router>
        {/* <header className="App-header">
          <div className="form">
            <form className="register-form">
              <input
              type="text"
              placeholder="email address"
              onChange={e => this.setState({ email: e.target.value })}
            />
              <input
              type="password"
              placeholder="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
              <button onClick={e => this.handleSignUp(e) }>Sign Up</button>
              <button onClick={e => this.handleSignIn(e) }>Sign In</button>
              <button onClick={e => this.handleSignOut()}>Sign Out</button>
            </form>
          </div>
          <div className="invitePartner">
            <input className="invitePartnerEmail"></input>
            <button onClick={e => this.invitePartner}>招待</button>
          </div>
          <div className="userInfo">
            <p className="myEmail">私: {this.state.userEmail}</p>
            <p className="partnerEmail">相手: {this.state.partnerEmail}</p>
          </div>
          <div className="record-form">
            <p>金額を入力</p>
            <input type="number" value={this.state.inputCost} onChange={e => this.setState({ inputCost: e.target.value })}></input>
            <button onClick={e => this.saveCost() }>記録する</button>
          </div>
          <div className="record-list">
            {
              this.state.myCosts.map(cost => {
                return (
                  <li key={cost.id}>
                    {cost.amount}
                    <button onClick={e => this.deleteCost(cost.id) }></button>
                  </li>
                );
              })
            }
          </div>
        </header> */}
      </div>
    );
  }
}

export default App;
