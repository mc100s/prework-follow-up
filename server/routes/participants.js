const express = require('express');
const passport = require('passport');
const Participant = require('../models/participant')
const config = require("../config");


var router = express.Router();

router.get('/one-progression', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Participant.findOne({_user: req.user._id})
    .populate('_user')
    .populate('messages._sender')
    .then(participant => {
      res.json(participant);
    })
    .catch(err => next(err))
});


router.put('/save-exercices', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  console.log('DEBUG req.body', req.body);
  Participant.findByIdAndUpdate(req.body.participantId, { exercises: req.body.exercises })
    .then(_ => res.json({success: true}))
    .catch(err => res.json({success: false, error: err}))
});

router.get('/participants', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Participant.find()
    .populate('_user')
    .then(participants => {
      res.json(participants);
    })
    .catch(err => next(err))
});

router.get('/participants/:participantId', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Participant.findById(req.params.participantId)
    .populate('_user')
    .populate('messages._sender')
    .then(participants => {
      res.json(participants);
    })
    .catch(err => next(err))
});

router.post('/participants/:participantId/messages', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let message = req.body;
  if (!message) return next("error")
  message.date = new Date(); 
  message._sender = req.user._id; 
  console.log('DEBUG req.params.participantId', req.params.participantId);
  Participant.findByIdAndUpdate(req.params.participantId, { $push: { messages: message } })
    .then(_ => res.json({success: true}))
    .catch(err => res.json({success: false, error: err}))
  // Participant.findByIdAndUpdate(req.body.participantId, { exercises: req.body.exercises })
  //   .then(_ => res.json({success: true}))
  //   .catch(err => res.json({success: false, error: err}))
});



// // Route to get a static sample of countries
// router.get('/static-sample', (req, res, next) => {
//   res.json([{"capitals":[],"_id":"5a9ab1e751771a42c9af9a20","name":"France","__v":0},{"capitals":[],"_id":"5a9ab1f8a2dc8242cd54a87d","name":"France","__v":0},{"capitals":["[\"Paris\", \"Lyon\"]"],"_id":"5a9ab51fa2dc8242cd54a87e","name":"France","description":"Best country ever","__v":0},{"capitals":["Berlin","Munich"],"_id":"5a9ab5a8a2dc8242cd54a881","name":"Germany","description":"Second best country","__v":0},{"capitals":["Canberra"],"_id":"5a9ab7e6458133204b75d510","name":"Australia","area":7692024}])
// });

// // Route to add a country
// router.post('/', (req, res, next) => {
//   let {name, capitals, area, description} = req.body
//   Country.create({name, capitals, area, description})
//     .then(country => {
//       res.json({
//         success: true,
//         country
//       });
//     })
//     .catch(err => next(err))
// });

module.exports = router;
