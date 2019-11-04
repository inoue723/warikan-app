import React from 'react'
import { Route, BrowserRouter as Router , Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CostList from './components/costs/CostList'
import FlashMessage from "./components/layout/FlashMessage"
import Footer from "./components/layout/Footer"
import SaveCost from "./components/costs/SaveCost"

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
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/new' component={SaveCost} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
