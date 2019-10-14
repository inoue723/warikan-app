import React from 'react'
import { Route, BrowserRouter as Router , Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CostList from './components/costs/CostList'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: true,
    };
  }

  render() {
    console.log("App render start");
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={CostList} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
