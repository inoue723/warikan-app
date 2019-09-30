import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSignIn(e) {
    e.preventDefault();
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Login Success");
        window.location.href = "/";
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
  }

  render(){
    return(
      <div>
        <h2>Sign in</h2>
        <form>
          <input
            type="text"
            placeholder="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button onClick={e => this.handleSignIn(e) }>Sign In</button>
        </form>
      </div>
    )
  }
}

export default SignIn;
