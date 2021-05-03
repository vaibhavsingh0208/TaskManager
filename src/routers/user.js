const express = require('express');
require('../db/mongoose');
const User = require('../model/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentails(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ error: 'invalid credentials' });
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    console.log(req.token);
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    console.log(req.user.tokens);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
  const updatableFields = ['name', 'email', 'age', 'password'];
  const fieldsRecived = Object.keys(req.body);
  const isValidOperation = fieldsRecived.every(field => updatableFields.includes(field));
  if (!isValidOperation) {
    return res.status(400).send('error: Invaild Update!');
  }
  fieldsRecived.forEach(field => (req.user[field] = req.body[field]));

  try {
    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
