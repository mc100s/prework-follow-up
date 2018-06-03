import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                
    return (
      <div className="Home container">
        <h2 className="mb-3">Home</h2>
        <p className="lead">Welcome on this PreWork follow-up platform! It was built by your teachers so they can easily check your progression through the PreWork.</p>
        <p className="lead">
          If you have any problem with the platform, please contact
          <br/>
          <a href="mailto:maxence@ironhack.com">maxence@ironhack.com</a> by email
          <br/>
          or 
          <br/>
          <strong>@maxence, @Nacho Lopez, @vivian sarazin</strong> on the Ironhack Slack
        </p>
        {api.isLoggedIn() && (
          <Link to="/prework-progress" className="btn btn-lg btn-primary mt-3">Go to your Prework Progress</Link>
        )}
        {!api.isLoggedIn() && (
          <div>
            <Link to="/signup" className="btn btn-lg btn-primary mt-3 mx-2">Sign up</Link>
            <Link to="/login" className="btn btn-lg btn-primary mt-3 mx-2">Log in</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
