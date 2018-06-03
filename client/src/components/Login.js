import React, { Component } from 'react';
import api from '../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Login container">
        <h2>Login</h2>
        <form>
          <div className="row">
            <label class="col-sm-3 col-form-label">Email</label>
            <div class="col-sm-9">
              <input className="form-control" type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} />
            </div>
          </div>
          <div className="row">
            <label class="col-sm-3 col-form-label">Password</label>
            <div class="col-sm-9">
              <input className="form-control" type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}}  />
            </div>
          </div>
          <button className="btn btn-success" onClick={(e) => this.handleClick(e)}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
