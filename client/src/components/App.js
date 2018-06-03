import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Countries from './Countries';
import AddCountry from './AddCountry';
import ParticipantProgress from './ParticipantProgress';
import ListParticipants from './ListParticipants';
import Secret from './Secret';
import Login from './Login';
import Signup from './Signup';
import api from '../api';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
          <div className="container">

            <a className="navbar-brand" href="#">PreWork Follow-up (beta version)</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link" >Home</Link>
                </li>
                {api.isLoggedIn() && !api.isAdmin() && (
                  <li className="nav-item">
                    <Link to="/prework-progress" className="nav-link">Prework Progress</Link>
                  </li>
                )}
                {api.isAdmin() && (
                  <li className="nav-item">
                    <Link to="/participants" className="nav-link">List of all students</Link>
                  </li>
                )}
              </ul>


              {!api.isLoggedIn() && <Link to="/signup" className="btn btn-light mx-1">Signup</Link>}
              {!api.isLoggedIn() && <Link to="/login" className="btn btn-light mx-1">Login</Link>}
              {api.isLoggedIn() && <Link to="/" className="btn btn-light mx-1" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact={true} path="/participants" component={ListParticipants} />
          <Route path="/participants/:participantId" component={ParticipantProgress} />
          <Route path="/prework-progress" component={ParticipantProgress} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
