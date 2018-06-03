import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
// import './ParticipantProgress.css';


class ParticipantProgress extends Component {
  constructor(props) {
    super(props)
    this.statusOptions = ['TODO', 'To improve', 'Good', 'Perfect']
    this.state = {
      participant: undefined,
      exercises: undefined,
      messages: undefined,
      areExercisesChanged: false,
      currentMessageText: "",
      user: api.loadUser()
    }
  }

  componentDidMount() {
    this.updateContentPage()

    this.intervalId = setInterval(() => {
      this.saveExercises()
    }, 2000)
  }  

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  updateContentPage() {
    let apiPromise;
    if (this.props.match.path === "/participants/:participantId") {
      apiPromise = api.getParticipant(this.props.match.params.participantId)
    }
    else {
      apiPromise = api.getOneProgression()
    }

    apiPromise.then(participant => {
      this.setState({ 
        participant, 
        exercises: participant.exercises,
        messages: participant.messages 
      }, () => this.scrollChatToBottom())
    })
    .catch(err => console.log(err))
  }

  saveExercises() {
    if (this.state.areExercisesChanged) {
      api.saveExercises(this.state.participant._id, this.state.exercises)
        .then(_ => {
        })
        .catch(err => console.log('Error', err))
  
      this.setState({
        areExercisesChanged: false
      })
    }
  }

  handleChangeExercise(event, iExercise, property) {
    let value = event.target.value
    let newExercises = this.state.exercises.slice();
    newExercises[iExercise][property] = value;
    this.setState({
      exercises: newExercises,
      areExercisesChanged: true
    })
  }
 
  handleCurrentMessageTextChange(event) {
    let value = event.target.value;
    this.setState({
      currentMessageText: value
    })
  }

  handleSendMessage(e) {
    e.preventDefault();
    if (this.state.currentMessageText.trim() === "")
      return;
    const message = {
      text: this.state.currentMessageText,
    }
    api.postMessage(this.state.participant._id, message)
      .then(_ => {
        this.updateContentPage();
        this.setState({
          currentMessageText: ""
        })
      })
      .catch(err => console.log("handleSendMessage error", err))
  }

  scrollChatToBottom() {
    let chat = document.getElementById("chat");
    if (!chat) return;
    // allow 1px inaccuracy by adding 1
    let isScrolledToBottom = chat.scrollHeight - chat.clientHeight <= chat.scrollTop + 1;
    if(!isScrolledToBottom)
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }

  render() { 
    if (!this.state.participant) {
      return (
        <div className="ParticipantProgress">
          <h2>Loading...</h2>
        </div>
      )
    } 
    return (
      <div className="ParticipantProgress container">
        <h2 className="h2">Prework progress</h2>
        <h3 className="h3  mb-4">{this.state.participant._user.firstName} {this.state.participant._user.lastName} - {this.state.participant.bootcampName}</h3>

        <table className="table mb-4">
          <thead>
            <tr>
              <th>Exercises</th>
              <th>Link</th>
              <th>Status</th>
              <th>Short feedback from teachers</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises && this.state.exercises.map((exercise, i) => (
              <tr key={i}>
                <td className="align-middle">{exercise.name}</td>
                <td className="align-middle"><input className="form-control" type="text" value={exercise.link} onChange={(e) => this.handleChangeExercise(e, i, 'link')} /></td>
                <td className="align-middle">
                  <select className="form-control" value={exercise.status} onChange={(e) => this.handleChangeExercise(e, i, 'status')}>
                    {this.statusOptions.map((option, i) => (
                      <option key={i} value={option} >{option}</option>
                    ))}
                  </select>
                </td>
                <td className="align-middle"><textarea className="form-control" value={exercise.shortFeedback} onChange={(e) => this.handleChangeExercise(e, i, 'shortFeedback')} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <br/>
        <br/>
        <a href="slack://user?team=T02CQ4EN4">Ironhack Slack</a>
        <br/>
        <a href="slack://user?team=T6S7M6EA0">Ironhack team slack</a>
        <br/>
        <a href="slack://user?team=T02CQ4EN4&id=U5Z7RB2DR">Ironhack maxence</a>
        <br/>
        <a href="slack://user?team=T02CQ4EN4&id=U73PH7VEX">Ironhack Vivian</a>
        <br/>
        <a href="slack://user?team=T02CQ4EN4&id=U803Q3DK8">Ironhack Nacho</a>
        <br/>
        <a href="slack://user?team=T02CQ4EN4&message=GB0F2M42G">??</a>
        <br/> */}
        <br/>

        <div className="chat" id="chat">
          {this.state.messages.map(message => {

            let doesBelongToUser = message._sender && message._sender._id === this.state.user._id
            let className = "message alert";
            if (doesBelongToUser)
              className += " alert-success message-right";
            else
              className += " alert-primary message-left";
            return (
              <div className={className} key={message._id}>
                <pre>
                  {message.text}
                </pre>
                <div className="small">
                  {message._sender && `${message._sender.firstName} - ` }
                  {(new Date(message.date)).toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
        
        <form className="mt-3 my-3" onSubmit={(e) => this.handleSendMessage(e)}>
          <div className="form-row">
            <div className="col-lg-10 col-md-9 col-12">
              <textarea className="form-control textarea-message" value={this.state.currentMessageText} rows="5" onChange={(e) => {this.handleCurrentMessageTextChange(e)}} />
            </div>
            <div className="col align-self-end">
              <button className="btn btn-block btn-success">Send message</button>
            </div>
          </div>
        </form>
        
        <div style={{
          margin: 10,
          backgroundColor: "red",
          display: this.state.message ? "block" : "none"
        }}>
          {JSON.stringify(this.state.messages)}
        </div>
      </div>
    );
  }
}

export default ParticipantProgress;
