import React from 'react'
import { connect } from "react-redux"
import { signOut } from "../../redux/actions/authActions"

const SignedInLinks = (props) => {
  // const { profile } = props;
  return (
    <div>
      <ul className="right">
        <li><button className="grey darken-2 btn" onClick={props.signOut}>Log Out</button></li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
