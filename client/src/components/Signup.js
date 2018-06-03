import React, { Component } from 'react';
import api from '../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      city: "Berlin",
      bootcampName: "Full-Time July Bootcamp"
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      city: this.state.city,
      bootcampName: this.state.bootcampName,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Signup container">
        <h2>Signup</h2>
        <form>
          <div className="row">
            <label class="col-sm-3 col-form-label">Email</label>
            <div class="col-sm-9">
              <input className="form-control" type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} />
            </div>
          </div>
          <div className="row">
            <label class="col-sm-3 col-form-label">First name</label>
            <div class="col-sm-9">
              <input className="form-control" type="text" value={this.state.firstName} onChange={(e) => {this.handleInputChange("firstName", e)}} />
            </div>
          </div>
          <div className="row">
            <label class="col-sm-3 col-form-label">Last name</label>
            <div class="col-sm-9">
              <input className="form-control" type="text" value={this.state.lastName} onChange={(e) => {this.handleInputChange("lastName", e)}} />
            </div>
          </div>
          <div className="row">
            <label class="col-sm-3 col-form-label">Password</label>
            <div class="col-sm-9">
              <input className="form-control" type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}}  />
            </div>
          </div>
          <div className="row">
            <label class="col-sm-3 col-form-label">City</label>
            <div class="col-sm-9">
              <select className="form-control" type="text" value={this.state.city} onChange={(e) => {this.handleInputChange("city", e)}}>
                <option value="Berlin">Berlin</option>
              </select>
            </div>
          </div>
          <div className="row">
            <label class="col-sm-3 col-form-label">Bootcamp</label>
            <div class="col-sm-9">
              <select className="form-control" type="text" value={this.state.bootcampName} onChange={(e) => {this.handleInputChange("bootcampName", e)}}>
                <option value="Full-Time July Bootcamp">Full-Time July Bootcamp</option>
                <option value="Full-Time October Bootcamp">Full-Time October Bootcamp</option>
                <option value="Part-Time October Bootcamp">Part-Time October Bootcamp</option>
                <option value="Full-Time January Bootcamp">Full-Time January Bootcamp</option>
              </select>
            </div>
          </div>
          <button className="btn btn-success" onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
