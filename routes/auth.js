const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const passport = require('passport');

router.use('/auth', router);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({msg: 'No user'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({msg: 'Invalid Credentials'});
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    }, (err, access_token) => {
      if (err) throw err;
      res.json({
        access_token,
        first_name: user.first_name
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Register user
router.post('/register', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').
      isLength({min: 6})],
  async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {name, email, password} = req.body;

  try {
    let user = await User.findOne({email});

    if (user) {
      return res.status(400).json({msg: 'User already exists'});
    }

    user = new User({
      first_name: name, email, password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email, // тут можуть бути інші поля
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    }, (err, token) => {
      if (err) throw err;
      res.json({token, user: payload.user});
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get(
    '/renew',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const user = req.user;

        const payload = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email, // тут можуть бути інші поля
          },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token, user: payload.user });
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

module.exports = router;
