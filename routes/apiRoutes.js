const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get('/api/workouts/range', (req, res) => {
    Workout.find({})
      .then(dbWorkout => {
          res.json(dbWorkout)
      })
      .catch(err => {
        res.status(400).json(err);
      })
  })
  
router.get('/api/workouts', (req, res) => {
  Workout.find({})
  .then(dbWorkout => {
    console.log('workout!', dbWorkout)
      res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/api/workouts/:id', async (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id, {
      $push: { exercises: req.body } })
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
  })

module.exports = router