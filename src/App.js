import React from 'react'
import { Route, BrowserRouter as Router , Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CostList from './components/costs/CostList'
import LendingAndBorrowing from './components/lendingAndBorrowing/LendingAndBorrowing'
import FlashMessage from "./components/layout/FlashMessage"

class App extends React.Component {
  render() {
    console.log("App render start");
    return (
      <Router>
        <div className="App">
          <Navbar />
          <FlashMessage />
          <Switch>
            <Route exact path='/' component={CostList} />
            <Route exact path='/LendingAndBorrowing' component={LendingAndBorrowing} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
