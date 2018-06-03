import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api';
// import './ListParticipants.css';


class ListParticipants extends Component {
  constructor(props) {
    super(props)
    this.statusOptions = ['TODO', 'To improve', 'Good', 'Perfect']
    this.state = {
      participants: null
    }
  }

  componentDidMount() {
    api.getParticipants()
      .then(participants => {
        this.setState({
          participants
        })
      })
  }  

  getStatuses(exercises) {
    let statuses = {}
    for (let i = 0; i < exercises.length; i++) {
      if (!statuses[exercises[i].status])
        statuses[exercises[i].status] = 1
      else 
      statuses[exercises[i].status]++
    }
    return JSON.stringify(statuses)

    // let res = []
    // for (let i = 0; i < exercises.length; i++) {
    //   res.push( exercises[i].name)
    //   if (!statuses[exercises[i].status])
    //     statuses[exercises[i].status] = 1
    //   else 
    //   statuses[exercises[i].status]++
    // }
    // return JSON.stringify(statuses)
  }


  render() { 
    if (!this.state.participants) {
      return (
        <div className="ListParticipants">
          <h2>Loading...</h2>
        </div>
      )
    } 

    let participantsSorted = this.state.participants.slice().sort((a, b) => {
      let dateA = new Date(a.messages[a.messages.length-1].date)
      let dateB = new Date(b.messages[b.messages.length-1].date)
      return dateB - dateA
    })

    // Take the list of all exercises based on 1 participant
    let exercisesNames = this.state.participants.length > 0 && this.state.participants[0].exercises.map(x => x.name)

    let a = [];
    
    return (
      <div className="ListParticipants container">
        <h2 className="h2">List Participants</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Bootcamp name</th>
              <th>Last message</th>
              <th>Status</th>
              {/* {exercisesNames.map(name => <th key={name}>{name}</th>)} */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {participantsSorted.map(participant => (
              <tr key={participant._id}>
                <td>{participant._user.firstName} {participant._user.lastName}</td>
                <td>{participant.bootcampName}</td>
                <td>{(new Date(participant.messages[participant.messages.length-1].date)).toLocaleString()}</td>
                <td>{this.getStatuses(participant.exercises)}</td>
                {/* {exercisesNames.map(name => <td>{participant.exercises.find((exercise) => exercise.name === name).status}</td>)} */}
                <td><Link to={"/participants/"+participant._id} className="btn btn-sm btn-primary">Go</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListParticipants;
