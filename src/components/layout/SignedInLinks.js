import React from 'react'
import { connect } from "react-redux"
import { signOut } from "../../redux/actions/authActions"

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><button onClick={props.signOut}>Log Out</button></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
