const mongoose = require('mongoose');
const User = require('../models/user');
const Participant = require('../models/participant');

require('../configs/database');


var users = [{
  firstName: 'Maxence', 
  lastName: 'Bouret', 
  email: 'maxence@ironhack.com',
  password: 'ironhackmaxence',
  isAdmin: true
}, { 
  firstName: 'Alice', 
  lastName: 'Anaconda', 
  email: 'alice@gmail.com',
  password: 'alice',
  isAdmin: false
}, { 
  firstName: 'Bob', 
  lastName: 'Boat', 
  email: 'bob@gmail.com',
  password: 'bob',
  isAdmin: false
}, { 
  firstName: 'Charly', 
  lastName: 'Coccinelle', 
  email: 'charly@gmail.com',
  password: 'charly',
  isAdmin: false
}];

let initialExercises = [{
  name: 'GitHub',
  link: '',
  status: 'TODO',
  shortFeedback: ''
},{
  name: 'Ironskydive',
  link: '',
  status: 'TODO',
  shortFeedback: ''
},{
  name: 'NPM Clone (optional)',
  link: '',
  status: 'TODO',
  shortFeedback: ''
},{
  name: 'Mars Rover',
  link: '',
  status: 'TODO',
  shortFeedback: ''
}]

let initialMessages = [{
  text: "Test from Seed",
  date: new Date(),
}]

User.deleteMany()
  .then(_ => Participant.deleteMany())
  .then(_ => {
    users.forEach(user => {
      let docUser = new User(user);
      User.register(docUser, user.password)
        .catch(err => console.log("ERR", err) )
        .then(_ => {
          console.log(docUser.firstName + " has been inserted")
          Participant.create({
            _user: docUser._id,
            bootcampName: 'Web Dev Full-Time July',
            city: "Berlin",
            exercises: initialExercises,
            messages: initialMessages
          })
          .then(doc => console.log("success", doc))
          .catch(err => console.log("error", err))
        })
    })
  })


// const user = new User({
//   email,
//   name
// });



// User.insertMany(users)
//   .then(newUsers => {
//     console.log("newUsers", newUsers);
//     newUsers.forEach(user => {
//       let password = user.firstName.toLowerCase();
//       User.register(user, password, err => {
//         if (err) return console.log("ERR", err);
//         res.json({ success: true });
//       });
//     })
//   })
//   .catch(err => {
//     console.log('DEBUG err', err);
//   })
