const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json()); //Midware

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
      res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //res.send(req.params);

  //Validate ID using isValid
    //404 if invalid
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //findById
  //Success
    //if todo - send it back
    //if no todo - send 404
  //Error
    //400 - Send empty body
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  //Get ID
  var id = req.params.id;

  //Validate ID
    //404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //Remove todo by ID
    //Success
      //If no doc, send 404
    //Error: 400
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); //Pull out only defined properties

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

});


module.exports = {app};

app.listen(port, () => {
  console.log(`Start on port ${port}`);
});
