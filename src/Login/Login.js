import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { database, auth } from '../database';
import './Login.css';


export default class Login extends Component {

  constructor(){
    super();
    this.state={
      email: '',
      password: '',
      error: ''
    }
  }

  getFirebaseUserObject(uid){
    const { logIn } = this.props
    database.ref("users").on("value", function(snapshot) {
      const user = snapshot.val();
      logIn(user[uid])
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  }

  signIn () {
    const { email, password } = this.state
    const { history } = this.props
    const setErrorState = (error) => this.setState({ error })
    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        const { uid } = user
        this.getFirebaseUserObject(uid)
        history.push('/')
      })
    .catch((error) => {
        setErrorState(error.message)
        console.log(error);
      });

    this.setState({
      email: '',
      password: '',
      error: ''
    })
  }

  redirect(){
    if(Object.keys(this.props.currentUser).length) {
      return <Redirect to='/' />
    }
  }

  render(){
    return (
      <div className="login-wrapper">
        { this.redirect() }
        <h1 className="logo">TravelDen</h1>
        <input className="input"
               placeholder="email"
               name="email"
               type="text"
               value={ this.state.email }
               onChange={(e) =>  this.setState({ email: e.target.value }) }
               />
        <input className="input"
               placeholder="password"
               name="password"
               type="password"
               value={ this.state.password }
               onChange={(e) =>  this.setState({ password: e.target.value }) }
               />
             <button className="btn" onClick={ () => this.signIn() }>Submit</button>
        <p>No account? <Link to='/register'>Register here.</Link></p>
        <div className="errorMessage">{this.state.error}</div>
      </div>
    )
  }

}
