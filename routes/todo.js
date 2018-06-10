const express = require('express');
const mongoose = require('mongoose');
const {checkAuthorized} = require('../utils');

const router = express.Router();

// connect to schema

require('../models/TodoList');
const Todo = mongoose.model('todo');

/** response for add page */

router.post('/', (req, res) => {
  const error = [];
  if (!req.body.title) {
    error.push({text: 'missing title'});
  }

  if (!req.body.description) {
    error.push({text: 'missing description'});
  }

  if (error.length > 0) {
    res.render('todolist', {
      title: req.body.title,
      description: req.body.description,
      error: error
    });
  } else {
    const reqTodo = {
      title: req.body.title,
      description: req.body.description,
      user: req.user.username
    };
    new Todo(reqTodo)
      .save()
      .then((todo) => {
        req.flash('success_msg', 'todo has been added');
        res.redirect('/todo/list');
      });
  }
});

// handle request for edit page

router.get('/edit/:id', (req, res) => Todo.findOne({_id: req.params.id}).then((todo) => res.render('todolist/edit', {todo: todo})));

router.put('/update/:id', (req, res) => {
  Todo
    .findOne({_id: req.params.id, user: req.user.username})
    .then((todo) => {
      todo.title = req.body.title;
      todo.desccription = req.body.description;

      todo
        .save()
        .then((todo) => {
          req.flash('update_msg', 'your todo has been updated');
          res.redirect('/todo/list');
        });
    });
});

// handle request for page todo/list

router.get('/list', checkAuthorized, (req, res) => {
  Todo
    .find({user: req.user.username})
    .then((todos) => res.render('todolist', {todos: todos}));
});

router.delete('/delete/:id', (req, res) => {
  Todo
    .remove({_id: req.params.id, user: req.user.username})
    .then((todo) => {
      req.flash('delete_msg', 'todo has been deleted');
      res.redirect('/todo/list');
    });
});

module.exports = router;
