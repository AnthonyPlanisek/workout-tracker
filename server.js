const express = require("express");
const logger = require("morgan");
const path = require('path')
// const mongoose = require("mongoose");
const mongojs = require('mongojs')

const databaseUrl = "exercise";
const collections = ["workout"];
const db = mongojs(databaseUrl, collections);

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'stats.html'))
})

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'exercise.html'))
})

app.get('/api/workouts/range', (req, res) => {
  db.workout.find(function (err, docs) {
    res.json(docs)
  })
})

app.get('/api/workouts', (req, res) => {
  db.workout.find(function (err, docs) {
    res.json(docs)
  })
})

// app.post('/api/workouts', ({ body }, res) => {
//   const newWorkout = body
  
//   db.workout.save(newWorkout, (error, saved) => {
//     if (error) {
//       console.log(error)
//     } else {
//       res.send(saved)
//     }
//   })
// })

app.put('/api/workouts/:id', ({ params }, res) => {
  
  db.workout.update(
    {
      _id: mongojs.ObjectId(params.id)
    },
    (error, edited) => {
      if (error) {
        console.log(error)
        res.send(error)
      } else {
        console.log(edited)
        res.send(edited)
      }
    }
  )
})

app.listen(3000, () => {
  console.log("App running on port 3000!");
});