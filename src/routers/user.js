const express = require('express');
require('../db/mongoose');
const User = require('../model/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    console.log(user);
    if (!user) {
      return res.status(200).send([]);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/users/:id', async (req, res) => {
  const updatableFields = ['name', 'email', 'age', 'password'];
  const fieldsRecived = Object.keys(req.body);
  const isValidOperation = fieldsRecived.every(field => updatableFields.includes(field));
  if (!isValidOperation) {
    return res.status(400).send('error: Invaild Update!');
  }
  const _id = req.params.id;
  const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
  try {
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send('error: No such user found!');
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
