const express = require('express');
require('../db/mongoose');
const Task = require('../model/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save(task);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(err => res.status(400).send(err));
});

router.get('/tasks', async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
  Task.find()
    .then(tasks => res.send(tasks))
    .catch(err => res.status(500).send);
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    res.status(200).send(task);
  } catch (err) {
    res.send(500).send();
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const updatableFields = ['description', 'completed'];
  const fieldsReceived = Object.keys(req.body);
  const isValidOperation = fieldsReceived.every(field => updatableFields.includes(field));

  if (!isValidOperation) {
    return res.status(400).send('error: Invalid Fields');
  }
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true });
    if (!task) {
      return res.status(404).send();
    }
    return res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send('error: No records found');
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
