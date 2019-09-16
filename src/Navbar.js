import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return(
      <div>
        <Link to="/">Home</Link><br />
        <Link to="/SignIn">SignIn</Link>
        {/* <Link to="/SignUp">SignUp</Link> */}
      </div>
    )
  }
}

export default Navbar;
