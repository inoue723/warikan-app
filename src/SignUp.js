import React from 'react'

// TODO: SignUpの実装
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
class SignUp extends React.Component {
  render(){
    return(
      <div>
        <h2>Sign Up</h2>
      </div>
    )
  }
}

export default SignUp;
