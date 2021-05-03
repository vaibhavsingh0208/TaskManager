const express = require('express');
require('../db/mongoose');
const auth = require('../middleware/auth');
const Task = require('../model/task');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    task.save(task);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/tasks', auth, async (req, res) => {
  try {
    // const task = await Task.find({ owner: req.user._id });
    await req.user.populate('tasks').execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owenr: req.user_id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (err) {
    res.send(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updatableFields = ['description', 'completed'];
  const fieldsReceived = Object.keys(req.body);
  const isValidOperation = fieldsReceived.every(field => updatableFields.includes(field));

  if (!isValidOperation) {
    return res.status(400).send('error: Invalid Fields');
  }
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    fieldsReceived.forEach(field => (task[field] = req.body[field]));
    await task.save();
    return res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send('error: No records found');
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
